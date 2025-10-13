"use client";
import { useEffect, useState } from "react";

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 450);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`
        fixed bottom-6 
        transition-[right,opacity] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] 
        ${visible ? "right-6 opacity-100" : "-right-20 opacity-0"} 
        bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-2 rounded-full shadow-lg cursor-pointer
      `}
    >
      ↑
    </button>
  );
};

export default BackToTopButton;
