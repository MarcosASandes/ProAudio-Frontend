import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  productStatus: [],
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

    // ✅ NUEVO REDUCER
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setSelectedProductDetails: (state, action) => {
      state.selectProductDetails = action.payload;
    },
    deleteProductPhotoInStore: (state, action) => {
      const { photo_id } = action.payload;

      console.log("Before:", state.selectProductDetails?.photos);

      // Si no existe la lista de fotos, evita el error
      if (state.selectProductDetails?.photos) {
        state.selectProductDetails.photos =
          state.selectProductDetails.photos.filter(
            (photo) => photo.photo_id !== photo_id
          );
      }

      console.log("After:", state.selectProductDetails?.photos);
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

    //Para los tags descriptivos
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

    // Para los tags de relación
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
  },
});

// ✅ Exporta acciones
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
} = productSlice.actions;

export default productSlice.reducer;
