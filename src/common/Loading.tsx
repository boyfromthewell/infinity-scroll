import * as React from "react";
import Spinner from "../images/spinner.gif";
function Loading() {
  return (
    <>
      <img src={Spinner} width={50} height={50} alt="loading" />
      <span style={{ fontWeight: "bold" }}>Loading...</span>
    </>
  );
}

export default Loading;
