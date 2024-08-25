import axios from "axios";

export const signInUser = async (email: string, password: string) => {
  const res = await axios.post("/user/signin", { email, password });
  if (res.status !== 200) {
    throw new Error("Unable to sign in");
  }
  const data = await res.data;
  return data;
};

export const checkAuthStatus = async () => {
  try {
    const res = await axios.get("/user/check-status");
    if (res.status !== 200) {
      throw new Error("Unable to authenticate");
    }
    const data = await res.data;
    return data;
  } catch (err) {
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
    return data;
  } catch (err) {
    throw err;
  }
};
