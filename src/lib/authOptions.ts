// This file will export the NextAuth options for reusability.
// It's currently a placeholder and will be populated with actual logic.
import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('Attempting to authorize user:', credentials?.email);
        await dbConnect();
        console.log('Database connected.');
        try {
          const user = await User.findOne({ email: credentials?.email });
          if (!user) {
            console.log('User not found for email:', credentials?.email);
            throw new Error('Invalid credentials');
          }
          console.log('User found:', user.email);

          const isMatch = await bcrypt.compare(credentials!.password, user.password);
          if (!isMatch) {
            console.log('Password mismatch for user:', user.email);
            throw new Error('Invalid credentials');
          }
          console.log('Password matched for user:', user.email);

          return { id: user._id.toString(), name: user.name, email: user.email };
        } catch (error: any) {
          console.error('Authorization error:', error.message);
          throw new Error(error.message);
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/login', // Error code passed in query string as ?error=
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
