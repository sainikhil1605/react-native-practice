import axios from "axios";
import { FIREBASE_API_KEY } from "@env";
const authenticate = async (mode, email, password) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${FIREBASE_API_KEY}`;
  const response = await axios.post(url, {
    email,
    password,
    returnSecureToken: true,
  });
  const token = response.data.idToken;
  return token;
};
const createUser = (email, password) => {
  return authenticate("signUp", email, password);
};
const login = (email, password) => {
  return authenticate("signInWithPassword", email, password);
};

export { createUser, login };
