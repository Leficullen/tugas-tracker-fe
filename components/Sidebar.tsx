"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Book,
  ListChecks,
  Calendar,
  BarChart3,
  Settings,
} from "lucide-react";
import { Button } from "./ui/button";

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", href: "/", icon: <Home size={20} /> },
    { name: "Mata Kuliah", href: "/matkul", icon: <Book size={20} /> },
    { name: "Tugas", href: "/tugas", icon: <ListChecks size={20} /> },
    { name: "Bolos Tracker", href: "/bolos-tracker", icon: <Calendar size={20} /> },
    // { name: "Statistik", href: "/statistik", icon: <BarChart3 size={20} /> },
    // { name: "Pengaturan", href: "/pengaturan", icon: <Settings size={20} /> },
  ];

  return (
    <aside
      className="
          group
          h-screen
          bg-white
          shadow-md
          flex-col justify-between smooth
          w-20 hover:w-64
          overflow-hidden 
          fixed hidden lg:flex
        "
    >
      <div>
        {/* Logo */}
        <div className="h-24 flex items-center relative">
          {/* Small Logo (collapsed) */}
          <img
            src="/assets/logo-R.png"
            alt="Small Logo"
            className="
      absolute
      h-20
      transition-all duration-300
      opacity-100 group-hover:opacity-0
    "
          />

          {/* Large Logo (expanded) */}
          <img
            src="/assets/Ristek Fasilkom UI Tugas Tracker.png"
            alt="Full Logo"
            className="
      absolute
      h-20
      transition-all duration-300
      opacity-0 group-hover:opacity-100
    "
          />
        </div>

        <nav className="mt-4">
          {menu.map((item) => (
            <Link key={item.name} href={item.href}>
              <div
                className={`
                    flex items-center gap-3 cursor-pointer rounded-md
                    p-2 mx-2 my-1
                    transition-all duration-300

                    ${
                      pathname === item.href
                        ? "bg-primary text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
              >
                {/* Icon */}
                <span>{item.icon}</span>

                {/* Text (hidden when collapsed) */}
                <span
                  className="
                      whitespace-nowrap
                      opacity-0 group-hover:opacity-100
                      transition-all duration-300
                    "
                >
                  {item.name}
                </span>
              </div>
            </Link>
          ))}
        </nav>
      </div>
      <div>
        <img
          src="/ruby.svg"
          alt=""
          className="hidden group-hover:flex justify-center mx-auto animate-bounce w-[70%] "
        />
      </div>

      <Button
        className="
            bg-red-600 hover:bg-red-700 text-white
            py-2 px-4 m-4 rounded-md
            whitespace-nowrap
            opacity-0 group-hover:opacity-100 transition-all duration-300
          "
      >
        Log Out
      </Button>
    </aside>
  );
}
