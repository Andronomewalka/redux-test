import { createAsyncThunk } from "@reduxjs/toolkit";
import { setTimeoutAsync } from "@/utils/setTimeoutAsync.js";
import safeLocalStorage from "@/utils/safeLocalStorage.js";
import requestStatus from "@/utils/requestStatus";

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (user, { rejectWithValue }) => {
    try {
      console.log("signing in", user);
      const response = await setTimeoutAsync(() => {
        try {
          const res = {
            success: false,
            email: user.email,
          };

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
          return res;
        } catch (err) {
          console.log(err);
          return {
            success: false,
            reject: true,
            payload: err?.message,
          };
        }
      }, 1500);

      if (response.reject) {
        throw new Error(response.payload);
      }

      return response;
    } catch (err) {
      return rejectWithValue(err?.message ?? "signing in fucked up");
    }
  }
);

signIn.pendingInternal = (state, action) => {
  state.status = requestStatus.requesting;
};

signIn.fulfilledInternal = (state, action) => {
  state.status = requestStatus.succeeded;
  const response = action.payload;
  state.email = response.email;
  if (response.success) {
    state.validationError = "";
    state.isSignedIn = true;
  } else {
    state.validationError = response.error;
  }
};

signIn.rejectedInternal = (state, action) => {
  state.status = requestStatus.failed;
  state.error = action.payload;
};

export const signUp = createAsyncThunk(
  "auth/SignUp",
  async (user, { rejectWithValue }) => {
    try {
      const response = await setTimeoutAsync(() => {
        const res = {
          success: false,
          email: user.email,
        };
        try {
          user.isLoggedIn = true;
          safeLocalStorage.setItem("user", JSON.stringify(user));
          res.success = true;
        } catch (err) {
          res.reject = true;
          res.payload = err?.message;
        }
        return res;
      });

      if (response.reject) {
        throw new Error(response.payload);
      }

      return response;
    } catch (err) {
      return rejectWithValue(err?.message ?? "signing up fucked up");
    }
  }
);

signUp.pendingInternal = (state, action) => {
  state.status = requestStatus.requesting;
};

signUp.fulfilledInternal = (state, action) => {
  state.status = requestStatus.succeeded;
  const response = action.payload;
  state.email = response.email;
  if (response.success) {
    state.validationError = "";
    state.isSignedIn = true;
  } else {
    state.validationError = response.payload;
  }
};

signUp.rejectedInternal = (state, action) => {
  state.status = requestStatus.failed;
  state.error = action.error.message;
};

export const fetchLastUsedEmail = createAsyncThunk(
  "auth/fetchLastUsedEmail",
  async (_, { rejectWithValue }) => {
    try {
      console.log("fetching last user");
      const rawUser = safeLocalStorage.getItem("user");
      if (rawUser) {
        return JSON.parse(rawUser)?.email;
      }
    } catch (err) {
      return rejectWithValue(
        err?.message ?? "fetching last used email fucked up"
      );
    }
  }
);

fetchLastUsedEmail.pendingInternal = (state, action) => {
  state.status = requestStatus.requesting;
};

fetchLastUsedEmail.fulfilledInternal = (state, action) => {
  state.status = requestStatus.succeeded;
  state.email = action.payload;
};

fetchLastUsedEmail.rejectedInternal = (state, action) => {
  state.status = requestStatus.failed;
  state.error = action.error.message;
};
