/* Main app — composes the landing page + Tweaks panel */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "headlinePreset": "default",
  "accentTheme": "green-yellow",
  "showTrustStrip": true,
  "showTruckPhoto": true,
  "showReviews": true,
  "showFAQ": true,
  "ctaStyle": "phone-first",
  "stickyMobileBar": true
}/*EDITMODE-END*/;

const HEADLINE_PRESETS = {
  'default':   ['SAME-DAY', 'JUNK REMOVAL', "IT'S GONE TODAY."],
  'punchy':    ['POINT.', 'WE HAUL.', "DONE."],
  'urgent':    ['TODAY?', 'WE\u2019RE THERE.', "JUNK GONE."],
  'no-stress': ['NO HASSLE.', 'NO HIDDEN FEES.', "JUST GONE."],
};

const ACCENT_THEMES = {
  'green-yellow':  { green: '#1FBD1F', greenDeep: '#149814', yellow: '#FFC319' },
  'electric':      { green: '#00E060', greenDeep: '#00A848', yellow: '#FFD60A' },
  'forest':        { green: '#2E8B2E', greenDeep: '#1E6B1E', yellow: '#EAB308' },
  'lime':          { green: '#84CC16', greenDeep: '#5F970F', yellow: '#FACC15' },
};

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply accent theme to CSS vars
  React.useEffect(() => {
    const t = ACCENT_THEMES[tweaks.accentTheme] || ACCENT_THEMES['green-yellow'];
    const r = document.documentElement;
    r.style.setProperty('--jedi-green', t.green);
    r.style.setProperty('--jedi-green-deep', t.greenDeep);
    r.style.setProperty('--hauler-yellow', t.yellow);
  }, [tweaks.accentTheme]);

  const heroCopy = HEADLINE_PRESETS[tweaks.headlinePreset] || HEADLINE_PRESETS['default'];

  return (
    <React.Fragment>
      <Topbar />
      <Hero heroCopy={heroCopy} />
      {tweaks.showTrustStrip && <TrustStrip />}
      <StepsSection />
      <ItemsSection />
      {tweaks.showTruckPhoto && <TruckPhoto />}
      <CoverageBenefits />
      {tweaks.showReviews && <ReviewsSection />}
      {tweaks.showFAQ && <FAQSection />}
      <FinalCTA />
      <Footer />
      <div className="mobile-spacer" aria-hidden="true"></div>
      {tweaks.stickyMobileBar && <MobileBottomBar />}

      <TweaksPanel title="Landing page tweaks">
        <TweakSection label="Hero headline">
          <TweakSelect
            label="Preset"
            value={tweaks.headlinePreset}
            onChange={(v) => setTweak('headlinePreset', v)}
            options={[
              { value: 'default', label: 'Same-day / It\u2019s gone today.' },
              { value: 'punchy', label: 'Point. We haul. Done.' },
              { value: 'urgent', label: 'Today? We\u2019re there.' },
              { value: 'no-stress', label: 'No hassle. No fees.' },
            ]}
          />
        </TweakSection>

        <TweakSection label="Brand accent">
          <TweakRadio
            label="Green tone"
            value={tweaks.accentTheme}
            onChange={(v) => setTweak('accentTheme', v)}
            options={[
              { value: 'green-yellow', label: 'Jedi Green' },
              { value: 'electric', label: 'Electric' },
              { value: 'forest', label: 'Forest' },
              { value: 'lime', label: 'Lime' },
            ]}
          />
        </TweakSection>

        <TweakSection label="Sections">
          <TweakToggle
            label="Trust strip"
            value={tweaks.showTrustStrip}
            onChange={(v) => setTweak('showTrustStrip', v)}
          />
          <TweakToggle
            label="Truck photo block"
            value={tweaks.showTruckPhoto}
            onChange={(v) => setTweak('showTruckPhoto', v)}
          />
          <TweakToggle
            label="Reviews"
            value={tweaks.showReviews}
            onChange={(v) => setTweak('showReviews', v)}
          />
          <TweakToggle
            label="FAQ"
            value={tweaks.showFAQ}
            onChange={(v) => setTweak('showFAQ', v)}
          />
          <TweakToggle
            label="Sticky mobile bar"
            value={tweaks.stickyMobileBar}
            onChange={(v) => setTweak('stickyMobileBar', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
