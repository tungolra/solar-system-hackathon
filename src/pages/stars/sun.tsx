import React from "react";
import { getStellarData } from "../../api/api";
import { GetStaticProps } from "next";

interface StarProps {
  star_id: string;
  englishName: string;
  massValue: number;
  massExponent: number;
  meanRadius: number;
}

export default function StarsDirectory(starProps: StarProps) {
  return (
    <div>
      <h2 className="font-bold text-lg">Stars</h2>
      <p>Star ID: {starProps.star_id}</p>
      <p>Name: {starProps.englishName}</p>
      <p>Mass Value: {starProps.massValue}</p>
      <p>Mass Exponent: {starProps.massExponent}</p>
      <p>Mean Radius: {starProps.meanRadius}</p>
    </div>
  );
}

export const getStaticProps: GetStaticProps<StarProps> = async () => {
  const stars = await getStellarData("star");
  const { star_id, englishName, massValue, massExponent, meanRadius } = stars;
  return {
    props: {
      star_id,
      englishName,
      massValue,
      massExponent,
      meanRadius,
    },
  };
};
