import React from "react";
import Link from "next/link";

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
      path: "/sun",
    },
  ];
  return (
    <div>
      {links.map((link) => {
        return (
          <Link key={link.title} href={link.path}>
            <div>
              <h2>{link.title} &rarr;</h2>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
