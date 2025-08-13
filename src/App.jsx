import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import MainLayout from "./layout/MainLayout";
import ProjectPage from "./pages/projects/ProjectPage";
import ProductPage from "./pages/products/ProductPage";
import TagsPage from "./pages/tags/TagsPage";
import ClientPage from "./pages/clients/ClientPage";
import AnalyticsPage from "./pages/analytics/AnalyticsPage";
import CreateTagFormPage from "./pages/tags/CreateTagFormPage";
import UpdateTagPage from "./pages/tags/UpdateTagPage";
import CreateProductPage from "./pages/products/CreateProductPage";
import UpdateProductPage from "./pages/products/UpdateProductPage";
import ProductDetailsPage from "./pages/products/ProductDetailsPage";
import AddPhotosProductPage from "./pages/products/AddPhotosProductPage";
import AddProductPricesPage from "./pages/products/AddProductPricesPage";
import AddProductTagsPage from "./pages/products/AddProductTagsPage";
import CreateItemsPage from "./pages/items/CreateItemsPage";
import ItemsCreatedPage from "./pages/items/ItemsCreatedPage";
import UpdateItemPage from "./pages/items/UpdateItemPage";
import ScanItemPage from "./pages/items/ScanItemPage";
import ItemPage from "./pages/items/ItemPage";
import ItemDetailsPage from "./pages/items/ItemDetailsPage";
import CreateEventPage from "./pages/events/CreateEventPage";
import UpdateEventPage from "./pages/events/UpdateEventPage";
import CreateProjectPage from "./pages/projects/CreateProjectPage";
import CreateEmbeddedEventPage from "./pages/events/CreateEmbeddedEventPage";
import UpdateProjectPage from "./pages/projects/UpdateProjectPage";
import ProjectDetailsPage from "./pages/projects/ProjectDetailsPage";
import BudgetPDFPage from "./pages/projects/BudgetPDFPage";
import AddExpensesProjectPage from "./pages/projects/AddExpensesProjectPage";
import AddProductsProjectPage from "./pages/projects/AddProductsProjectPage";
import OutletItemPage from "./pages/projects/OutletItemPage";
import ReturnItemPage from "./pages/projects/ReturnItemPage";
import LoginPage from "./pages/auth/LoginPage";
import CreateClientPage from "./pages/clients/CreateClientPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import RepeatPasswordPage from "./pages/auth/RepeatPasswordPage";
import ChangePasswordPage from "./pages/auth/ChangePasswordPage";
import UpdateClientPage from "./pages/clients/UpdateClientPage";
import ClientDetailsPage from "./pages/clients/ClientDetailsPage";
import CreateEmbeddedClientPage from "./pages/clients/CreateEmbeddedClientPage";
import NotificationPage from "./pages/notifications/NotificationPage";
//import "./styles/products.css";

/*function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<ProjectPage />} />
          <Route path="/tags" element={<TagsPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/clients" element={<ClientPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />

          <Route path="/tag/create" element={<CreateTagFormPage />} />
          <Route path="/tag/edit/:tagId" element={<UpdateTagPage />} />

          <Route path="/product/create" element={<CreateProductPage />} />
          <Route path="/product/edit/:productId" element={<UpdateProductPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/product/:id/photos/create" element={<AddPhotosProductPage />} />
          <Route path="/product/:id/prices/create" element={<AddProductPricesPage />} />
          <Route path="/product/:id/tag/add" element={<AddProductTagsPage />} />

          <Route path="/products/:productId/items/create" element={<CreateItemsPage />} />
          <Route path="/products/:productId/items/created" element={<ItemsCreatedPage />} />
          <Route path="/items/:id/edit" element={<UpdateItemPage />} />
          <Route path="/scan-item" element={<ScanItemPage />} />
          <Route path="/product/:id/items" element={<ItemPage />} />
          <Route path="/item/:id/details" element={<ItemDetailsPage />} />

          <Route path="/event/create" element={<CreateEventPage />} />
          <Route path="/event/:id/edit" element={<UpdateEventPage />} />
          <Route path="/events/create/embedded" element={<CreateEmbeddedEventPage />} />

          <Route path="/project/create" element={<CreateProjectPage />} />
          <Route path="/project/:id/edit" element={<UpdateProjectPage />} />
          <Route path="/project/:id" element={<ProjectDetailsPage />} />
          <Route path="/project/:id/budget" element={<BudgetPDFPage />} />
          <Route path="/project/:id/expenses/create" element={<AddExpensesProjectPage />} />
          <Route path="/project/:id/products/create" element={<AddProductsProjectPage />} />
          <Route path="/project/:id/outlet" element={<OutletItemPage />} />
          <Route path="/project/:id/return" element={<ReturnItemPage />} />
        </Route>

        <Route path="/auth/login" element={<LoginPage />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;*/

/*--------------------------- */

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/forgot/password" element={<ForgotPasswordPage />} />
        <Route path="/auth/restore/password" element={<RepeatPasswordPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ProjectPage />} />
          <Route path="/tags" element={<TagsPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/clients" element={<ClientPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />

          <Route path="/tag/create" element={<CreateTagFormPage />} />
          <Route path="/tag/edit/:tagId" element={<UpdateTagPage />} />

          <Route path="/product/create" element={<CreateProductPage />} />
          <Route
            path="/product/edit/:productId"
            element={<UpdateProductPage />}
          />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route
            path="/product/:id/photos/create"
            element={<AddPhotosProductPage />}
          />
          <Route
            path="/product/:id/prices/create"
            element={<AddProductPricesPage />}
          />
          <Route path="/product/:id/tag/add" element={<AddProductTagsPage />} />

          <Route
            path="/products/:productId/items/create"
            element={<CreateItemsPage />}
          />
          <Route
            path="/products/:productId/items/created"
            element={<ItemsCreatedPage />}
          />
          <Route path="/items/:id/edit" element={<UpdateItemPage />} />
          <Route path="/scan-item" element={<ScanItemPage />} />
          <Route path="/product/:id/items" element={<ItemPage />} />
          <Route path="/item/:id/details" element={<ItemDetailsPage />} />

          <Route path="/event/create" element={<CreateEventPage />} />
          <Route path="/event/:id/edit" element={<UpdateEventPage />} />
          <Route
            path="/events/create/embedded"
            element={<CreateEmbeddedEventPage />}
          />

          <Route path="/project/create" element={<CreateProjectPage />} />
          <Route path="/project/:id/edit" element={<UpdateProjectPage />} />
          <Route path="/project/:id" element={<ProjectDetailsPage />} />
          <Route path="/project/:id/budget" element={<BudgetPDFPage />} />
          <Route
            path="/project/:id/expenses/create"
            element={<AddExpensesProjectPage />}
          />
          <Route
            path="/project/:id/products/create"
            element={<AddProductsProjectPage />}
          />
          <Route path="/project/:id/outlet" element={<OutletItemPage />} />
          <Route path="/project/:id/return" element={<ReturnItemPage />} />

          <Route path="/client/create" element={<CreateClientPage />} />
          <Route path="/client/:id/edit" element={<UpdateClientPage />} />
          <Route path="/client/:id" element={<ClientDetailsPage />} />
          <Route
            path="/clients/create/embedded"
            element={<CreateEmbeddedClientPage />}
          />

          <Route path="/change/password" element={<ChangePasswordPage />} />

          <Route path="/notifications" element={<NotificationPage />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
