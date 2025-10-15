import axiosInstance from "../api/axiosConfig";
import { Flight, LoginResponse, UsernameResponse } from "../types/interfaces";

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

export const getUsername = async (token: string): Promise<string> => {
  try {
    const response = await axiosInstance.get<UsernameResponse>("/username", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.data.result === "success") {
      return response.data.username;
    } else {
      throw new Error("Unauthorized");
    }
  } catch (error) {
    throw new Error("Failed to fetch username");
  }
};

export const getFlightList = async (
  token: string,
  page: number = 1,
  size: number = 100
): Promise<Flight[]> => {
  try {
    const response = await axiosInstance.get<{
      total: number;
      result: Flight[];
    }>("/list", {
      headers: { Authorization: `Bearer ${token}` },
      params: { page, size },
    });

    return response.data.result;
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new Error("Unauthorized");
    }
    throw new Error("Failed to fetch flight list");
  }
};
