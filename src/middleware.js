export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/profile/:path*",
    "/users/:path*",
    "/categories/:path*",
    "/products-items/:path*",
    "/orders/:path*",
    "/cart/:path*",
    "/brands-admin/:path*",
    "/analytics/:path*",
  ],
};
