import { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartCount, toggleCart } from '../features/cart/cartSlice';
import { selectFavoriteIds } from '../features/favorites/favoritesSlice';
import { selectFilters, setSearch } from '../features/filters/filtersSlice';
import ThemeToggle from './ThemeToggle';

function Header() {
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const favCount = useSelector(selectFavoriteIds).length;
  const search = useSelector(selectFilters).search;

  const onSearch = useCallback((e) => dispatch(setSearch(e.target.value)), [dispatch]);
  const onCart = useCallback(() => dispatch(toggleCart()), [dispatch]);

  return (
    <header className="header">
      <h1 className="brand">Kiln</h1>
      <input
        className="search"
        type="search"
        placeholder="Search lamps, bowls, rugs…"
        value={search}
        onChange={onSearch}
        aria-label="Search products"
      />
      <div className="header-actions">
        <span className="pill" title="Saved items">♥ {favCount}</span>
        <ThemeToggle />
        <button className="btn btn-primary" onClick={onCart}>
          Cart <span className="badge">{cartCount}</span>
        </button>
      </div>
    </header>
  );
}

export default memo(Header);
