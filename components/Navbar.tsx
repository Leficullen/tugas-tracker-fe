"use client";
import { Home, Book, ListChecks, Calendar } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import HamburgerMenu from "./ui/hamburger";

export default function Navbar() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);

  const menu = [
    { name: "Dashboard", href: "/", icon: <Home size={20} /> },
    { name: "Mata Kuliah", href: "/matkul", icon: <Book size={20} /> },
    { name: "Tugas", href: "/tugas", icon: <ListChecks size={20} /> },
    {
      name: "Bolos Tracker",
      href: "/bolos-tracker",
      icon: <Calendar size={20} />,
    },
  ];

  return (
    <div className="fixed top-0 left-0 w-full bg-background z-50 shadow-sm">
      {/* NAVBAR HEADER */}
      <div className="flex justify-between items-center h-[65px] px-5">
        <div onClick={() => setActive(!active)} className="cursor-pointer">
          <HamburgerMenu />
        </div>

        <Link href="/">
          <h2 className="font-semibold text-h3 text-primary">Tugas Tracker</h2>
        </Link>
      </div>

      <nav
        className={`
          absolute w-full bg-background left-0 
          transition-all duration-200 ease-in-out overflow-hidden shadow-lg py-3
          ${active ? "max-h-[300px] opacity-100 translate-y-1" : "-translate-y-5 max-h-0 opacity-0"}
        `}
      >
        <div className="flex flex-col">
          {menu.map((item) => (
            <Link key={item.name} href={item.href}>
              <div
                className={`
                  flex items-center gap-3 cursor-pointer rounded-md
                  p-2 lg:p-3 mx-3 my-1
                  transition-all duration-300 ease-in-out

                  ${
                    pathname === item.href
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                `}
              >
                <span>{item.icon}</span>
                <span className="whitespace-nowrap">{item.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
