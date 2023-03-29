import React from "react";
import { getStellarData } from "../../api/api";
import Link from "next/link";
import { GetStaticProps } from "next";

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
    <div className="w-80">
      <h1>Moons</h1>
      {Object.entries(groupedMoons).map(([planetId, planetMoons]) => (
        <div key={planetId}>
          <Link href={`/planets/${planetId}`} className="font-bold text-lg">
            {planetId}
          </Link>
          <ul className="flex flex-row">
            {planetMoons.map((moon) => (
              <li key={moon.moon_id}>
                <Link href={`/moons/${moon.moon_id}`}>
                  <h3>{moon.englishName}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
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
