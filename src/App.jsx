import { Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import ProjectPage from './pages/ProjectPage';
import ProductPage from './pages/ProductPage';
import TagsPage from './pages/TagsPage';
import ClientPage from './pages/ClientPage';
import ArticlePage from './pages/ArticlePage';
import AnalyticsPage from './pages/AnalyticsPage';
import CreateTagFormPage from './pages/CreateTagFormPage';
import UpdateTagPage from './pages/UpdateTagPage';
import CreateProductPage from './pages/CreateProductPage';
import UpdateProductPage from './pages/UpdateProductPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import AddPhotosProductPage from './pages/AddPhotosProductPage';
import AddProductPricesPage from './pages/AddProductPricesPage';
import AddProductTagsPage from './pages/AddProductTagsPage';
import CreateItemsPage from './pages/items/CreateItemsPage';
import ItemsCreatedPage from './pages/items/ItemsCreatedPage';
import UpdateItemPage from './pages/items/UpdateItemPage';
import ScanItemPage from './pages/items/ScanItemPage';
import ItemPage from './pages/items/ItemPage';
import ItemDetailsPage from './pages/items/ItemDetailsPage';
import "./styles/products.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<ProjectPage />} />
        <Route path='/tags' element={<TagsPage />} />
        <Route path='/products' element={<ProductPage />} />
        <Route path='/clients' element={<ClientPage />} />
        <Route path='/articles' element={<ArticlePage />} />
        <Route path='/analytics' element={<AnalyticsPage />} />

        <Route path='/tag/create' element={<CreateTagFormPage />} />
        <Route path="/tag/edit/:tagId" element={<UpdateTagPage />} />

        <Route path='/product/create' element={<CreateProductPage />} />
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
      </Route>
    </Routes>
  );
}

export default App;

