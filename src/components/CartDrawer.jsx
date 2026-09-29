import { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCartItems, selectCartOpen, selectCartTotal,
  incrementQty, decrementQty, removeFromCart, clearCart, closeCart,
} from '../features/cart/cartSlice';
import { formatPrice } from '../utils';

function CartDrawer() {
  const dispatch = useDispatch();
  const open = useSelector(selectCartOpen);
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  const onClose = useCallback(() => dispatch(closeCart()), [dispatch]);
  const onClear = useCallback(() => dispatch(clearCart()), [dispatch]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && dispatch(closeCart());
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, dispatch]);

  return (
    <>
      <div className={`scrim ${open ? 'open' : ''}`} onClick={onClose} />
      <aside className={`drawer ${open ? 'open' : ''}`} role="dialog" aria-label="Shopping cart" aria-hidden={!open}>
        <div className="drawer-head">
          <h2>Your cart</h2>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>Close</button>
        </div>

        {items.length === 0 ? (
          <p className="muted pad">Your cart is empty. Add something from the grid.</p>
        ) : (
          <>
            <ul className="cart-list">
              {items.map((i) => (
                <li key={i.id} className="cart-row">
                  <span className="cart-emoji">{i.emoji}</span>
                  <div className="cart-info">
                    <strong>{i.name}</strong>
                    <span className="muted small">{formatPrice(i.price)}</span>
                  </div>
                  <div className="qty">
                    <button aria-label={`Decrease ${i.name}`} onClick={() => dispatch(decrementQty(i.id))}>−</button>
                    <span>{i.qty}</span>
                    <button aria-label={`Increase ${i.name}`} onClick={() => dispatch(incrementQty(i.id))}>+</button>
                  </div>
                  <button className="link" onClick={() => dispatch(removeFromCart(i.id))}>Remove</button>
                </li>
              ))}
            </ul>
            <div className="drawer-foot">
              <div className="total"><span>Total</span><strong>{formatPrice(total)}</strong></div>
              <button className="btn btn-primary block">Check out</button>
              <button className="link" onClick={onClear}>Empty cart</button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export default memo(CartDrawer);
