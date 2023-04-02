import React from "react";
import { getStellarData } from "../../api/api";
import { GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";
import styles from "@/styles/Grid.module.css";
import Layout from "@/components/Layout";

interface Planet {
  planet_id: string;
  englishName: string;
}

interface PlanetProps {
  planets: Planet[];
}

interface ColourStyle {
  [key: string]: string | null;
}





export default function PlanetsDirectory({ planets }: PlanetProps) {
  const colourStyles: ColourStyle[] = [
    { Mercury: "linear-gradient(to right, #6B7280, #4B5563)" || null },
    { Venus: "linear-gradient(to right, #6B7280, #8B5D33)" || null },
    { Earth: "linear-gradient(to right, #34D399, #3B82F6)" || null },
    { Mars: "linear-gradient(to right, #EF4444, #8B5D33)" || null },
    { Jupiter: "linear-gradient(to right, #8B5D33, #F59E0B)" || null },
    { Saturn: "linear-gradient(to right, #FBBF24, #22D3EE)" || null },
    { Uranus: "linear-gradient(to right, #22D3EE, #3B82F6)" || null },
    { Pluto: "linear-gradient(to right, #22D3EE, #10B981)" || null },
    { Neptune: "linear-gradient(to right, #3B82F6, #1D4ED8)" || null },
    { Haumea: "linear-gradient(to right, #22D3EE, #3B82F6)" || null },
    { Makemake: "linear-gradient(to right, #22D3EE, #3B82F6)" || null },
    { Eris: "linear-gradient(to right, #22D3EE, #3B82F6)" || null },
  ];
  return (
    <Layout title="Planets Directory">
      <section
        className={`mb-5 relative flex-1 ${styles.grid} grid grid-cols-3 gap-6 w-4/5 mx-auto`}
      >
        {planets.map((planet: any, idx: number) => (
          <Link key={planet.planet_id} href={`planets/${planet.planet_id}`}>
            <div className={`${styles["grid-item"]} flex flex-col`}>
              <div className="flex justify-center mb-2 uppercase tracking-wider font-bold">{planet.englishName}</div>
              <div
                className="flex justify-center mx-auto"
                style={{
                  height: "100px",
                  width: "100px",
                  borderRadius: "50%",
                  background:
                  `${colourStyles[idx][planet.englishName]}`,
                  boxShadow: "0px 0px 15px #ff9933",
                }}
              ></div>
            </div>
          </Link>
        ))}
      </section>
    </Layout>
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
