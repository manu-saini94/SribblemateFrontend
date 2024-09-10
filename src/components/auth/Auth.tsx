import { AuthProps } from "authtypes";
import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

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
          <h1 className="d-flex justify-content-center mt-5 mb-5">
            SCRIBBLE MATE
          </h1>
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
