function Container({ className, children }) {
  const compClass = `container px-3` + (className ? ` ${className}` : ``);

  return <div className={compClass}>{children}</div>;
}

export default Container;
