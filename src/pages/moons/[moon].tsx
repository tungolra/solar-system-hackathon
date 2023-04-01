import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { getObjectData, getStellarData } from "../../api/api";
import Layout from "@/components/Layout";
import styles from "@/styles/DetailsPage.module.css";

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
  function formatString(str: string): string {
    let result = "";

    // capitalize the first letter
    result = str.charAt(0).toUpperCase() + str.slice(1);

    // add a space before any capitalized letter
    for (let i = 1; i < result.length; i++) {
      if (result.charAt(i) === result.charAt(i).toUpperCase()) {
        result = result.slice(0, i) + " " + result.slice(i);
        i++;
      }
    }

    return result;
  }

  const RenderTable: React.FC<RenderTableProps> = ({ obj }) => {
    return (
      <table className="table-auto ">
        <tbody>
          {Object.entries(obj).map((item: any) =>
            typeof item[1] === "number" ? (
              <tr key={item[0]}>
                <td className="p-2">{formatString(item[0])}</td>
                <td className="break-words">{item[1]}</td>
              </tr>
            ) : null
          )}
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

  return { props: { moon } };
};
