import React, { useState } from "react";
import { getStellarData } from "../../api/api";
import Link from "next/link";
import { GetStaticProps } from "next";
import styles from "@/styles/Grid.module.css";

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
        <section className={`relative flex-1 text-white`}>
          {Object.entries(groupedMoons).map(([planetId, planetMoons]) => {
            const [showCount, setShowCount] = useState(20);
            return (
              <div key={planetId}>
                <Link href={`/planets/${planetId}`} className="font-bold text-lg">
                  {planetId}
                </Link>
                <div className="moon-grid flex flex-wrap justify-start items-center">
                  {planetMoons.slice(0, showCount).map((moon) => (
                    <Link key={moon.moon_id} href={`/moons/${moon.moon_id}`}>
                      <div className={`${styles["moon-item"]} bg-gray-700 hover:bg-gray-300 hover:text-black rounded-lg p-8`} style={{ transition: "all 0.2s ease-in-out", flex: 1, padding: '0.7rem'}}>
                        <h3 className="text-center">{moon.englishName}</h3>
                      </div>
                    </Link>
                  ))}
                </div>
                {planetMoons.length > showCount && (
                  <div className="flex justify-center mt-4">
                    <button
                      className="px-4 py-2 rounded-md bg-yellow-600 text-white hover:bg-sky-300 hover:text-black"
                      onClick={() => setShowCount(showCount => showCount + 10)}
                      style={{transition: "all 0.2s ease-in-out"}}
                    >
                      See more
                    </button>
                  </div>
                )}
              </div>
            );
          })}
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
