const DEV_BASE_URL = "http://localhost:5000";
const PROD_BASE_URL = "http://34.145.227.117:5000"
const BASE_URL = PROD_BASE_URL;

function getAuthToken() {
  return localStorage.getItem("todo-auth-token") || "";
}

export interface UserInfo {
  email: string;
  uid: string;
}

export async function getUser() {
  const response = await fetch(BASE_URL + "/user", {
    headers: {
      "authorization": getAuthToken()
    }
  })

  if (response.ok) {
    const json: UserInfo = await response.json();
    return json;
  }

  throw new Error("Unable to get user");

}

export {};