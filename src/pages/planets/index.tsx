import React from "react";
import { getStellarData } from "../../api/api";
import { GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";

interface Planet {
  planet_id: string;
  englishName: string;
}

interface PlanetProps {
  planets: Planet[];
}

export default function PlanetsDirectory({ planets }: PlanetProps) {
  return (
    <div>
      <h1 className="font-bold text-lg">Planets</h1>
      {planets.map((planet) => (
        <div key={planet.planet_id}>
          <Link href={`planets/${planet.planet_id}`}>{planet.englishName}</Link>
        </div>
      ))}
    </div>
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
