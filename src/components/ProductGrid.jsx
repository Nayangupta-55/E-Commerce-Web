import { memo, useCallback, useDeferredValue, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredProducts } from '../features/products/selectors';
import { addToCart } from '../features/cart/cartSlice';
import { selectFavoriteIds, toggleFavorite } from '../features/favorites/favoritesSlice';
import { resetFilters } from '../features/filters/filtersSlice';
import { PRODUCTS } from '../data/products';
import ProductCard from './ProductCard';

const PAGE_SIZE = 24; 

function ProductGrid() {
  const dispatch = useDispatch();

  const live = useSelector(selectFilteredProducts);
  const results = useDeferredValue(live);
  const isStale = live !== results;

  const favoriteIds = useSelector(selectFavoriteIds);
  const favSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);

  const [visible, setVisible] = useState(PAGE_SIZE);
  useEffect(() => setVisible(PAGE_SIZE), [results]); 

  const shown = useMemo(() => results.slice(0, visible), [results, visible]);

  const onAdd = useCallback((p) => dispatch(addToCart(p)), [dispatch]);
  const onToggleFav = useCallback((id) => dispatch(toggleFavorite(id)), [dispatch]);
  const onMore = useCallback(() => setVisible((v) => v + PAGE_SIZE), []);
  const onReset = useCallback(() => dispatch(resetFilters()), [dispatch]);

  return (
    <section className="grid-wrap" aria-busy={isStale}>
      <p className="results-count" role="status">
        Showing {shown.length} of {results.length} items
        {results.length !== PRODUCTS.length && ` (${PRODUCTS.length} total)`}
      </p>

      {results.length === 0 ? (
        <div className="empty">
          <h2>Nothing matches these filters</h2>
          <p>Widen the price range or clear a category to see more.</p>
          <button className="btn btn-primary" onClick={onReset}>Clear all filters</button>
        </div>
      ) : (
        <>
          <div className={`grid ${isStale ? 'stale' : ''}`}>
            {shown.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                isFav={favSet.has(p.id)}
                onAdd={onAdd}
                onToggleFav={onToggleFav}
              />
            ))}
          </div>
          {visible < results.length && (
            <button className="btn btn-ghost more" onClick={onMore}>
              Show {Math.min(PAGE_SIZE, results.length - visible)} more
            </button>
          )}
        </>
      )}
    </section>
  );
}

export default memo(ProductGrid);
