import BookingForm from './BookingForm';
import { PHONE, PHONE_HREF } from './constants';

const SMS_HREF = 'sms:+18664879059?&body=Hi%20JEDI%20%E2%80%94%20I%20need%20a%20cleanout%20quote.';

export default function FinalCTA() {
  return (
    <section className="finalcta section" id="quote">
      <div className="finalcta-inner">
        <h2>
          READY FOR THE PROPERTY<br />
          TO BE <span className="green">EMPTY?</span>
        </h2>
        <p className="sub">
          <span className="green">Same-week walk-throughs.</span> Flat upfront quote.
          Pay nothing until the property is empty.
        </p>
        <a href={PHONE_HREF} className="btn btn-primary callbtn">
          <span>📞</span><span>CALL {PHONE}</span>
        </a>
        <div className="finalcta-sms">
          <a href={SMS_HREF}>Or text us — we reply in 5 min</a>
        </div>
        <div className="or">OR BOOK A WALK-THROUGH ONLINE</div>

        <div className="booking-card" id="book">
          <div className="booking-head">
            <div className="booking-head-l">
              <h3>BOOK A WALK-THROUGH</h3>
              <p>Tell us a bit about the property. We'll confirm a window by text.</p>
            </div>
            <span className="booking-badge">★ FREE WALK-THROUGH</span>
          </div>
          <BookingForm defaultService="Full cleanout" />
        </div>
      </div>
    </section>
  );
}
