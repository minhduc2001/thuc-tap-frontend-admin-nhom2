"use client";

import { ApiResponse } from "@/interfaces/apiResponse";
import useApi from "./useApi";
import { ILogin, IRegister, IToken } from "@/interfaces/auth.interface";
import { IUser } from "@/interfaces/user.interface";

const useAuthApi = () => {
  const { POST } = useApi();

  const baseUrl = "/auth";

  async function login(loginInfomation: ILogin): Promise<ApiResponse<IUser>> {
    return POST<ApiResponse<IUser>>(baseUrl + "/login", loginInfomation);
  }

  async function register(
    singupInfomation: IRegister
  ): Promise<ApiResponse<any>> {
    return POST<ApiResponse<any>>(baseUrl + "/register", singupInfomation);
  }

  async function refreshToken(): Promise<ApiResponse<IToken>> {
    return POST<ApiResponse<IToken>>(baseUrl + "refresh", {});
  }
  return { login, register, refreshToken };
};

export default useAuthApi;
