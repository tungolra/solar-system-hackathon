import React, { useState } from "react";
import { getStellarData } from "../../api/api";
import Link from "next/link";
import { GetStaticProps } from "next";
import styles from "@/styles/Grid.module.css";
import Layout from "@/components/Layout";

interface Moon {
  moon_id: string;
  englishName: string;
  planetEnglishName: string;
}

interface MoonsProps {
  moons: Moon[];
}

function groupMoonsByPlanet(moons: Moon[]) {
  return moons.reduce((acc, moon) => {
    if (acc[moon.planetEnglishName]) {
      acc[moon.planetEnglishName].push(moon);
    } else {
      acc[moon.planetEnglishName] = [moon];
    }
    return acc;
  }, {} as { [key: string]: Moon[] });
}

export default function MoonsPage({ moons }: MoonsProps) {
  const groupedMoons = groupMoonsByPlanet(moons);

  const [showCounts, setShowCounts] = useState<{ [key: string]: number }>(
    Object.keys(groupedMoons).reduce(
      (acc, planetId) => ({
        ...acc,
        [planetId]: 20,
      }),
      {}
    )
  );

  const handleShowMore = (planetId: string) => {
    setShowCounts((counts) => ({
      ...counts,
      [planetId]: counts[planetId] + 10,
    }));
  };

  return (
    <Layout title="Moons Directory">
      <section className={`relative flex-1 text-white w-4/5 mx-auto`}>
        {Object.entries(groupedMoons).sort().map(([planetId, planetMoons]) => {
          const showCount = showCounts[planetId];
          return (
            <div key={planetId} className="text-center">
              <Link
                href={`/planets/${planetId}`}
                className="font-bold text-xl uppercase px-4 tracking-wider "
              >
                {planetId}
              </Link>
              <div className="moon-grid flex flex-wrap justify-center items-center mb-5">
                {planetMoons.slice(0, showCount).map((moon) => (
                  <Link key={moon.moon_id} href={`/moons/${moon.moon_id}`}>
                    <div className={`${styles["moon-item"]}`}>
                      <h3 className="text-center">{moon.englishName}</h3>
                    </div>
                  </Link>
                ))}
              </div>
              {planetMoons.length > showCount && (
                <div className="flex justify-center mt-4 mb-4">
                  <button
                    className="px-4 py-2 rounded-md bg-yellow-600 text-white hover:bg-sky-300 hover:text-black"
                    onClick={() => handleShowMore(planetId)}
                    style={{ transition: "all 0.2s ease-in-out" }}
                  >
                    See more
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<MoonsProps> = async () => {
  const moons = await getStellarData("moons");
  return {
    props: {
      moons,
    },
  };
};
