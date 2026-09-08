export default function Section({ title, children }) {
  return (
    <section className="container" style={{ padding: "2rem 1rem" }}>
      {title && <h2>{title}</h2>}
      {children}
    </section>
  );
}
