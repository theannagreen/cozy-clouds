import * as usersAPI from "./users-api";

const BASE_URL = "/api/users";

export async function signUp(userData) {
  const token = await usersAPI.signUp(userData);
  localStorage.setItem("token", token);
  return getUser();
}

export async function login(credentials) {
  const token = await usersAPI.login(credentials);
  localStorage.setItem("token", token);
  return getUser();
}

export function logOut() {
  localStorage.removeItem("token");
}

export function getToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const payload = JSON.parse(atob(token.split(".")[1]));
  if (payload.exp * 1000 < Date.now()) {
    localStorage.removeItem("token");
    return null;
  }
  return token;
}

export function getUser() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split(".")[1])).user : null;
}

export function saveLocation(location) {
  return sendRequest(`${BASE_URL}/save-location`, "POST", { location });
}

export function deleteLocation(location) {
  return sendRequest(`${BASE_URL}/delete-location/${location}`, "DELETE");
}

export function getSavedLocations() {
  return sendRequest(`${BASE_URL}/saved-locations`);
}

async function sendRequest(url, method = "GET", payload = null) {
  const options = { method };
  if (payload) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(payload);
  }
  const res = await fetch(url, options);
  if (res.ok) return res.json();
  throw new Error("Bad Request");
}
