import { createAsyncThunk } from "@reduxjs/toolkit";
import { setTimeoutAsync } from "utils/setTimeoutAsync";
import safeLocalStorage from "utils/safeLocalStorage";
import { RequestStatus } from "utils/requestStatus";
import { ThunkActions } from "state/utils/ThunkActions";
import { ResponseResult } from "state/utils/ResponseResult";
import { User, UserState } from "./types";

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (user: User, { rejectWithValue }) => {
    try {
      console.log("signing in", user);
      const response: ResponseResult<string> = await setTimeoutAsync(() => {

        const res: ResponseResult<string> = {
          success: false,
          data: user.email,
        };

        try {
          const storedRawUser = safeLocalStorage.getItem("user");
          if (!storedRawUser) {
            res.error = "no user exist";
            return res;
          }

          const storedUser = JSON.parse(storedRawUser);
          if (storedUser.email !== user.email) {
            res.error = "wrong email";
            return res;
          } else if (storedUser.password !== user.password) {
            res.error = "wrong pass";
            return res;
          }

          user.isSignedIn = true;
          safeLocalStorage.setItem("user", JSON.stringify(user));
          res.success = true;
        } catch (err: any) {
          res.success = false;
          res.error = err?.message
        }

        return res;
      }, 1500);

      if (!response.success) {
        throw new Error(response.error);
      }

      return response;
    } catch (err: any) {
      return rejectWithValue(err?.message ?? "signing in fucked up");
    }
  }
);

export const signInActions: ThunkActions<UserState, ResponseResult<string>> = {
  pending: (state, action) => {
    state.status = RequestStatus.Requesting;
  },
  fulfilled: (state, action) => {
    state.status = RequestStatus.Succeeded;
    const response = action.payload;
    if (response.success) {
      state.email = response.data;
      state.validationError = "";
      state.isSignedIn = true;
    } else {
      state.validationError = response.error ?? "";
    }
  },
  rejected: (state, action) => {
    state.status = RequestStatus.Failed;
    state.error = action.payload;
  }
}

export const signUp = createAsyncThunk(
  "auth/SignUp",
  async (user: User, { rejectWithValue }) => {
    try {
      const response: ResponseResult<string> = await setTimeoutAsync(() => {

        const res: ResponseResult<string> = {
          success: false,
          data: user.email,
        };

        try {
          user.isSignedIn = true;
          safeLocalStorage.setItem("user", JSON.stringify(user));
          res.success = true;
        } catch (err: any) {
          res.success = false;
          res.error = err?.message
        }
        return res;
      }, 500);

      if (!response.success) {
        throw new Error(response.error);
      }

      return response;
    } catch (err: any) {
      return rejectWithValue(err?.message ?? "signing up fucked up");
    }
  }
);

export const signUpActions: ThunkActions<UserState, ResponseResult<string>> = {
  pending: (state, action) => {
    state.status = RequestStatus.Requesting;
  },
  fulfilled: (state, action) => {
    state.status = RequestStatus.Succeeded;
    const response = action.payload;
    state.email = response.data;
    if (response.success) {
      state.validationError = "";
      state.isSignedIn = true;
    } else {
      state.validationError = response.error ?? "";
    }
  },
  rejected: (state, action) => {
    state.status = RequestStatus.Failed;
    state.error = action.error.message;
  }
}

export const fetchLastUsedEmail = createAsyncThunk(
  "auth/fetchLastUsedEmail",
  async (_, { rejectWithValue }) => {
    try {
      console.log("fetching last user");
      const rawUser = safeLocalStorage.getItem("user");
      if (rawUser) {
        return JSON.parse(rawUser)?.email;
      }
    } catch (err: any) {
      return rejectWithValue(
        err?.message ?? "fetching last used email fucked up"
      );
    }
  }
);

export const fetchLastUsedEmailActions: ThunkActions<UserState, string> = {
  pending: (state, action) => {
    state.status = RequestStatus.Requesting;
  },
  fulfilled: (state, action) => {
    state.status = RequestStatus.Succeeded;
    state.email = action.payload;
  },
  rejected: (state, action) => {
    state.status = RequestStatus.Failed;
    state.error = action.error.message;
  }
}