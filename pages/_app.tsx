import Head from "next/head";

import "./global.scss";
import { MainBody } from "@/components/global/MainBody";
import { Navbar } from "@/components/global/Navbar";
import { Footer } from "@/components/global/Footer";
import { ThemeProvider } from "@/utils/context";

// This default export is required in a new `pages/_app.js` file.
export default ({ Component, pageProps }) => (
    <>
        <Head>
            <link
                href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
                rel="stylesheet"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
                rel="stylesheet"
            ></link>

            <script src="/analytics.js"></script>
        </Head>

        <ThemeProvider>
            <Navbar />
            <MainBody>
                <Component {...pageProps} />
            </MainBody>

            <Footer />
        </ThemeProvider>
    </>
);
