/* Cleanout LP — main app v2 */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "headlinePreset": "default",
  "accentTheme": "green-yellow",
  "mascotMode": "reserved",
  "showTrustStrip": true,
  "showAfterPhoto": true,
  "showReviews": true,
  "showFAQ": true,
  "stickyMobileBar": true
}/*EDITMODE-END*/;

const HEADLINE_PRESETS = {
  'default':    ['FULL CLEANOUTS.', 'ONE DAY.'],
  'empty':      ['WE EMPTY', 'THE WHOLE PROPERTY.'],
  'ready':      ['BROOM-CLEAN.', 'READY TO LIST.'],
  'respectful': ['CLEANOUTS DONE', 'WITH CARE.'],
};

const ACCENT_THEMES = {
  'green-yellow':  { green: '#1FBD1F', greenDeep: '#149814', yellow: '#FFC319' },
  'electric':      { green: '#00E060', greenDeep: '#00A848', yellow: '#FFD60A' },
  'forest':        { green: '#2E8B2E', greenDeep: '#1E6B1E', yellow: '#EAB308' },
  'lime':          { green: '#84CC16', greenDeep: '#5F970F', yellow: '#FACC15' },
};

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

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
      <ItemsSection />
      <StepsSection />
      {tweaks.showAfterPhoto && <AfterPhoto />}
      <ExecutorBenefits />
      {tweaks.showReviews && <ReviewsSection />}
      {tweaks.showFAQ && <FAQSection />}
      <FinalCTA />
      <Footer />
      <div className="mobile-spacer" aria-hidden="true"></div>
      {tweaks.stickyMobileBar && <MobileBottomBar />}

      <TweaksPanel title="Cleanout LP tweaks">
        <TweakSection label="Hero headline">
          <TweakSelect
            label="Preset"
            value={tweaks.headlinePreset}
            onChange={(v) => setTweak('headlinePreset', v)}
            options={[
              { value: 'default', label: 'Full cleanouts. One day.' },
              { value: 'empty', label: 'We empty the whole property.' },
              { value: 'ready', label: 'Broom-clean. Ready to list.' },
              { value: 'respectful', label: 'Cleanouts done with care.' },
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
          <TweakToggle label="Trust strip" value={tweaks.showTrustStrip} onChange={(v) => setTweak('showTrustStrip', v)} />
          <TweakToggle label="After-cleanout photo" value={tweaks.showAfterPhoto} onChange={(v) => setTweak('showAfterPhoto', v)} />
          <TweakToggle label="Reviews" value={tweaks.showReviews} onChange={(v) => setTweak('showReviews', v)} />
          <TweakToggle label="FAQ" value={tweaks.showFAQ} onChange={(v) => setTweak('showFAQ', v)} />
          <TweakToggle label="Sticky mobile bar" value={tweaks.stickyMobileBar} onChange={(v) => setTweak('stickyMobileBar', v)} />
        </TweakSection>
      </TweaksPanel>
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
