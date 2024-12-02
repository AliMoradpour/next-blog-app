import { Cookies } from "next/headers";

export default function setCookieOnReq(cookies: Cookies): RequestInit | null {
  const accessToken = cookies.get("accessToken");
  const refreshToken = cookies.get("refreshToken");

  if (!accessToken || !refreshToken) {
    console.warn("Missing access or refresh token in cookies");
    return null; // Return null if tokens are missing
  }

  const options: RequestInit = {
    method: "GET",
    credentials: "include", // Ensure type safety for `credentials`
    headers: {
      Cookie: `${accessToken.name}=${accessToken.value}; ${refreshToken.name}=${refreshToken.value};`,
    },
  };

  return options;
}
