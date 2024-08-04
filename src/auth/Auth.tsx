import { AuthProps } from "authtypes";
import React, { ReactNode } from "react";

const Auth = ({ children }: AuthProps): ReactNode => {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <div className="card" style={{ width: "45rem" }}>
        <div className="card-body">
          <h1 className="d-flex justify-content-center mt-5 mb-5">
            SCRIBBLE MATE
          </h1>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Auth;
