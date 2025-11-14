
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
    const isActive = pathname === href;
    return `transition-colors cursor-pointer ${
      isActive ? "text-primary font-semibold" : " hover:text-primary"
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
    <div className="relative p-4">
      <div className="flex justify-between items-center text-white text-whitenavbar">
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
            <Link href="/template" className={linkClasses("/template")}>
              Template
            </Link>
            <Link href="/contact" className={linkClasses("/contact")}>
              Contact us
            </Link>
          </div>

          <a href="/templete">
            <IndButton variant="primary" onClick={() => {}}>Choose a Template</IndButton>
          </a>
          <div className="absolute top-0 left-0 w-full h-full bg-[#312f2f59] -z-10" />
        </div>
        {/* <button
          onClick={handleLogout}
          className="bg-linear-to-r from-purple-600 to-pink-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Logout
        </button> */}
        
      </div>
    </div>

  );
}
