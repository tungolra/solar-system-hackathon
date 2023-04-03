import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { getObjectData, getStellarData } from "../../api/api";
import { formatString } from "@/utils/formatString";
import Layout from "@/components/Layout";
import styles from "@/styles/DetailsPage.module.css";
// import planetColors from "@/utils/planetColors.ts";

type Planet = {
  map(arg0: (obj: any) => void): unknown;
  aphelion: number;
  bodyType: string;
  discoveredBy: string;
  discoveryDate: string;
  englishName: string;
  gravity: number;
  inclination: number;
  massExponent: number;
  massValue: number;
  meanRadius: number;
  perihelion: number;
  planet_id: string;
  sideralOrbit: number;
  sideralRotation: number;
  star_id: string;
};

interface PlanetPageProps {
  planet: Planet;
}

interface RenderTableProps {
  obj: any;
}

interface ColourStyle {
  [key: string]: string | null;
}

type PlanetColour = {
  [key: string]: string | null;
};

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

export default function PlanetPage({ planet }: PlanetPageProps) {
  const getPlanetColour = (
    planet: { englishName: string },
    colourStyles: PlanetColour[]
  ): string | null => {
    const matchingColour = colourStyles.find((colourObj) => {
      return Object.keys(colourObj)[0] === planet.englishName;
    });

    return matchingColour
      ? Object.values(matchingColour)[0] // return the value of the matching key
      : "linear-gradient(to right, #22D3EE, #3B82F6)";
  };

  const RenderTable: React.FC<RenderTableProps> = ({ obj }) => {
    return (
      <table className="table-auto ">
        <tbody className="text-white flex flex-col">
          <tr className="flex flex-col ">
            <td className="underline font-bold">Gravity</td>
            <td>{`${obj?.gravity} N`}</td>
          </tr>
          <tr className="flex flex-col ">
            <td className="underline font-bold">Aphelion</td>
            <td>{`${obj?.aphelion.toLocaleString()} kms`}</td>
          </tr>
          <tr className="flex flex-col ">
            <td className="underline font-bold">Perihelion</td>
            <td>{`${obj?.perihelion.toLocaleString()} kms`}</td>
          </tr>
          <tr className="flex flex-col ">
            <td className="underline font-bold">Inclination</td>
            <td>{`${obj?.inclination}`}&deg;</td>
          </tr>
          <tr className="flex flex-col ">
            <td className="underline font-bold">Mass</td>
            <td>
              {obj?.massValue} x 10<sup>{obj?.massExponent}</sup> kg
            </td>
          </tr>

          <tr className="flex flex-col ">
            <td className="underline font-bold">Mean Radius</td>
            <td>{`${obj?.meanRadius.toLocaleString()} km`}</td>
          </tr>
          <tr className="flex flex-col ">
            <td className="underline font-bold">Sideral Orbit</td>
            <td>{`${obj?.sideralOrbit} days`}</td>
          </tr>
          <tr className="flex flex-col ">
            <td className="underline font-bold">Sideral Rotation</td>
            <td>{`${obj?.sideralRotation} hours`}</td>
          </tr>
        </tbody>
      </table>
    );
  };

  const RenderFacts: React.FC<RenderTableProps> = ({ obj }) => {
    return (
      <table>
        <tbody>
          {Object.entries(obj).map((item: any) =>
            typeof item[1] !== "number" && !item[0].includes("_") ? (
              <React.Fragment key={item[0]}>
                <tr className="font-bold underline">{formatString(item[0])}</tr>
                <tr>{item[1]}</tr>
              </React.Fragment>
            ) : null
          )}
        </tbody>
      </table>
    );
  };

  return (
    <Layout title={`${planet.englishName}`}>
      <main className="flex flex-col font-mono relative flex-grow">
        <div className="flex flex-row h-full">
          <section className="rounded-lg w-1/5 m-5 border border-white text-white flex flex-col justify-center items-center my-auto ">
            <div className="flex flex-col p-5 justify-center items-center ">
              <RenderTable obj={planet} />
            </div>
          </section>
          <section className="w-3/5 flex items-center justify-center">
            <div
              className={`${styles.stellarObject}`}
              style={{
                background: `${getPlanetColour(planet, colourStyles)}`,
              }}
            ></div>
          </section>
          <section className="rounded-lg w-1/5 p-5 m-5 text-white text-left flex flex-col justify-center border border-white my-auto">
            <div className="rounded-lg  p-2 ">
              <RenderFacts obj={planet} />
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}
export const getStaticPaths: GetStaticPaths = async () => {
  const planets = await getStellarData("planets");
  const paths = planets.map((planet: Planet) => ({
    params: { planet: planet.planet_id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const planet = await getObjectData("planet", params?.planet as string);
  return {
    props: {
      planet: planet || null,
    },
  };
};
