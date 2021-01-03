import Head from "next/head";

import { Container } from "react-bootstrap";

import Header from "./Header";
import HeadContent from "./HeadContent";

function Layout({ children }) {
  return (
    <>
      <Head>
        <HeadContent />
        <title>Shop</title>
      </Head>
      <Header />
      <Container>{children}</Container>
    </>
  );
}

export default Layout;
