import { useEffect, useState } from "react";

export const useToken = (): [
  string | null,
  React.Dispatch<React.SetStateAction<string | null>>
] => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log(storedToken, "token");

    setToken(storedToken);
  }, []);

  return [token, setToken];
};
