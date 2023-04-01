import React from "react";
import NavBar from "./NavBar";

type LayoutProps = {
  title: string;
  children: React.ReactNode;
};

export default function Layout({ title, children }: LayoutProps) {
  return (
    <main className="h-screen flex flex-col font-mono relative">
      <div className="h-full w-screen -z-50 absolute bg-gradient-to-br from-black to-slate-700"></div>
      <div>
        <NavBar />
      </div>
      <div className="flex justify-center items-center">
        <h2 className="text-white text-2xl uppercase font-bold tracking-widest">
          {title}
        </h2>
      </div>

      {children}
    </main>
  );
}
