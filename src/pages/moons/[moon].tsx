import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { getObjectData, getStellarData } from "../../api/api";

type Moon = {
  moon_id: string;
  englishName: string;
  nameDetail: string;
  periphelion: number;
  aphelion: number;
  inclination: number;
  massValue: number;
  massExponent: number;
  sideralRotation: number;
  sideralOrbit: number;
  planet_id: string;
  discoveredBy: string;
  discoveryDate: string;
  bodyType: string;
};

interface MoonPageProps {
  moon: Moon;
}
export default function MoonPage({ moon }: MoonPageProps) {
  return (
    <div>
      <h1>{moon.englishName}</h1>
      <p>{moon.nameDetail}</p>

      <p>Perihelion: {moon.periphelion}</p>
      <p>Aphelion: {moon.aphelion}</p>
      <p>Inclination: {moon.inclination}</p>
      <p>
        Mass: {moon.massValue} x 10<sup>{moon.massExponent}</sup> kg
      </p>
      <p>Sideral Rotation: {moon.sideralRotation}</p>
      <p>Sideral Orbit: {moon.sideralOrbit}</p>
      <p>Planet: {moon.planet_id}</p>
      <p>Discovered By: {moon.discoveredBy}</p>
      <p>Discovery Date: {moon.discoveryDate}</p>
      <p>Body Type: {moon.bodyType}</p>
    </div>
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
