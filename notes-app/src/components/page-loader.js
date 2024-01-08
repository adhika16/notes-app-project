import React from "react";
import { Spinner } from "reactstrap";

export const PageLoader = () => {
  return (
    <Spinner
      style={{
        height: "5rem",
        width: "5rem",
      }}
      className="position-absolute top-50 start-50"
    >
      Loading...
    </Spinner>
  );
};
