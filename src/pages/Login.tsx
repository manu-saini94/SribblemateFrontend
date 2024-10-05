import { LoginCredentialsType } from "authtypes";
import withAuth from "components/auth/withAuth";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "redux/store";
import {
  validateEmail,
  validatePassword,
} from "utility/validationutils/authValidationUtils";
import { loginUser } from "../redux/asyncThunks";

const Login = () => {
  const [formValues, setFormValues] = useState<LoginCredentialsType>({
    email: "",
    password: "",
  } as LoginCredentialsType);

  const [errors, setErrors] = useState<Partial<LoginCredentialsType>>(
    {} as Partial<LoginCredentialsType>
  );

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const navigateToSignup = () => {
    navigate("/signup");
  };

  const validateForm = (): Partial<LoginCredentialsType> => {
    const { email, password } = formValues;
    const newErrors: Partial<LoginCredentialsType> = {
      email: validateEmail(email),
      password: validatePassword(password),
    };

    return Object.fromEntries(
      Object.entries(newErrors).filter(([_, value]) => value)
    ) as Partial<LoginCredentialsType>;
  };

  const handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null,
    }));
  };

  const navigateToLogin = () => {
    navigate("/note");
  };

  const handleLoginSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const { email, password } = formValues;
      const loginDetails: LoginCredentialsType = { email, password };
      dispatch(loginUser(loginDetails))
        .unwrap()
        .then(() => {
          navigateToLogin();
        })
        .catch((error) => {
          console.error("Login failed: ", error);
        });
    }
  };

  return (
    <form onSubmit={handleLoginSubmit}>
      <div className="d-flex row justify-content-center">
        <div className="col-sm-9 form-floating mb-3">
          <input
            type="text"
            className="form-control custom-input"
            id="email"
            name="email"
            placeholder="name@example.com"
            value={formValues.email}
            onChange={handleChange}
          />
          <label htmlFor="email" className="custom-label">
            Email
          </label>

          <div className="warning-text text-danger">{errors.email}</div>
        </div>
        <div className="col-sm-9 form-floating mb-3">
          <input
            type="password"
            className="form-control custom-input"
            id="password"
            name="password"
            placeholder="Abc@12345"
            value={formValues.password}
            onChange={handleChange}
          />
          <label htmlFor="password" className="custom-label">
            Password
          </label>

          <div className="warning-text text-danger">{errors.password}</div>
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
          onClick={navigateToSignup}
        >
          <button type="button" className="btn btn-link">
            SIGN UP
          </button>
        </div>
      </div>
    </form>
  );
};

export default withAuth(Login);
