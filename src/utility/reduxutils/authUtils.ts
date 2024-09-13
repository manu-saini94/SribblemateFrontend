export const getAuthConfig = (token: string) => {
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};
