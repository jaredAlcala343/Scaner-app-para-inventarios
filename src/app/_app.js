// pages/_app.js
import { SessionProvider } from "next-auth/react"; // Importa SessionProvider

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
