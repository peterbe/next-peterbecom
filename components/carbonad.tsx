export function CarbonAd() {
  if (process.env.NEXT_PUBLIC_NO_ADS) {
    return null;
  }

  return (
    <script
      async
      src="https://cdn.carbonads.com/carbon.js?serve=CKYI52Q7&amp;placement=peterbecom"
      id="_carbonads_js"
    ></script>
  );
}
