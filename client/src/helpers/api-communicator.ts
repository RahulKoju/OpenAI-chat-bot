import axios from "axios";

export const signInUser = async (email: string, password: string) => {
  const res = await axios.post("/user/signin", { email, password });
  if (res.status !== 200) {
    throw new Error("Unable to sign in");
  }
  const data = await res.data;
  return data;
};
