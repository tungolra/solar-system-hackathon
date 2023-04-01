import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { getObjectData, getStellarData } from "../../api/api";

type Planet = {
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

export default function PlanetPage({ planet }: PlanetPageProps) {
  console.log(planet)
  return (
    <div>
      <h1>PlanetPage</h1>
      <p>Name: {planet.englishName}</p>
      <p>Body Type: {planet.bodyType}</p>
      <p>discoveredBy: {planet.discoveredBy}</p>
      <p>discoveryDate: {planet.discoveryDate}</p>
      <p>aphelion: {planet.aphelion}</p>
      <p>gravity: {planet.gravity}</p>
      <p>inclination: {planet.inclination}</p>
      <p>massExponent: {planet.massExponent}</p>
      <p>massValue: {planet.massValue}</p>
      <p>meanRadius: {planet.meanRadius}</p>
      <p>perihelion: {planet.perihelion}</p>
      <p>planet_id: {planet.planet_id}</p>
      <p>sideralOrbit: {planet.sideralOrbit}</p>
      <p>sideralRotation: {planet.sideralRotation}</p>
      <p>star_id: {planet.star_id}</p>
    </div>
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
      planet,
    },
  };
};
