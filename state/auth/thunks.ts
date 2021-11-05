import { createAsyncThunk } from "@reduxjs/toolkit";
import { sha256 } from 'js-sha256'
import { ResponseResult } from "state/utils/ResponseResult";
import { ResponseSignInDTO, ResponseSignInResult, User, UserDTO } from "./types";
import { client } from "utils/client";

export const signIn = createAsyncThunk<ResponseSignInResult, User>
("auth/signIn", async (user, { rejectWithValue }) => {
  try {

    const userRequestDTO: UserDTO = {
      email: user.email,
      hash: sha256(user.password)
    }

    const response: ResponseSignInResult = 
      await client.post('http://127.0.0.1:4000/auth/sign-in', userRequestDTO);
    console.log(response);

    if (!response.success) {
      throw new Error(response.error);
    }
    return response;
  } catch (err: any) {
    return rejectWithValue(err?.message ?? "signing in fucked up");
  }
});

export const signUp = createAsyncThunk<ResponseSignInResult, User>
("auth/SignUp", async (user: User, { rejectWithValue }) => {
  try {

    const userRequestDTO = {
      email: user.email,
      hash: sha256(user.password)
    }

    const response: ResponseSignInResult = 
      await client.post('http://127.0.0.1:4000/auth/sign-up', userRequestDTO);
    console.log(response);

    if (!response.success) {
      throw new Error(response.error);
    }

    return response;
  } catch (err: any) {
    return rejectWithValue(err?.message ?? "signing up fucked up");
  }
});