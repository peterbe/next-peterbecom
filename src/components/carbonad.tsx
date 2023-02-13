export function CarbonAd() {
  // if (process.env.NODE_ENV === "development") {
  //   return null;
  // }

  return (
    // The outer wrapper is to be able to set a min-height so
    // as to avoid a CLS when the ad loads in.
    <div className="carbonads_outer">
      {/* The script tag is loaded in _app.tsx */}
    </div>
  );
}
