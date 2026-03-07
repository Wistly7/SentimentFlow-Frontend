"use server";

import { UserDataProfile } from "@/context/AuthContext";
import { api } from "@/lib/constants";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export const fetchUserDataFromServer = async (): Promise<{
  userInfo: UserDataProfile;
} | null> => {
  const cookie = await cookies();
  const authToken = cookie.get("user-token");
  try {
    if (!authToken || !authToken.value) {
      return redirect("/login");
    }
    const userData = await fetchUserData(authToken.value);
    return userData;
  } catch (error: any) {
    return null;
  }
};
export const fetchUserData = async (
  token: string
): Promise<{ userInfo: UserDataProfile } | null> => {
  try {
    const response = await axios.get(`${api}/auth/fetch-user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data as {
      userInfo: { id: string; email: string; name: string; roleId:number };
    };
  } catch (error) {
    console.log(error)
    if (axios.isAxiosError(error)) {
      // Extract the specific error message from your backend's JSON response
      console.log(error.message)
      const backendError =
        error.message || "Login failed due to a server error.";
      // Throw a new, simple error with that specific message
      console.log(backendError);
      console.error(backendError);
    }
    // For any other kind of error, just re-throw it
    return null;
  }
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}): Promise<{ msg: string; token: string; error: string }> => {
  try {
    const response = await axios.post(`${api}/auth/login`, {
      ...credentials,
    });
    return response.data as {
      msg: string;
      token: string;
      error: string;
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Extract the specific error message from your backend's JSON response
      const backendError =
        error.response?.data?.error || "Signup failed due to a server error.";
      // Throw a new, simple error with that specific message
      return { msg: "", token: "", error: backendError };
    }
    // For any other kind of error, just re-throw it
    return { msg: "", token: "", error: "An unexpected error occurred." };
  }
};
export const signUpUser = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}): Promise<{ msg: string; error: string }> => {
  try {
    const response = await axios.post(`${api}/auth/signup`, {
      email,
      password,
      name,
    });
    return response.data as {
      msg: string;
      error: "";
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Extract the specific error message from your backend's JSON response
      const backendError =
        error.response?.data?.error || "Signup failed due to a server error.";
      // Throw a new, simple error with that specific message
      return { msg: "", error: backendError };
    }
    // For any other kind of error, just re-throw it
    return { msg: "", error: "An unexpected error occured" };
  }
};
