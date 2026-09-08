export default function Section({ title, children }) {
  return (
    <section className="container" style={{ padding: "2.5rem 1.25rem" }}>
      {title && <h2 style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", marginBottom: "1.25rem" }}>{title}</h2>}
      {children}
    </section>
  );
}
