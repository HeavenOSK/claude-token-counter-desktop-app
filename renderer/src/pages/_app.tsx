import { AppProps } from "next/app";
import "../style.css";
import  HeaderBar  from "../components/HeaderBar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col h-screen w-screen">
      <HeaderBar />
      <main className="flex-1 min-h-0">
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;
