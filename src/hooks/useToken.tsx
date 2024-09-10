import { useEffect, useState } from "react";

export const useToken = (): [
  string | null,
  React.Dispatch<React.SetStateAction<string | null>>
] => {
  // const [token, setToken] = useState<string | null>(
  //   localStorage.getItem("token")
  // );

  const [token, setToken] = useState<string | null>(null);

  const getCookie = (name: string) => {
    const cookieName = `${name}=`;
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim());

    for (const cookie of cookies) {
      if (cookie.startsWith(cookieName)) {
        return decodeURIComponent(cookie.substring(cookieName.length));
      }
    }
    return null;
  };

  useEffect(() => {
    // const storedToken = localStorage.getItem("token");
    const token = getCookie("accessToken");
    setToken(token);
  }, []);

  return [token, setToken];
};
