import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { getObjectData, getStellarData } from "../../api/api";
import Layout from "@/components/Layout";
import styles from "@/styles/DetailsPage.module.css";
import { formatString } from "@/utils/formatString";

type Moon = {
  map(arg0: (obj: any) => void): unknown;
  moon_id: string;
  englishName: string;
  meanRadius: number;
  nameDetail: string;
  periphelion: number;
  aphelion: number;
  inclination: number;
  massValue: number;
  massExponent: number;
  sideralRotation: number;
  sideralOrbit: number;
  planetEnglishName: string;
  planet_id: string;
  discoveredBy: string;
  discoveryDate: string;
  bodyType: string;
};

interface MoonPageProps {
  moon: Moon;
}

interface RenderTableProps {
  obj: any;
}

export default function MoonPage({ moon }: MoonPageProps) {
  const RenderTable: React.FC<RenderTableProps> = ({ obj }) => {
    return (
      <table className="table-auto ">
        <tbody className="text-white flex flex-col">
          <tr className="flex flex-col">
            <td className="underline font-bold">Aphelion</td>
            <td className="">
              {obj.aphelion < 1 ? "N/A" : `${obj?.aphelion.toLocaleString()} kms`}
            </td>
          </tr>
          <tr className="flex flex-col">
            <td className="underline font-bold">Periphelion</td>
            <td className="">
              {obj?.perphelion < 1 || obj?.periphelion == undefined
                ? "N/A"
                : `${obj?.periphelion?.toLocaleString()} kms`}
            </td>
          </tr>
          <tr className="flex flex-col">
            <td className="underline font-bold">Inclination</td>
            <td className="">{obj?.inclination}&deg;</td>
          </tr>
          <tr className="flex flex-col">
            <td className="underline font-bold">Mass</td>
            <td className="">
              {" "}
              {obj?.massValue?.toLocaleString()} x 10
              <sup>{obj?.massExponent}</sup> kg
            </td>
          </tr>
          <tr className="flex flex-col">
            <td className="underline font-bold">Mean Radius</td>
            <td className="">
              {obj?.meanRadius === 0
                ? "N/A"
                : obj?.meanRadius?.toLocaleString()} km
            </td>
          </tr>
          <tr className="flex flex-col">
            <td className="underline font-bold">Sideral Orbit</td>
            <td className="">{obj?.sideralOrbit} days</td>
          </tr>
          <tr className="flex flex-col">
            <td className="underline font-bold">Sideral Rotation</td>
            <td className="">{obj?.sideralRotation} hrs</td>
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
    <Layout title={`${moon.englishName}`}>
      <main className="flex flex-col font-mono relative flex-grow">
        <div className="flex flex-row h-full">
          <section className="rounded-lg w-1/5 m-5 border border-white text-white flex flex-col justify-center items-center my-auto ">
            <div className="flex flex-col p-5 justify-center items-center ">
              <RenderTable obj={moon} />
            </div>
          </section>
          <section className="w-3/5 flex items-center justify-center">
            <div
              className={`${styles.stellarObject}`}
              style={{
                background: "linear-gradient(45deg,  #a5a5a5, #707070, #353535",
              }}
            ></div>
          </section>
          <section className="rounded-lg w-1/5 p-5 m-5 text-white text-left flex flex-col justify-center border border-white my-auto">
            <div className="rounded-lg  p-2 ">
              <RenderFacts obj={moon} />
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const moons = await getStellarData("moons");
  const paths = moons.map((moon: Moon) => ({
    params: { moon: moon.moon_id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const moon = await getObjectData("moon", params?.moon as string);

  return {
    props: {
      moon: moon || null,
    },
  };
};
