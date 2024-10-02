function Section({ children, className, ...rest }) {
  const compClass = `relative ${className}`;

  return (
    <section
      className={compClass}
      {...rest}
      style={{ scrollMarginTop: "var(--topbar-height, 69px)" }}
    >
      {children}
    </section>
  );
}

export default Section;
