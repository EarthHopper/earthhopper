import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/styles/globals.css";
import { CustomProvider } from "rsuite";
import { StateProvider } from "@/context/store";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>EarthHopper</title>
      </Head>
      <div className="flex flex-col min-h-screen justify-between">
        <Header />
        <div className="m-auto w-[80%] my-10">
          <CustomProvider theme="dark">
            <StateProvider>
              <Component {...pageProps} />
            </StateProvider>
          </CustomProvider>
        </div>
        <Footer />
      </div>
    </>
  );
}
