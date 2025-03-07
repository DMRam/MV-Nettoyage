// import { motion, AnimatePresence } from "framer-motion"; // For animations

// <div className="relative language-btn left-24">
//   {/* Language Button */}
//   <button
//     onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//     className="flex items-center space-x-2 bg-blue-700 px-4 py-2 rounded-md hover:bg-blue-800 transition-colors duration-300"
//     aria-expanded={isDropdownOpen} // Accessibility
//     aria-haspopup="true" // Accessibility
//   >
//     <span>{language}</span>
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       className="h-4 w-4 transform transition-transform duration-300"
//       style={{ transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)" }} // Rotate arrow on open
//       fill="none"
//       stroke="currentColor"
//       viewBox="0 0 24 24"
//       strokeWidth="2"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="M19 9l-7 7-7-7"
//       />
//     </svg>
//   </button>

//   {/* Dropdown Menu */}
//   <AnimatePresence>
//     {isDropdownOpen && (
//       <motion.div
//         initial={{ opacity: 0, y: -10 }} // Initial animation state
//         animate={{ opacity: 1, y: 0 }} // Animate in
//         exit={{ opacity: 0, y: -10 }} // Animate out
//         transition={{ duration: 0.2 }} // Animation duration
//         className="absolute right-0 mt-2 w-40 bg-blue-200 text-black rounded-md shadow-lg language-menu"
//       >
//         <button
//           onClick={() => changeLanguage("⚜️ FR")}
//           className="block w-full text-left px-4 py-2 hover:bg-gray-200 transition-colors duration-200"
//         >
//           ⚜️ FR
//         </button>
//         <button
//           onClick={() => changeLanguage("🇨🇦 EN")}
//           className="block w-full text-left px-4 py-2 hover:bg-gray-200 transition-colors duration-200"
//         >
//           🇨🇦 EN
//         </button>
//         <button
//           onClick={() => changeLanguage("🇨🇱 ES")}
//           className="block w-full text-left px-4 py-2 hover:bg-gray-200 transition-colors duration-200"
//         >
//           🇨🇱 ES
//         </button>
//       </motion.div>
//     )}
//   </AnimatePresence>
// </div>