import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/_App/Layout";
import "../styles/globals.scss";

import { StoreProvider } from "../utils/zustandProvider";
import { useHydrate } from "../utils/initializeStore";

const App = ({ Component, pageProps }) => {
  const store = useHydrate(pageProps.initialZustandState);

  return (
    <StoreProvider store={store}>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  );
};

export default App;
