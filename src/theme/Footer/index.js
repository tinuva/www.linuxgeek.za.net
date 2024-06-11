// ./theme/Footer/index.js
import React from "react";
import Footer from "@theme-original/Footer";
import Docsly from "@docsly/react";
import "@docsly/react/styles.css";
import { useLocation } from "@docusaurus/router";

export default function FooterWrapper(props) {
  const { pathname } = useLocation();
  return (
    <>
      <Footer {...props} />
      <Docsly publicId="pk_FwmqSIGMmzg0AhMKuER5VXBOzsg9GucSvS9lKb45dOFdKCsz" pathname={pathname} />
    </>
  );
}