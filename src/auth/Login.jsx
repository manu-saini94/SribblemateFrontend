import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const navigateToSignup = () => {
    navigate("/signup");
  };

  const handleLoginSubmit = async () => {
    const loginDetails = { email, password };
    await registerUser(loginDetails)
      .then((response) => {
        if (response.success) {
          navigate("/note");
        } else {
          setApiError(response.message);
        }
      })
      .catch((error) => {
        setApiError("An error occurred. Please try again.", error);
      });
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      {apiError && (
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          {apiError}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      <div className="card" style={{ width: "45rem" }}>
        <div className="card-body">
          <h1 className="d-flex justify-content-center mt-5 mb-5">
            SCRIBBLE MATE
          </h1>
          <form onSubmit={() => handleLoginSubmit()}>
            <div className="d-flex row justify-content-center">
              <div className="mb-4 row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 d-flex justify-content-end col-form-label fw-medium"
                >
                  Email :
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    id="staticEmail"
                  />
                </div>
              </div>
              <div className="mb-4 row">
                <label
                  htmlFor="inputPassword"
                  className="col-sm-2 d-flex justify-content-end col-form-label fw-medium"
                >
                  Password :
                </label>
                <div className="col-sm-9">
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword"
                  />
                </div>
              </div>

              <div className="d-flex justify-content-center mb-3">
                <button type="submit" className="btn btn-warning">
                  LOG IN
                </button>
              </div>
              <span className="d-flex justify-content-center fs-6 fw-light">
                Don't have an account?
              </span>
              <div
                className="d-flex justify-content-center"
                onClick={() => navigateToSignup()}
              >
                <button type="button" className="btn btn-link">
                  SIGN UP
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
