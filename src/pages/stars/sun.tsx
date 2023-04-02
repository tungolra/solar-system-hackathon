import React from "react";
import { getStellarData } from "../../api/api";
import { GetStaticProps } from "next";
import Layout from "@/components/Layout";
import styles from "@/styles/DetailsPage.module.css";
import { formatString } from "@/utils/formatString";

interface StarProps {
  star_id: string;
  englishName: string;
  massValue: number;
  massExponent: number;
  meanRadius: number;
}

interface RenderTableProps {
  obj: any;
}

export default function StarsPage(starProps: StarProps) {
  const RenderTable: React.FC<RenderTableProps> = ({ obj }) => {
    return (
      <table className="table-auto ">
        <tbody className="text-white flex flex-col">
          <tr className="flex flex-col ">
            <td className="underline font-bold">Mass</td>
            <td>
              {obj?.massValue} x 10<sup>{obj?.massExponent}</sup>kg
            </td>
          </tr>

          <tr className="flex flex-col ">
            <td className="underline font-bold">Mean Radius</td>
            <td>{`${obj?.meanRadius.toLocaleString()}km`}</td>
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
    <Layout title={`${starProps.englishName}`}>
      <main className="flex flex-col font-mono relative flex-grow">
        <div className="flex flex-row h-full">
          <section className="rounded-lg w-1/5 m-5 border border-white text-white flex flex-col justify-center items-center my-auto ">
            <div className="flex flex-col p-5 justify-center items-center ">
              <RenderTable obj={starProps} />
            </div>
          </section>
          <section className="w-3/5 flex items-center justify-center">
            <div
              className={`${styles.stellarObject}`}
              style={{
                background: "linear-gradient(45deg, #ffeb3b, #ff9800, #f44336)",
                boxShadow: "0px 0px 45px #ff9933",
              }}
            ></div>
          </section>
          <section className="rounded-lg w-1/5 p-5 m-5 text-white text-left flex flex-col justify-center border border-white my-auto">
            <div className="rounded-lg  p-2 ">
              <RenderFacts obj={starProps} />
            </div>
          </section>
        </div>
      </main>
    </Layout>
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
