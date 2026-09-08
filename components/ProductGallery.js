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
        {colors.map((color) => (
          <button
            key={color.name}
            type="button"
            onClick={() => onSelectColor(color)}
            title={color.name}
            aria-label={color.name}
            aria-pressed={selectedColor.name === color.name}
            className={
              selectedColor.name === color.name ? `${styles.swatch} ${styles.swatchActive}` : styles.swatch
            }
            style={{ background: color.hex }}
          />
        ))}
      </div>
    </div>
  );
}
