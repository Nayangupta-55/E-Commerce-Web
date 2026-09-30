# Kiln: E-Commerce SPA with Redux Toolkit

A single-page home-goods store built with **React** and **Redux Toolkit**. All shared state (cart, favourites, filters and theme) lives in one global store and is updated through dispatched actions.

**Live demo:** https://e-commerce-web-gray-omega.vercel.app/
**Repository:** https://github.com/Nayangupta-55/E-Commerce-Web

## Features

- **Global store:** one Redux store wrapped around the app with `<Provider>`.
- **Cart slice:** add items, increase or decrease quantity, remove items, clear the cart, live total.
- **Favourites slice:** save and unsave products with the heart button.
- **Multi-filter sidebar:** category, price range, minimum rating, in-stock only, sorting, and header search. The product grid updates instantly as the store changes.
- **Dark / light theme:** controlled entirely by a Redux theme slice, with the user's choice remembered.
- **Persistence:** cart, favourites and theme survive a page reload via `localStorage`.
- **Performance work:** memoised selectors, `useMemo`, `useCallback`, `React.memo`, `useDeferredValue` and a paginated grid.

## Tech stack

| Area | Tools |
|---|---|
| UI | React 18, Vite |
| State | Redux Toolkit, react-redux |
| Styling | Plain CSS with theme variables |

## Author
-- Nayan Gupta

