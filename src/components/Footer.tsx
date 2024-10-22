import { karla } from "@/app/fonts/font";

export default function Footer() {
  return (
    <footer
      className={`${karla.className} w-full h-14 text-neutral-500 border-t border-t-gray-100 shadow-md flex justify-center items-center`}
    >
      <p className="text-xs">All right reserved &copy; 2024</p>
    </footer>
  );
}
