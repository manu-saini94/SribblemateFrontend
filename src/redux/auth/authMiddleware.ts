import { Middleware } from "@reduxjs/toolkit";
import axios from "axios";

const nonAuthUrls = ["/login", "/signup"]; // Add URLs that do not require the auth token

export const authMiddleware: Middleware = (storeAPI) => (next) => (action) => {
  // Proceed with the action
  const result = next(action);

  // Get the updated state
  const state = storeAPI.getState();
  const token = state.auth.token; // Access token from auth state

  // Add a request interceptor to handle auth headers
  axios.interceptors.request.use((config) => {
    if (!nonAuthUrls.some((url) => config.url?.includes(url))) {
      // If the request URL is not in the nonAuthUrls list, set the Authorization header
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        delete axios.defaults.headers.common["Authorization"]; // Remove token if not available
      }
    } else {
      // If the request URL is in the nonAuthUrls list, ensure no Authorization header is set
      delete config.headers.Authorization;
    }
    return config;
  });

  return result;
};
