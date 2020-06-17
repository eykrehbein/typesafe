import Head from "next/head";

import "./global.scss";
import { MainBody } from "@/components/global/MainBody";
import { Navbar } from "@/components/global/Navbar";

// This default export is required in a new `pages/_app.js` file.
export default ({ Component, pageProps }) => (
  <>
    <Head>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <title>Typesafe - Exclusive Frontend Blog</title>
    </Head>
    <MainBody>
      <Navbar />
      <Component {...pageProps} />
    </MainBody>
  </>
);
