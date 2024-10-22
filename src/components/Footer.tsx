"use client";
import { karla } from "@/app/fonts/font";
import Link from "next/link";
import { motion } from "framer-motion";
import { container, item } from "@/app/page";
import { GoDotFill } from "react-icons/go";
export default function Footer() {
  return (
    <motion.footer
      variants={container}
      initial="hidden"
      animate="visible"
      className={`${karla.className} bg-[#FCFCFC] fixed bottom-0 w-full h-fit py-2 text-neutral-500 border-t border-t-gray-100 shadow-md flex flex-col justify-center items-center`}
    >
      <motion.p variants={item}>
        made with &lt;3 by{" "}
        <Link className="hover:underline px-1" href={"https://x.com/ajeeshRS_"}>
          @Ajeesh
        </Link>
      </motion.p>
      <motion.p variants={item} className="text-xs flex items-center py-2">
        <span>All right reserved &copy; 2024</span>{" "}
        <GoDotFill className="w-2 h-2 mx-2" /> <Link className="hover:underline" href={"/privacy-policy"}>Privacy Policy</Link>
      </motion.p>
    </motion.footer>
  );
}
