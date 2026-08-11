function isHomePage() {
  return (
    window.location.pathname.endsWith("/index.html") ||
    window.location.pathname === "/"
  );
}

export function getProductDetailsPath(id) {
  return isHomePage()
    ? `./Assets/pages/Product-details.html?id=${id}`
    : `./Product-details.html?id=${id}`;
}

export function getPageLinksPath(name) {
  return isHomePage() ? `./Assets/pages/${name}.html` : `./${name}.html`;
}

export function getHomepagePath() {
  return isHomePage() ? `./index.html` : `../../index.html`;
}

export function getProductCategoryPath(name) {
  return isHomePage()
    ? `./Assets/pages/Products.html?category=${name}`
    : `./Products.html?category=${name}`;
}
