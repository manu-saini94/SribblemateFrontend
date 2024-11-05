import { AuthProps } from "authtypes";
import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import Lightlogo from "../../assets/SM-logo-lgt.png";

const Auth = ({ children }: AuthProps): ReactNode => {
  const registerError = useSelector(
    (state: RootState) => state.auth.registerError
  );

  const loginError = useSelector((state: RootState) => state.auth.loginError);

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <div className="card" style={{ width: "45rem" }}>
        <div className="card-body">
          <div className="d-flex justify-content-center mt-3 mb-3">
            <img
              height="115px"
              width="220px"
              src={Lightlogo}
              alt="Scribble Mate"
            />
          </div>
          {registerError && (
            <div
              className="alert alert-warning alert-dismissible fade show"
              role="alert"
            >
              {registerError}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          )}
          {loginError && (
            <div
              className="alert alert-warning alert-dismissible fade show"
              role="alert"
            >
              {loginError}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Auth;
