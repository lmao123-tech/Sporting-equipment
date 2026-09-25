import styles from "./ProductGallery.module.css";

// Presentational only — selection state lives in the parent (ProductDetail)
// so both the gallery and the add-to-cart form can share which color is
// selected. No "use client" needed here: it has no hooks of its own, and
// it's only ever rendered from within an already-client component tree.
//
// This stays a deliberate, click-to-select control rather than an
// auto-cycling carousel like ProductCard's: the selected color here also
// decides what gets added to the cart, so it needs to be an explicit user
// choice, not something that changes on a timer underneath them.
export default function ProductGallery({ colors, selectedColor, onSelectColor, productName }) {
  return (
    <div>
      <img
        src={selectedColor.image}
        alt={`${productName} - ${selectedColor.name}`}
        className={styles.image}
      />
      <div className={styles.swatches}>
        {colors.map((color) => {
          const outOfStock = color.stock === 0;
          // Out-of-stock colors stay fully clickable — visitors can still
          // pick one to look at its photos — they just get a crossed-out
          // look here, and AddToCartForm is what actually blocks adding
          // it to the cart.
          const classNames = [
            styles.swatch,
            selectedColor.name === color.name && styles.swatchActive,
            outOfStock && styles.swatchOutOfStock,
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <button
              key={color.name}
              type="button"
              onClick={() => onSelectColor(color)}
              title={outOfStock ? `${color.name} (out of stock)` : color.name}
              aria-label={outOfStock ? `${color.name} (out of stock)` : color.name}
              aria-pressed={selectedColor.name === color.name}
              className={classNames}
              style={{ background: color.hex }}
            />
          );
        })}
      </div>
    </div>
  );
}
