import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <>
      <Head>
        <title>Solar System Quackathon</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <NavBar />
        </div>
      </main>
    </>
  );
}
