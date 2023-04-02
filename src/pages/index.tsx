import Head from "next/head";
import Image from "next/image";
import { getStellarOverview } from "@/api/api";
import { GetStaticProps } from "next";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import Layout from "@/components/Layout";

interface StarData {
  [x: string]: any;
  map(arg0: (star: any) => void): unknown;
  star: {
    star_id: string;
    englishName: string;
    meanRadius: number; // mean radius distance in km
  }[];
}

interface PlanetData {
  planets: {
    planet_id: string;
    englishName: string;
    meanRadius: number; // mean radius in km
  }[];
}

interface StellarProps {
  star: StarData;
  planets: PlanetData;
}

interface ColourStyle {
  [key: string]: string | null;
}

export default function Home({
  star,
  planets,
}: {
  star: StarData[];
  planets: PlanetData[];
}) {
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
    <>
      <Head>
        <title>Cosmic Classroom</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="../images/app-favicon.svg" />
      </Head>
      <Layout title="Home Page">
        <section className={` relative flex-1`}>
          <div className={`${styles.star} flex justify-center items-center`}>
            {star.map((item: any) => (
              <div
                key={item.englishName}
                className={`${styles.stellarObject} ${styles.star} z-10 my-4`}
                style={
                  {
                    "--mean-radius": `${item.meanRadius}px`,
                  } as React.CSSProperties
                }
              ></div>
            ))}
          </div>
          <div className="flex flex-row absolute top-0 left-0 w-full h-full justify-center items-center z-20">
            {planets.map((item: any, idx: number) => (
              <Link key={item.englishName} href={`/planets/${item.planet_id}`}>
                <div
                  className={`${styles.stellarObject} ${styles.planet} mx-5`}
                  style={
                    {
                      "--mean-radius": `${
                        item.meanRadius < 3000
                          ? "4000px"
                          : item.meanRadius < 10000
                          ? `${item.meanRadius * 2}px`
                          : `${item.meanRadius}px`
                      }`,
                      background: `${colourStyles[idx][item.englishName]}`,
                    } as React.CSSProperties
                  }
                >
                  {" "}
                  <span className="opacity-0 hover:opacity-100 flex items-center justify-center text-white z-20">
                    {item.englishName}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <section className="h-20 flex-1 flex-shrink-0 text-white text-center flex justify-center">
          <p className="self-center text-xl">
            Welcome to our Solar System. Start by clicking on any planets!
          </p>
        </section>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps<StellarProps> = async () => {
  const { star, planets } = await getStellarOverview();
  return {
    props: {
      star,
      planets,
    },
  };
};
