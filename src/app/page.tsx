"use client";

import Image from "next/image";

export default function HomePage() {
  return (
    <div className="bg-black p-2 h-screen">
      <div className="bg-[url('/bg-coming-soon.svg')] h-[calc(100vh-50px)] w-full bg-no-repeat bg-cover bg-center rounded-2xl relative flex justify-center items-center px-10">
        <div className="flex justify-center items-center z-10">
          <Image
            src="/logo.svg"
            alt="save"
            width={1000}
            height={1000}
            className="w-[147.51px] h-[45.46px] sm:w-[241.38px] sm:h-[74.46px]"
          />
        </div>

        <p className="absolute bottom-8 w-full text-[20px] text-center font-semibold text-white z-10 tracking-[-2px]">
          Coming Soon
        </p>
      </div>
    </div>
  );
}
