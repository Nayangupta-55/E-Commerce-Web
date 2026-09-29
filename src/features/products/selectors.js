import { createSelector } from '@reduxjs/toolkit';
import { PRODUCTS } from '../../data/products';
import { selectFilters } from '../filters/filtersSlice';

const SORTERS = {
  featured: null,
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating,
  newest: (a, b) => b.addedAt - a.addedAt,
};

export function applyFilters(products, f) {
  const q = f.search.trim().toLowerCase();
  const out = products.filter(
    (p) =>
      (f.categories.length === 0 || f.categories.includes(p.category)) &&
      p.price >= f.priceMin &&
      p.price <= f.priceMax &&
      p.rating >= f.minRating &&
      (!f.inStockOnly || p.inStock) &&
      (q === '' || p.name.toLowerCase().includes(q))
  );
  const sorter = SORTERS[f.sortBy];
  return sorter ? out.sort(sorter) : out; 
}
export const selectFilteredProducts = createSelector([selectFilters], (filters) =>
  applyFilters(PRODUCTS, filters)
);
