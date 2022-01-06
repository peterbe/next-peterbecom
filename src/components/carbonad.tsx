export function CarbonAd() {
  // if (process.env.NODE_ENV === "development") {
  //   return null;
  // }

  return (
    // The outer wrapper is to be able to set a min-height so
    // as to avoid a CLS when the ad loads in.
    <div className="carbonads_outer">
      <script
        async
        src="https://cdn.carbonads.com/carbon.js?serve=CKYI52Q7&amp;placement=peterbecom"
        id="_carbonads_js"
      ></script>
    </div>
  );
}
