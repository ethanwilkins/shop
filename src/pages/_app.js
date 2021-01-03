import App from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";

import Layout from "../components/_App/Layout";
import "../styles/globals.scss";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default MyApp;
