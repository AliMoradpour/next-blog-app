import { NextRequest } from "next/server";

export const middlewareAuth = async (req: NextRequest): Promise<any | null> => {
  const accessToken = req.cookies.get("accessToken");
  const refreshToken = req.cookies.get("refreshToken");

  if (!accessToken || !refreshToken) {
    return null; // Return null if tokens are missing
  }

  const options = {
    method: "GET",
    credentials: "include" as RequestCredentials,
    headers: {
      Cookie: `${accessToken.name}=${accessToken.value}; ${refreshToken.name}=${refreshToken.value};`,
    },
  };

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`, options);

    if (!res.ok) {
      return null; // Return null if the response is not OK
    }

    const { data } = await res.json();
    return data?.user || null; // Return user or null if not found
  } catch (error) {
    console.error("Error in middlewareAuth:", error);
    return null; // Return null on error
  }
};
