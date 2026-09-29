import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectThemeMode } from './features/theme/themeSlice';
import Header from './components/Header';
import FilterSidebar from './components/FilterSidebar';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';

export default function App() {
  const mode = useSelector(selectThemeMode);

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
  }, [mode]);

  return (
    <>
      <Header />
      <main className="layout">
        <FilterSidebar />
        <ProductGrid />
      </main>
      <CartDrawer />
    </>
  );
}
