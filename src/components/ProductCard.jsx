import { memo } from 'react';
import { formatPrice } from '../utils';

function ProductCard({ product, isFav, onAdd, onToggleFav }) {
  const { id, name, category, emoji, hue, price, rating, inStock } = product;

  return (
    <article className="card">
      <div
        className="card-media"
        style={{ '--h': hue }}
        aria-hidden="true"
      >
        <span>{emoji}</span>
        <button
          className={`fav ${isFav ? 'on' : ''}`}
          onClick={() => onToggleFav(id)}
          aria-label={isFav ? `Remove ${name} from saved` : `Save ${name}`}
          aria-pressed={isFav}
        >
          {isFav ? '♥' : '♡'}
        </button>
      </div>
      <div className="card-body">
        <p className="muted small">{category}</p>
        <h3>{name}</h3>
        <p className="small">{rating.toFixed(1)}★</p>
        <div className="card-foot">
          <strong>{formatPrice(price)}</strong>
          <button className="btn btn-primary btn-sm" disabled={!inStock} onClick={() => onAdd(product)}>
            {inStock ? 'Add to cart' : 'Sold out'}
          </button>
        </div>
      </div>
    </article>
  );
}

export default memo(ProductCard);
