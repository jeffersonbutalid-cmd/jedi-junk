import SmartImg from './SmartImg';

const afterImg = '/assets/garage-after.png';

export default function AfterPhoto({
  src = afterImg,
  fallback = afterImg,
  alt = 'An empty, swept property after a JEDI Junk Removal cleanout',
  eyebrow = '★ THIS IS HOW WE LEAVE IT',
  headline = (
    <>
      EMPTY.<br />
      <span className="yellow">SWEPT. READY.</span>
    </>
  ),
  sub = 'When we hand the keys back, the property is ready for the realtor, the next tenant, or the next chapter. No piles. No debris. Nothing left behind.',
}) {
  return (
    <section className="afterphoto">
      <SmartImg src={src} fallback={fallback} alt={alt} className="ap-img" />
      <div className="ap-scrim" />
      <div className="ap-content">
        <div className="ap-eyebrow">{eyebrow}</div>
        <h2 className="ap-headline">{headline}</h2>
        <p className="ap-sub">{sub}</p>
      </div>
    </section>
  );
}
