import axios from "axios";

export const signInUser = async (email: string, password: string) => {
  const res = await axios.post("/user/signin", { email, password });
  if (res.status !== 200) {
    throw new Error("Unable to sign in");
  }
  const data = await res.data;
  return data;
};

export const signUpUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await axios.post("/user/signup", { name, email, password });
  if (res.status !== 200) {
    throw new Error("Unable to sign up");
  }
  const data = await res.data;
  return data;
};

export const checkAuthStatus = async () => {
  try {
    const res = await axios.get("/user/check-status", { withCredentials: true });
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      // User is not authenticated, but this is not an error condition
      return null;
    }
    // For other types of errors, we still want to log and throw
    console.error("Auth status error:", err);
    throw err;
  }
};

export const sendChatReq = async (message: string) => {
  try {
    const res = await axios.post("/chat/new", { message });
    if (res.status !== 200) {
      throw new Error("Unable to send chat");
    }
    const data = await res.data;
    return { chats: [{ role: "assistant", content: data.message }] };
  } catch (err) {
    throw err;
  }
};

export const getUserChats = async () => {
  try {
    const res = await axios.get("/chat/all-chats");
    if (res.status !== 200) {
      throw new Error("Unable to send chat");
    }
    const data = await res.data;
    return data;
  } catch (err) {
    throw err;
  }
};

export const deleteUserChats = async () => {
  try {
    const res = await axios.delete("/chat/delete");
    if (res.status !== 200) {
      throw new Error("Unable to delete chat");
    }
    const data = await res.data;
    return data;
  } catch (err) {
    throw err;
  }
};

export const logoutUser = async () => {
  try {
    const res = await axios.get("/user/logout");
    if (res.status !== 200) {
      throw new Error("Unable to logout");
    }
    const data = await res.data;
    return data;
  } catch (err) {
    throw err;
  }
};
