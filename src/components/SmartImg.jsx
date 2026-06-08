export default function SmartImg({ src, fallback, ...props }) {
  const onError = (e) => {
    if (fallback && !e.currentTarget.dataset.fellBack) {
      e.currentTarget.dataset.fellBack = '1';
      e.currentTarget.src = fallback;
    }
  };
  return <img src={src} onError={onError} {...props} />;
}
