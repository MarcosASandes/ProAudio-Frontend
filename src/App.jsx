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
      </Route>
    </Routes>
  );
}

export default App;

