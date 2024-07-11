import { NextRequest, NextResponse } from "next/server";
// If the incoming request has the "token" cookie
export function middleware(request: NextRequest) {
  const has_token = request.cookies.get("career_token")?.name;

  const { pathname } = request.nextUrl;

  if (has_token === undefined || has_token === null) {
    request.nextUrl.pathname = "/login";
    return NextResponse.redirect(request.nextUrl);
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/dashboard/dashboardfirst/"]
};
