
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Image from "next/image";
import IndButton from './IndButton';
interface User {
  _id: string;
  name: string;
  email: string;
}

export default function Navbar() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const linkClasses = (href:string) => {
    const isActive = pathname.includes(href);
    return `transition-colors cursor-pointer ${
      isActive ? "text-primary font-semibold" : "text-white hover:text-primary"
    }`;
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
    } catch (e) {
      console.error('Token verification failed:', e);
      localStorage.removeItem('token');
      router.push('/login');
      return;
    }

    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          if (res.status === 401) {
            localStorage.removeItem('token');
            router.push('/login');
            return;
          }
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        if (data.success) {
          setUsers(data.data);
        } else {
          setError(data.error || 'Failed to fetch users');
        }
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    // <div className="min-h-screen p-4">
    //   <div className="flex justify-between items-center mb-8">
    //     <h1 className="text-3xl font-bold">Wedding Invites</h1>
    //     <button
    //       onClick={handleLogout}
    //       className="bg-linear-to-r from-purple-600 to-pink-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    //     >
    //       Logout
    //     </button>
    //   </div>
    // </div>
     <motion.div
      className="fixed w-full top-0 left-0 z-50"
      initial={{ y: 0 }}
      animate={{ y: showNavbar ? 0 : -150 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <nav
        className={`font-montserrat relative text-nowrap flex bg-transparent 2xl:py-8 py-5 mx-auto justify-between items-center text-lg lg:text-sm xl:text-base leading-6 gap-4 ${
          pathname === "/" ? "border-b-2 border-[#8E8E8E]" : ""
        }`}
      >
        <div className="flex items-center container justify-between mx-auto px-4">
          <Link href="/" className="flex items-center gap-1.5 cursor-pointer">
            <Image
              src="/logoGroup.webp"
              alt="Infogentech"
              width={212}
              height={46}
            />
          </Link>

          <div className="2xl:space-x-20 xl:space-x-15 lg:space-x-8 hidden md:flex">
            <Link href="/" className={linkClasses("/")}>
              Home
            </Link>
            <Link href="/about" className={linkClasses("/about")}>
              About us
            </Link>
            <Link
              href="/portfolio/design"
              className={linkClasses("/portfolio/")}
            >
              Portfolio
            </Link>
            <Link href="/services/design" className={linkClasses("/services/")}>
              Services
            </Link>
            <Link href="/blog" className={linkClasses("/blog")}>
              Blogs
            </Link>
            <Link href="/contact" className={linkClasses("/contact")}>
              Contact us
            </Link>
          </div>

          <a href="/contact">
            <IndButton variant="primary" onClick={() => {}}>Choose a Template</IndButton>
          </a>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-[#312f2f59] -z-10" />
      </nav>
    </motion.div>
  );
}
