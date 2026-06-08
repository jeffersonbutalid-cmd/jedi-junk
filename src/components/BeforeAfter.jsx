import { useState, useRef } from 'react';

export default function BeforeAfter({ beforeSrc, afterSrc, beforeAlt, afterAlt, beforeFallback, afterFallback, initialPos = 50 }) {
  const [pos, setPos] = useState(initialPos);
  const wrapRef = useRef(null);
  const draggingRef = useRef(false);

  const onImgError = (fallback) => (e) => {
    if (fallback && e.currentTarget.src !== window.location.origin + fallback && !e.currentTarget.dataset.fellBack) {
      e.currentTarget.dataset.fellBack = '1';
      e.currentTarget.src = fallback;
    }
  };

  const setFromClientX = (clientX) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPos(pct);
  };

  const onPointerDown = (e) => {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e) => {
    if (!draggingRef.current) return;
    setFromClientX(e.clientX);
  };
  const onPointerUp = (e) => {
    draggingRef.current = false;
    try { e.currentTarget.releasePointerCapture?.(e.pointerId); } catch {}
  };
  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') setPos(p => Math.max(0, p - 4));
    if (e.key === 'ArrowRight') setPos(p => Math.min(100, p + 4));
  };

  return (
    <div
      ref={wrapRef}
      style={{ position: 'absolute', inset: 0 }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <img src={afterSrc} alt={afterAlt} className="ba-img" draggable={false} onError={onImgError(afterFallback)} />
      <div className="ba-after-wrap" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={beforeSrc} alt={beforeAlt} className="ba-img" draggable={false} onError={onImgError(beforeFallback)} />
      </div>
      <span className="ba-label before">BEFORE</span>
      <span className="ba-label after">AFTER</span>
      <div
        className="ba-handle"
        style={{ left: `${pos}%` }}
        role="slider"
        tabIndex={0}
        aria-label="Drag to compare before and after"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onKeyDown={onKeyDown}
      >
        <div className="ba-knob" aria-hidden="true">‹›</div>
      </div>
    </div>
  );
}
