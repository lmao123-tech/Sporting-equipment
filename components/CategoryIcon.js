// Small line-icon set for the header mega-menu's column headings
// (mirrors zajo.com/bg showing a little icon above each subcategory
// group). Plain name -> SVG lookup, drawn from simple shapes/straight
// lines rather than hand-traced illustrations, so it stays easy to add
// to. Add a case here whenever a new column needs an icon.
export default function CategoryIcon({ name, className }) {
  const common = {
    viewBox: "0 0 24 24",
    className,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  switch (name) {
    case "shirt":
      return (
        <svg {...common}>
          <path d="M8 4 16 4 16 7 19 9 17 12 16 11 16 20 8 20 8 11 7 12 5 9 8 7 Z" />
        </svg>
      );
    case "dress":
      return (
        <svg {...common}>
          <path d="M10 4 14 4 15 8 17 20 7 20 9 8 Z" />
        </svg>
      );
    case "dumbbell":
      return (
        <svg {...common}>
          <circle cx="5" cy="12" r="3" />
          <circle cx="19" cy="12" r="3" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      );
    case "band":
      return (
        <svg {...common}>
          <ellipse cx="12" cy="12" rx="8" ry="5" />
        </svg>
      );
    default:
      return null;
  }
}
