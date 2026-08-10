export function getProductDetailsPath(id) {
  const isHomePage =
    window.location.pathname.endsWith("/index.html") ||
    window.location.pathname === "/";

  return isHomePage
    ? `./Assets/pages/Product-details.html?id=${id}`
    : `./Product-details.html?id=${id}`;
}
