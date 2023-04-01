import React from "react";
import { getStellarData } from "../../api/api";
import Link from "next/link";
import { GetStaticProps } from "next";
import styles from "@/styles/Home.module.css";

interface Moon {
  moon_id: string;
  englishName: string;
  planet_id: string;
}

interface MoonsProps {
  moons: Moon[];
}

function groupMoonsByPlanet(moons: Moon[]) {
  return moons.reduce((acc, moon) => {
    if (acc[moon.planet_id]) {
      acc[moon.planet_id].push(moon);
    } else {
      acc[moon.planet_id] = [moon];
    }
    return acc;
  }, {} as { [key: string]: Moon[] });
}

export default function MoonsPage({ moons }: MoonsProps) {
  const groupedMoons = groupMoonsByPlanet(moons);

  return (
    <main className="h-screen flex flex-col font-mono relative">
      <div className="bg-gradient-to-b from-black to-slate-700 flex-1 flex flex-col justify-start items-center p-8">
        <h1 className="font-bold text-lg text-white mb-4">Moons Directory</h1>
        <section className={`relative flex-1 ${styles.grid} grid grid-cols-4 gap-6 text-white`}>
          {Object.entries(groupedMoons).map(([planetId, planetMoons]) => (
            <div key={planetId}>
              <Link href={`/planets/${planetId}`} className="font-bold text-lg">
                {planetId}
              </Link>
              <div className="moon-grid">
                {planetMoons.map((moon) => (
                  <Link key={moon.moon_id} href={`/moons/${moon.moon_id}`}>
                    <div className="moon-item">
                      <h3 className="text-center">{moon.englishName}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}

export const getStaticProps: GetStaticProps<MoonsProps> = async () => {
  const moons = await getStellarData("moons");
  return {
    props: {
      moons,
    },
  };
};
