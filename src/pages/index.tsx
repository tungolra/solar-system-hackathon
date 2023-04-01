import Head from "next/head";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import SolarSystem from "../images/solar-system.svg";
import { getStellarOverview } from "@/api/api";
import { GetStaticProps } from "next";

interface StarData {
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

export default function Home({ star, planets }: StellarProps) {
 
  return (
    <>
      <Head>
        <title>Solar System Quackathon</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen">
        <div className="h-20 bg-slate-500">
          <NavBar />
        </div>
        <section className="h-60 bg-slate-300">
          <div>Planet</div>
          <div>Sun</div>
        </section>
        <section className="h-20 bg-black">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
          voluptatum sunt ipsam commodi cupiditate consequatur possimus non,
          consequuntur odio illo dolorem laboriosam unde labore enim, nam
          veritatis sed porro! Repellendus.
        </section>
      </main>
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
