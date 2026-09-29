import { memo, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFilters, toggleCategory, setPriceMin, setPriceMax,
  setMinRating, toggleInStock, setSortBy, resetFilters, PRICE_STEP,
} from '../features/filters/filtersSlice';
import { CATEGORIES, PRODUCTS, MIN_PRICE, MAX_PRICE } from '../data/products';
import { formatPrice } from '../utils';

const CATEGORY_COUNTS = PRODUCTS.reduce((acc, p) => {
  acc[p.category] = (acc[p.category] || 0) + 1;
  return acc;
}, {});

const RATINGS = [0, 3, 4, 4.5];

function FilterSidebar() {
  const dispatch = useDispatch();
  const f = useSelector(selectFilters);

  const onCategory = useCallback((e) => dispatch(toggleCategory(e.target.value)), [dispatch]);
  const onMin = useCallback((e) => dispatch(setPriceMin(Number(e.target.value))), [dispatch]);
  const onMax = useCallback((e) => dispatch(setPriceMax(Number(e.target.value))), [dispatch]);
  const onRating = useCallback((e) => dispatch(setMinRating(Number(e.target.value))), [dispatch]);
  const onStock = useCallback(() => dispatch(toggleInStock()), [dispatch]);
  const onSort = useCallback((e) => dispatch(setSortBy(e.target.value)), [dispatch]);
  const onReset = useCallback(() => dispatch(resetFilters()), [dispatch]);

  const activeCount = useMemo(
    () =>
      f.categories.length +
      (f.priceMin !== MIN_PRICE || f.priceMax !== MAX_PRICE ? 1 : 0) +
      (f.minRating > 0 ? 1 : 0) +
      (f.inStockOnly ? 1 : 0),
    [f.categories, f.priceMin, f.priceMax, f.minRating, f.inStockOnly]
  );

  return (
    <aside className="sidebar" aria-label="Product filters">
      <div className="sidebar-head">
        <h2>Filters{activeCount > 0 && <span className="badge">{activeCount}</span>}</h2>
        <button className="link" onClick={onReset} disabled={activeCount === 0 && f.sortBy === 'featured' && !f.search}>
          Clear all
        </button>
      </div>

      <label className="field">
        <span className="field-label">Sort by</span>
        <select value={f.sortBy} onChange={onSort}>
          <option value="featured">Featured</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="rating">Top rated</option>
          <option value="newest">Newest</option>
        </select>
      </label>

      <fieldset className="field">
        <legend className="field-label">Category</legend>
        {CATEGORIES.map((c) => (
          <label key={c.id} className="check">
            <input type="checkbox" value={c.id} checked={f.categories.includes(c.id)} onChange={onCategory} />
            <span>{c.label}</span>
            <span className="muted">{CATEGORY_COUNTS[c.id]}</span>
          </label>
        ))}
      </fieldset>

      <fieldset className="field">
        <legend className="field-label">Price range</legend>
        <div className="range-values">
          <span>{formatPrice(f.priceMin)}</span>
          <span>{formatPrice(f.priceMax)}</span>
        </div>
        <input type="range" aria-label="Minimum price" min={MIN_PRICE} max={MAX_PRICE} step={PRICE_STEP} value={f.priceMin} onChange={onMin} />
        <input type="range" aria-label="Maximum price" min={MIN_PRICE} max={MAX_PRICE} step={PRICE_STEP} value={f.priceMax} onChange={onMax} />
      </fieldset>

      <fieldset className="field">
        <legend className="field-label">Rating</legend>
        {RATINGS.map((r) => (
          <label key={r} className="check">
            <input type="radio" name="rating" value={r} checked={f.minRating === r} onChange={onRating} />
            <span>{r === 0 ? 'Any rating' : `${r}★ & up`}</span>
          </label>
        ))}
      </fieldset>

      <label className="check">
        <input type="checkbox" checked={f.inStockOnly} onChange={onStock} />
        <span>In stock only</span>
      </label>
    </aside>
  );
}

export default memo(FilterSidebar);
