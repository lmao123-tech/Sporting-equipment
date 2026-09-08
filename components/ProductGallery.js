// Presentational only — selection state lives in the parent (ProductDetail)
// so both the gallery and the add-to-cart form can share which color is
// selected. No "use client" needed here: it has no hooks of its own, and
// it's only ever rendered from within an already-client component tree.
export default function ProductGallery({ colors, selectedColor, onSelectColor, productName }) {
  return (
    <div>
      <img
        src={selectedColor.image}
        alt={`${productName} - ${selectedColor.name}`}
        style={{ width: "100%", height: "auto", border: "1px solid #ddd" }}
      />
      <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
        {colors.map((color) => (
          <button
            key={color.name}
            type="button"
            onClick={() => onSelectColor(color)}
            title={color.name}
            aria-label={color.name}
            aria-pressed={selectedColor.name === color.name}
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: color.hex,
              border: selectedColor.name === color.name ? "2px solid #111" : "1px solid #ccc",
              cursor: "pointer",
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
