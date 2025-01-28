import { useLoginUserMutation } from "api/authApi";
import { AuthStoreType, LoginCredentialsType } from "authtypes";
import withAuth from "components/auth/withAuth";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "redux/store";
import { UserDetailsType } from "userstypes";
import {
  validateEmail,
  validatePassword,
} from "utility/validationutils/authValidationUtils";
import { setAuthUserData } from "../redux/auth/authSlice";

const Login = () => {
  const [formValues, setFormValues] = useState<LoginCredentialsType>({
    email: "",
    password: "",
  } as LoginCredentialsType);

  const [errors, setErrors] = useState<Partial<LoginCredentialsType>>(
    {} as Partial<LoginCredentialsType>
  );

  const [loginUser, { isLoading, error, isSuccess }] = useLoginUserMutation();

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const navigateToSignup = () => {
    navigate("/signup");
  };
  const navigateToHomepage = useCallback(() => {
    navigate("/note");
  }, [navigate]);

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

  const handleLoginSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const { email, password } = formValues;
      const loginDetails: LoginCredentialsType = { email, password };
      loginUser(loginDetails)
        .unwrap()
        .then((res) => {
          const authState: AuthStoreType = {
            authLoading: false,
            authError: null,
            authUserData: res,
            loginSuccess: true,
            logoutSuccess: false,
          };
          dispatch(setAuthUserData(authState));
          navigateToHomepage();
        })
        .catch((err) => {
          const authState: AuthStoreType = {
            authLoading: false,
            authError: err,
            authUserData: {} as UserDetailsType,
            loginSuccess: false,
            logoutSuccess: false,
          };
          dispatch(setAuthUserData(authState));
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
