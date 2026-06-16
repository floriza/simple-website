"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/platform", label: "Platform" },
  {
    label: "Engage",
    children: [
      { href: "/news", label: "News & Updates" },
      { href: "/events", label: "Events" },
      { href: "/achievements", label: "Achievements" },
    ],
  },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100"
          : "bg-transparent"
      )}
      role="banner"
    >
      <nav
        className="container-max px-4 md:px-8 flex items-center justify-between h-16 md:h-20"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded-lg"
          aria-label="Campaign home"
        >
          <div className="w-10 h-10 rounded-full bg-hero-gradient flex items-center justify-center text-white font-bold text-lg group-hover:scale-105 transition-transform">
            C
          </div>
          <div className="hidden sm:block">
            <p className={cn("font-heading font-bold text-lg leading-tight transition-colors", scrolled ? "text-gray-900" : "text-white")}>
              [Candidate Name]
            </p>
            <p className={cn("text-xs font-medium transition-colors", scrolled ? "text-primary-600" : "text-blue-200")}>
              For Student President
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label} className="relative">
                <button
                  onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all",
                    scrolled
                      ? "text-gray-700 hover:text-primary-600 hover:bg-primary-50"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  )}
                  aria-expanded={openDropdown === link.label}
                  aria-haspopup="true"
                >
                  {link.label}
                  <ChevronDown
                    size={14}
                    className={cn("transition-transform", openDropdown === link.label && "rotate-180")}
                  />
                </button>
                <AnimatePresence>
                  {openDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-1 overflow-hidden"
                      role="menu"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          role="menuitem"
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 font-medium transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href!}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-semibold transition-all",
                  pathname === link.href
                    ? scrolled
                      ? "bg-primary-50 text-primary-700"
                      : "bg-white/20 text-white"
                    : scrolled
                    ? "text-gray-700 hover:text-primary-600 hover:bg-primary-50"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                )}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/donate" className="btn-accent text-sm px-5 py-2.5">
            Donate
          </Link>
          <Link href="/contact#volunteer" className="btn-primary text-sm px-5 py-2.5">
            Get Involved
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "md:hidden p-2 rounded-lg transition-colors",
            scrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"
          )}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-lg overflow-hidden"
          >
            <nav className="px-4 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label}>
                    <p className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                      {link.label}
                    </p>
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-primary-50 hover:text-primary-700 rounded-lg transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href!}
                    className={cn(
                      "block px-4 py-3 text-sm font-semibold rounded-lg transition-colors",
                      pathname === link.href
                        ? "bg-primary-50 text-primary-700"
                        : "text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                    )}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <div className="flex flex-col gap-2 pt-4 border-t border-gray-100 mt-2">
                <Link href="/donate" className="btn-accent text-sm text-center">
                  Donate
                </Link>
                <Link href="/contact#volunteer" className="btn-primary text-sm text-center">
                  Get Involved
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
