import { useEffect } from 'react';
import Topbar from '../components/Topbar';
import Hero from '../components/Hero';
import TrustStrip from '../components/TrustStrip';
import ItemsSection from '../components/ItemsSection';
import StepsSection from '../components/StepsSection';
import AfterPhoto from '../components/AfterPhoto';
import ExecutorBenefits from '../components/ExecutorBenefits';
import ReviewsSection from '../components/ReviewsSection';
import FAQSection from '../components/FAQSection';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';
import MobileBottomBar from '../components/MobileBottomBar';
import { MEDIA, FALLBACK } from './media';

const CLEANOUT_SERVICE_LINKS = [
  { label: 'Estate cleanouts', href: '#top' },
  { label: 'Hoarder cleanouts', href: '#top' },
  { label: 'Foreclosures', href: '#top' },
  { label: 'Same-day removal', href: '/same-day' },
];

export default function CleanoutPage() {
  useEffect(() => {
    document.title = 'Junk Cleanout Service · JEDI Junk Removal';
  }, []);

  return (
    <>
      <Topbar />
      <Hero />
      <TrustStrip />
      <ItemsSection />
      <StepsSection />
      <AfterPhoto src={MEDIA.cleanout.photo} fallback={FALLBACK.after} />
      <ExecutorBenefits />
      <ReviewsSection />
      <FAQSection />
      <FinalCTA />
      <Footer serviceLinks={CLEANOUT_SERVICE_LINKS} />
      <div className="mobile-spacer" aria-hidden="true" />
      <MobileBottomBar />
    </>
  );
}
