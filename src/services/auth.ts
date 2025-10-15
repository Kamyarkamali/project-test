import axiosInstance from "../api/axiosConfig";

interface LoginResponse {
  token: string;
  result: string;
}

export const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);

  const response = await axiosInstance.post<LoginResponse>("/login", params, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  return response.data;
};

export const logout = async (token: string) => {
  return axiosInstance.post(
    "/logout",
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const getUsername = async (token: string) => {
  return axiosInstance.get("/username", {
    headers: { Authorization: `Bearer ${token}` },
  });
};
