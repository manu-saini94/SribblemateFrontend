import axios from "axios";
import { ErrorCode } from "utility/ErrorCodes";
import { BASE_URL_V1 } from "./serviceUtils";

const navigateToLogin = () => {
  window.location.replace("/login");
};

const api = axios.create({
  baseURL: BASE_URL_V1,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const {
      response: { status, data },
    } = error;
    if (status === 403 || status === 401) {
      switch (data.errorCode) {
        case ErrorCode.JWT_SIGNATURE_INVALID:
          console.error("JWT signature is invalid:", data.message);
          // Handle JWT signature invalid error
          navigateToLogin();
          break;
        case ErrorCode.JWT_TOKEN_EXPIRED:
          console.error("JWT token expired:", data.message);
          try {
            await axios.post("/auth/refresh", {}, { withCredentials: true });
            return api(error.config); // Retry original request
          } catch (refreshError) {
            console.error("Failed to refresh token", refreshError);
            navigateToLogin();
            // Optionally redirect to login or show a message
          }
          break;
        case ErrorCode.REFRESH_TOKEN_EXPIRED:
          console.error("Refresh token expired:", data.message);
          // Handle refresh token expired error
          navigateToLogin();
          break;
        case ErrorCode.REFRESH_TOKEN_MISSING_OR_INVALID:
          console.error("Refresh token missing or invalid:", data.message);
          // Handle missing or invalid refresh token error
          navigateToLogin();
          break;
        case ErrorCode.ACCOUNT_IS_LOCKED:
          console.error("Account is locked:", data.message);
          navigateToLogin();
          // Handle account locked error
          break;
        default:
          console.error("Unhandled error:", data.message);
          navigateToLogin();
        // Handle other errors
      }
    }

    return Promise.reject(error);
  }
);
