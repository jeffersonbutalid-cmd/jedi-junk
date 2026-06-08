import { PHONE_HREF } from './constants';

export default function MobileBottomBar({
  quoteLabel = 'GET QUOTE',
  smallText = '★ FREE WALK-THROUGH',
  callLabel = 'CALL',
  href = '#quote',
}) {
  return (
    <div className="mob-bar">
      <a href={href} className="mob-bar-quote">
        <span className="small">{smallText}</span>
        {quoteLabel}
      </a>
      <a href={PHONE_HREF} className="mob-bar-cta">📞 {callLabel}</a>
    </div>
  );
}
