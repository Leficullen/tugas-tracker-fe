"use client";
import { useState } from "react";

export default function HamburgerMenu() {
  const [active, setActive] = useState(false);

  return (
    <div className=""
    >
      <button
        onClick={() => setActive(!active)}
        className="w-7 h-7 flex flex-col justify-around p-[3px]"
      >
        {/* LINE 1 */}
        <span
          className={`
            w-full h-[3px] rounded bg-primary shadow-[0_0.5px_2px_rgba(0,0,0,0.2)]
            transition-all duration-300
            ${active ? "translate-y-[7.5px] -rotate-45 bg-primary" : ""}
          `}
        ></span>

        {/* LINE 2 */}
        <span
          className={`
            h-[3px] rounded bg-primary shadow-[0_0.5px_2px_rgba(0,0,0,0.2)]
            transition-all duration-300
            ${active ? "opacity-0 w-0" : "w-[60%]"}
          `}
        ></span>

        {/* LINE 3 */}
        <span
          className={`
            w-full h-[3px] rounded bg-primary shadow-[0_0.5px_2px_rgba(0,0,0,0.2)]
            transition-all duration-300
            ${active ? "-translate-y-[7.5px] rotate-45 bg-primary" : ""}
          `}
        ></span>
      </button>
    </div>
  );
}
