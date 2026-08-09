const BASE_URL = new URL("../../links/", import.meta.url);

export async function getProducts() {
  try {
    return await fetch(new URL("ProductData.json", BASE_URL)).then((response) =>
      response.json(),
    );
  } catch (err) {
    console.error(err);
  }
}

export async function getLatestProduct() {
  try {
    return await fetch(new URL("LatestProducts.json", BASE_URL)).then(
      (response) => response.json(),
    );
  } catch (err) {
    console.error(err);
  }
}

export async function getCategory() {
  try {
    return await fetch(new URL("Categories.json", BASE_URL)).then((response) =>
      response.json(),
    );
  } catch (err) {
    console.error(err);
  }
}
