import React from "react";
import Link from "next/link";
import Favicon from "@/images/app-favicon.svg";
import Image from "next/image";

export default function NavBar() {
  const links = [
    {
      title: "Planets",
      path: "/planets",
    },
    {
      title: "Moons",
      path: "/moons",
    },
    {
      title: "The Sun",
      path: "/stars/sun",
    },
  ];
  return (
    <div className="flex justify-center items-center h-20">
      <Link href="/" className="mr-auto pl-5 flex items-center">
        <Image alt="favicon" src={Favicon} width={50} height={50} />
        <h1 className="text-white pl-5 text-2xl font-bold">Cosmic Classroom</h1>
      </Link>
      <div className="flex justify-center items-center">
        {links.map((link) => {
          return (
            <Link key={link.title} href={link.path} className="text-white">
              <div className="px-5">
                <h2>{link.title} &rarr;</h2>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
