export const selectProducts = (state) => state.products.products;
export const selectProductStatus = (state) => state.products.productStatus;
export const selectProductsPageable = (state) => state.products.pageable;
export const selectProductsLoading = (state) => state.products.loading;
export const selectProductsError = (state) => state.products.error;
export const selectSelectedProduct = (state) => state.products.selectedProduct;
export const selectSelectedProductDetails = (state) => state.products.selectProductDetails;