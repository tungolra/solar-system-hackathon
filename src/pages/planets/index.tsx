import React from "react";
import { getStellarData } from "../../api/api";
import { GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";
import styles from "@/styles/Grid.module.css";

interface Planet {
  planet_id: string;
  englishName: string;
}

interface PlanetProps {
  planets: Planet[];
}

export default function PlanetsDirectory({ planets }: PlanetProps) {
  return (
    <main className="h-screen flex flex-col font-mono relative">
      <div className="bg-gradient-to-b from-black to-slate-700 flex-1 flex flex-col justify-start items-center p-8">
        <h1 className="font-bold text-lg text-white mb-4">Planets Directory</h1>
        <section className={`relative flex-1 ${styles.grid} grid grid-cols-3 gap-6`}>
          {planets.map((planet) => (
            <Link key={planet.planet_id} href={`planets/${planet.planet_id}`}>
              <div className={`${styles["grid-item"]}`}>
                <div className="flex justify-center">{planet.englishName}</div>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );  
}

export const getStaticProps: GetStaticProps<PlanetProps> = async () => {
  const planets = await getStellarData("planets");
  return {
    props: {
      planets,
    },
  };
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   const planets = await getStellarData("planets");
//   const paths = planets.map((planet: Planet) => ({
//     params: { planet: planet.planet_id },
//   }));

//   return { paths, fallback: false };
// };
