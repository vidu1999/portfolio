import { Inter } from "next/font/google";
import "./globals.css";
import FireFliesBackground from './compenents/FireFliesBackground';
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "VKJ",
  description: "VKJ PORTFOLIO",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
      <link href="https://fonts.googleapis.com/css2?family=Jacquard+12&display=swap" rel="stylesheet" />
      </Head>
      <body >{children}
      <FireFliesBackground/></body>
    </html>
  );
}
