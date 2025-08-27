import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  productStatus: [],
  productsInProject: [],
  selectedPrices: {},
  pageable: null,
  selectedProduct: null,
  selectProductDetails: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateProductInStore: (state, action) => {
      const updatedProduct = action.payload;
      const index = state.products.findIndex(
        (p) => p.product_id === updatedProduct.product_id
      );
      if (index !== -1) {
        state.products[index] = updatedProduct;
      }
    },
    fetchProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.products = action.payload.products;
      state.pageable = action.payload.pageable;
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    productLoading: (state) => {
      state.loading = true;
    },
    productSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    productError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setSelectedProductDetails: (state, action) => {
      state.selectProductDetails = action.payload;
    },
    deleteProductPhotoInStore: (state, action) => {
      const { photo_id } = action.payload;

      if (state.selectProductDetails?.photos) {
        state.selectProductDetails.photos =
          state.selectProductDetails.photos.filter(
            (photo) => photo.photo_id !== photo_id
          );
      }
    },
    addProductPriceInStore: (state, action) => {
      return {
        ...state,
        selectProductDetails: {
          ...state.selectProductDetails,
          prices: [...state.selectProductDetails.prices, action.payload],
        },
      };
    },
    removeProductPriceInStore: (state, action) => {
      return {
        ...state,
        selectProductDetails: {
          ...state.selectProductDetails,
          prices: state.selectProductDetails.prices.filter(
            (price) => price.rent_price_id !== action.payload.rent_price_id
          ),
        },
      };
    },

    addDescriptionTagInStore: (state, action) => {
      return {
        ...state,
        selectProductDetails: {
          ...state.selectProductDetails,
          description_tags: [
            ...state.selectProductDetails.description_tags,
            action.payload,
          ],
        },
      };
    },

    removeDescriptionTagInStore: (state, action) => {
      return {
        ...state,
        selectProductDetails: {
          ...state.selectProductDetails,
          description_tags: state.selectProductDetails.description_tags.filter(
            (tag) => tag.tag_id !== action.payload.tag_id
          ),
        },
      };
    },

    addRelationTagInStore: (state, action) => {
      return {
        ...state,
        selectProductDetails: {
          ...state.selectProductDetails,
          relation_tags: [
            ...state.selectProductDetails.relation_tags,
            action.payload,
          ],
        },
      };
    },

    removeRelationTagInStore: (state, action) => {
      return {
        ...state,
        selectProductDetails: {
          ...state.selectProductDetails,
          relation_tags: state.selectProductDetails.relation_tags.filter(
            (tag) => tag.tag_id !== action.payload.tag_id
          ),
        },
      };
    },

    // Para los tags de dependencia
    addDependencyTagInStore: (state, action) => {
      return {
        ...state,
        selectProductDetails: {
          ...state.selectProductDetails,
          dependency_tags: [
            ...state.selectProductDetails.dependency_tags,
            action.payload,
          ],
        },
      };
    },

    removeDependencyTagInStore: (state, action) => {
      return {
        ...state,
        selectProductDetails: {
          ...state.selectProductDetails,
          dependency_tags: state.selectProductDetails.dependency_tags.filter(
            (tag) => tag.tag_id !== action.payload.tag_id
          ),
        },
      };
    },

    //Sirve para eliminar un producto de la store (array products, details y selected)
    removeProductInStore: (state, action) => {
      const productIdToDelete = action.payload.product_id;

      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== productIdToDelete
        ),
        selectedProduct:
          state.selectedProduct?.id === productIdToDelete
            ? null
            : state.selectedProduct,
        selectProductDetails:
          state.selectProductDetails?.id === productIdToDelete
            ? null
            : state.selectProductDetails,
      };
    },

    setProductStatusInStore: (state, action) => {
      state.productStatus = action.payload;
    },


    setProductSelectedPricesInStore: (state, action) => {
      const { productId, prices } = action.payload;
      state.selectedPrices[productId] = prices;
    },
    setProductsInProjectInStore: (state, action) => {
      state.productsInProject = action.payload.products;
    },
    addProductInProject: (state, action) => {
      const payload = {
        ...action.payload,
        rent_price: action.payload.rent_price_value,
      };
      return {
        ...state,
        productsInProject: [...state.productsInProject, payload],
      };
    },
    removeProductInProject: (state, action) => {
      return {
        ...state,
        productsInProject: state.productsInProject.filter(
          (prod) => prod.product_project_id !== action.payload
        ),
      };
    },
  },
});

export const {
  addProduct,
  updateProductInStore,
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  productLoading,
  productSuccess,
  productError,
  setSelectedProduct,
  setSelectedProductDetails,
  deleteProductPhotoInStore,
  addProductPriceInStore,
  removeProductPriceInStore,
  addDescriptionTagInStore,
  removeDescriptionTagInStore,
  addRelationTagInStore,
  removeRelationTagInStore,
  addDependencyTagInStore,
  removeDependencyTagInStore,
  removeProductInStore,
  setProductStatusInStore,
  setProductSelectedPricesInStore,
  setProductsInProjectInStore,
  addProductInProject,
  removeProductInProject,
} = productSlice.actions;

export default productSlice.reducer;
