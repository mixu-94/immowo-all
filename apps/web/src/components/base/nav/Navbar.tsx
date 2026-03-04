"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { usePathname } from "next/navigation";

type NavbarProps = {};

const navItems = [
  { label: "Home", href: "/", disabled: false, hidden: false },
  { label: "Immobilien", href: "/immobilien", disabled: false, hidden: false },
  { label: "Referenzen", href: "/referenzen", disabled: false, hidden: false },
  {
    label: "Unternehmen",
    href: "/unternehmen",
    disabled: false,
    hidden: false,
  },
  { label: "Bewertung", href: "/bewertung", disabled: false, hidden: false },
  { label: "Kontakt", href: "/kontakt", disabled: false, hidden: false },
];

function Navbar({}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { scrollY } = useScroll();
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Block scrolling when the menu is open
  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Track scroll direction and hide/show the navbar only when the menu is closed
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!menuOpen) {
      if (latest > lastScrollY) setIsVisible(false);
      else setIsVisible(true);
    }
    setLastScrollY(latest);
  });

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -120 }}
      transition={{ ease: "easeOut", duration: 0.5 }}
      className="fixed left-0 top-0 z-50 w-full border-b border-[color:var(--color-border)] bg-[#050B1A]/30 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
        {/* Left Section - Logo */}
        <motion.div whileHover={{ scale: 1.03 }} className="flex items-center">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/assets/logo/logo.png"
              alt="Logo"
              width={200}
              height={150}
              className="h-12 w-auto cursor-pointer object-contain"
              priority
              quality={100}
            />
          </Link>
        </motion.div>

        {/* Center Section - Desktop Nav Items */}
        <nav className="hidden items-center gap-10 md:flex">
          {navItems
            .filter((item) => !item.hidden)
            .map((item) => {
              const isActive = pathname === item.href;

              if (item.disabled) {
                return (
                  <div
                    key={item.href}
                    className="cursor-not-allowed opacity-50"
                  >
                    <span className="text-sm font-medium tracking-wide text-[color:var(--color-text-muted)]">
                      {item.label}
                    </span>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative flex items-center gap-3 py-2"
                >
                  {/* Big dot */}
                  <span
                    className={[
                      "h-2.5 w-2.5 rounded-full transition-all duration-300",
                      isActive
                        ? "bg-white"
                        : "bg-white/35 group-hover:bg-white/70",
                    ].join(" ")}
                  />

                  {/* Label */}
                  <span
                    className={[
                      "text-base font-semibold tracking-[0.14em] uppercase transition-colors duration-300",
                      isActive
                        ? "text-[color:var(--color-text)]"
                        : "text-[color:var(--color-text-muted)] group-hover:text-white",
                    ].join(" ")}
                  >
                    {item.label}
                  </span>

                  {/* Active / hover underline */}
                  <span
                    className={[
                      "absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-white/80 transition-transform duration-300",
                      isActive ? "scale-x-100" : "group-hover:scale-x-100",
                    ].join(" ")}
                  />
                </Link>
              );
            })}
        </nav>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMenu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-3 text-sm font-semibold text-[color:var(--color-text)] backdrop-blur transition hover:bg-white/15"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-white/80" />
            <span>{menuOpen ? "Close" : "Menu"}</span>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <motion.div
        ref={menuRef}
        initial={{ x: "-100%" }}
        animate={{ x: menuOpen ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 z-40 h-screen w-screen bg-black/95 md:hidden"
        onClick={closeMenu}
      >
        <div
          className="flex h-full flex-col justify-between gap-3"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Logo Section */}
          <div className="flex items-start justify-between p-6">
            <Link href="/" onClick={closeMenu} className="flex items-center">
              <Image
                src="/assets/logo/logo.png"
                alt="Logo"
                width={150}
                height={60}
                className="h-12 w-auto object-contain"
                priority
                quality={100}
              />
            </Link>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
              className="flex items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-3 text-sm font-semibold text-[color:var(--color-text)] backdrop-blur transition hover:bg-white/15"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-white/80" />
              <span>Close</span>
            </motion.button>
          </div>

          {/* Nav Items */}
          <div className="flex flex-1 flex-col items-start justify-center gap-5 px-8">
            {navItems
              .filter((item) => !item.hidden)
              .map((item) => {
                const isActive = pathname === item.href;

                if (item.disabled) {
                  return (
                    <div
                      key={item.href}
                      className="cursor-not-allowed text-lg font-semibold text-[color:var(--color-text-muted)] opacity-50"
                    >
                      {item.label}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className="group flex items-center gap-4"
                  >
                    <span
                      className={[
                        "h-3 w-3 rounded-full transition-all duration-300",
                        isActive
                          ? "bg-white"
                          : "bg-white/30 group-hover:bg-white/70",
                      ].join(" ")}
                    />
                    <span
                      className={[
                        "text-xl font-semibold tracking-[0.14em] uppercase transition-colors duration-300",
                        isActive
                          ? "text-[color:var(--color-text)]"
                          : "text-[color:var(--color-text-muted)] group-hover:text-white",
                      ].join(" ")}
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}
          </div>

          {/* Bottom Area */}
          <div className="p-6">
            {/* <p className="max-w-sm text-sm leading-relaxed text-white/70">
              Be the first to experience the new standard of ownership
            </p> */}
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
}

export { Navbar };

// "use client";

// import { useState, useRef, useEffect } from "react";

// import Image from "next/image";
// import Link from "next/link";
// import { motion, useScroll, useMotionValueEvent } from "framer-motion";
// import { usePathname } from "next/navigation"; // Import usePathname from next/navigation
// // import Socials from "../socials/Socials";

// type NavbarProps = {};

// // Define your nav items
// const navItems = [
//   { label: "Home", href: "/", disabled: false, hidden: false },
//   { label: "Immobilien", href: "/immobilien", disabled: true, hidden: true },
//   { label: "Referenzen", href: "/referenzen", disabled: true, hidden: true },
//   {
//     label: "Unternehmen",
//     href: "/unternehmen",
//     disabled: false,
//     hidden: false,
//   },
//   { label: "Kontakt", href: "/kontakt", disabled: false, hidden: false },
// ];

// function Navbar({}: NavbarProps) {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isVisible, setIsVisible] = useState(true); // Track navbar visibility
//   const [lastScrollY, setLastScrollY] = useState(0); // Track the last scroll position
//   const { scrollY } = useScroll(); // Track the scroll position
//   const menuRef = useRef<HTMLDivElement>(null);
//   const pathname = usePathname(); // Get the current pathname

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   const closeMenu = () => {
//     setMenuOpen(false);
//   };

//   // Block scrolling when the menu is open
//   useEffect(() => {
//     if (menuOpen) {
//       document.body.style.overflow = "hidden"; // Disable scrolling
//     } else {
//       document.body.style.overflow = ""; // Enable scrolling
//     }
//     return () => {
//       document.body.style.overflow = ""; // Clean up on component unmount
//     };
//   }, [menuOpen]);

//   // Track scroll direction and hide/show the navbar only when the menu is closed
//   useMotionValueEvent(scrollY, "change", (latest) => {
//     if (!menuOpen) {
//       if (latest > lastScrollY) {
//         // Scrolling down
//         setIsVisible(false);
//       } else {
//         // Scrolling up
//         setIsVisible(true);
//       }
//     }
//     setLastScrollY(latest);
//   });

//   // Framer Motion variants for smooth hover animations
//   const navItemVariants = {
//     initial: { opacity: 0, y: -20 },
//     animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
//     whileHover: { scale: 1.1, color: "#e63946", transition: { duration: 0.3 } },
//   };

//   return (
//     <motion.div
//       initial={{ y: 0 }} // Start visible
//       animate={{ y: isVisible ? 0 : -100 }} // Move the navbar off-screen when not visible
//       transition={{ ease: "easeOut", duration: 0.5 }} // Smooth animation
//       className="fixed left-0 top-0 z-50 flex w-screen items-center justify-between bg-transparent px-4 backdrop-blur-lg"
//     >
//       <div className="flex w-full items-center justify-between">
//         {/* Left Section - Logo */}
//         <motion.div
//           whileHover={{ scale: 1.1 }} // Scale up logo on hover
//           className="flex h-full items-center justify-center"
//         >
//           <Link href="/">
//             <span className="relative flex h-20 w-22 justify-center">
//               <Image
//                 src="/assets/logo/logo.png"
//                 alt="Logo"
//                 width={150}
//                 height={200}
//                 className="cursor-pointer object-contain"
//                 priority
//                 quality={100}
//               />
//               {/* Dot animation inside the logo container */}
//             </span>
//           </Link>
//         </motion.div>

//         {/* Center Section - Nav Items */}
//         <div className="hidden gap-8 md:flex">
//           {navItems
//             .filter((item) => !item.hidden) // Filter out hidden items
//             .map((item) =>
//               item.disabled ? (
//                 <motion.div
//                   key={item.href}
//                   className="group cursor-not-allowed"
//                 >
//                   <p className="text-[14px] text-[var(--a-white)]">
//                     {item.label}
//                   </p>
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   key={item.href}
//                   variants={navItemVariants}
//                   initial="initial"
//                   animate="animate"
//                   whileHover="whileHover"
//                   className="group cursor-pointer"
//                 >
//                   <Link href={item.href}>
//                     {/* Wrapper with underline effect on selected item */}
//                     <span
//                       className={`flex items-center transition-all duration-300 ${
//                         pathname === item.href
//                           ? ""
//                           : // ? "border-b-2 border-[var(--adaki-red)] pb-2"
//                             ""
//                       }`}
//                     >
//                       <p
//                         className={`${
//                           pathname === item.href
//                             ? "font-bold text-[var(--immo-navy-900)]"
//                             : "text-white"
//                         } text-[16px] transition-all duration-300 group-hover:text-[var(--immo-navy-800)]`}
//                       >
//                         {item.label}
//                       </p>
//                     </span>
//                   </Link>
//                 </motion.div>
//               ),
//             )}
//         </div>

//         {/* Mobile Menu Toggle Button */}
//         <div className="md:hidden">
//           <motion.button
//             whileHover={{ scale: 1.2 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={toggleMenu}
//             className="flex items-center justify-center gap-2 rounded-full bg-[var(--adaki-grey-4)] px-4 py-4 text-xl font-bold text-white transition duration-300 ease-in-out"
//           >
//             <span className="inline-block h-2 w-2 transform rounded-full bg-white transition duration-300 ease-in-out hover:scale-125"></span>
//             <p className="text-sm">Menu</p>
//           </motion.button>
//         </div>
//       </div>

//       {/* Mobile Menu Overlay */}

//       <motion.div
//         ref={menuRef}
//         initial={{ x: "-100%" }}
//         animate={{ x: menuOpen ? 0 : "-100%" }}
//         transition={{ type: "spring", stiffness: 300, damping: 30 }}
//         className="bg-opacity-99 fixed left-0 top-0 z-40 h-screen w-screen bg-black md:hidden"
//         onClick={closeMenu}
//       >
//         <div className="flex h-full flex-col justify-between gap-3">
//           {/* Top Logo Section */}
//           <div className="flex items-start justify-between p-4">
//             <Link href="/">
//               <Image
//                 src="/assets/logo/logo.png"
//                 alt="Logo"
//                 width={150}
//                 height={200}
//                 className="cursor-pointer object-contain"
//                 priority
//                 quality={100}
//               />
//             </Link>
//             <motion.button
//               whileHover={{ scale: 1.2 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={toggleMenu}
//               className="flex items-center justify-center gap-2 rounded-full bg-[var(--adaki-grey-4)] px-4 py-4 text-xl font-bold text-white transition duration-300 ease-in-out"
//             >
//               <span className="inline-block h-2 w-2 transform rounded-full bg-white transition duration-300 ease-in-out hover:scale-125"></span>
//               <p className="text-sm">Close</p>
//             </motion.button>
//           </div>

//           {/* Nav Items (Aligned Professionally) */}
//           <div className="flex flex-1 flex-col items-start justify-center gap-3 p-2 px-8">
//             {navItems
//               .filter((item) => !item.hidden) // Filter out hidden items for mobile too
//               .map((item) =>
//                 item.disabled ? (
//                   <motion.div
//                     key={item.href}
//                     className="cursor-not-allowed text-2xl font-bold text-gray-400"
//                   >
//                     {item.label}
//                   </motion.div>
//                 ) : (
//                   <motion.div
//                     key={item.href}
//                     whileHover={{ scale: 1.05 }}
//                     className="cursor-pointer text-[16px] font-bold text-white transition-colors duration-300 hover:text-red-500"
//                   >
//                     <Link href={item.href} onClick={toggleMenu}>
//                       <h1
//                         className={`${
//                           pathname === item.href
//                             ? "font-bold underline decoration-[var(--adaki-red)] underline-offset-4"
//                             : "text-white"
//                         } gigalypse text-xl transition-all duration-300 group-hover:text-red-500`}
//                       >
//                         {item.label}
//                       </h1>
//                     </Link>
//                   </motion.div>
//                 ),
//               )}
//           </div>

//           {/* Mobile Login Button at the bottom */}
//           <div className="flex-2 flex flex-col items-end justify-end gap-3 p-4">
//             <p className="text-center">
//               Be the first to expeerience the new standard of ownership
//             </p>
//             {/* <MailerLiteForm placeholderText="Enter your email" />
//             <Socials hideLabels={true} /> */}
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }

// export { Navbar };
