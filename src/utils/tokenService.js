function setToken(token) {
  if (token) {
    // localStorage is given by the browser
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
}

function getToken() {
  let token = localStorage.getItem("token");
  if (token) {
    // Check if expired, remove if it is
    const payload = JSON.parse(atob(token.split(".")[1]));
    // JWT's exp is expressed in seconds, not milliseconds, so convert
    if (payload.exp < Date.now() / 1000) {
      localStorage.removeItem("token");
      token = null;
    }
  }
  return token;
}

function getUserFromToken() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split(".")[1])).user : null;
}

function removeToken() {
  localStorage.removeItem("token");
}

const tokenService = {
  setToken,
  getToken,
  removeToken,
  getUserFromToken,
};

export default tokenService;
