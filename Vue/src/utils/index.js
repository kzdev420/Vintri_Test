import axios from "axios";

let email_regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
let API_URL = "http://localhost:8000";

export const emailValidate = (email) => email_regex.test(email);
export const fetchBeers = async (user) => {
  const res = await axios({
    method: "get",
    baseURL: API_URL,
    url: `${API_URL}/beers`,
    headers: {
      "x-user": user,
    },
  });

  return res.data;
};

export const addFeedback = async (user, id, data) => {
  const res = await axios({
    method: "post",
    baseURL: API_URL,
    url: `${API_URL}/beers/${id}`,
    headers: {
      "x-user": user,
    },
    data,
  });

  return res.data;
};
