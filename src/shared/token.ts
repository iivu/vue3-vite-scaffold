const TOKEN_NAME = import.meta.env.APP_TOKEN_NAME;

export function getToken() {
  return window.localStorage.getItem(TOKEN_NAME);
}

export function saveToken(token: string) {
  window.localStorage.setItem(TOKEN_NAME, token);
  return token;
}

export function removeToken() {
  window.localStorage.removeItem(TOKEN_NAME);
}
