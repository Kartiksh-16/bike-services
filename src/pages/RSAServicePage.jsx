import BackLink from "@/components/Backlink";
import CoverageList from "@/components/CoverageList";
import ResponseTime from "@/components/ResponseTime";
import CTAButtons from "@/components/CTAButtons";

export default function RSAServicePage() {
  return (
    <div className="bg-dark min-h-screen text-cream font-sans px-8 pt-22 pb-14">
      <div className="max-w-4xl mx-auto">
        <BackLink />

        {/* Header */}
        <h1 className="text-4xl font-bold mb-2">RSA Services</h1>
        <h2 className="text-xl text-steel font-semibold mb-2">
          24/7 Roadside Assistance
        </h2>
        <p className="text-silver mb-8">
          Stuck on road? We come to you — anywhere, anytime. 
          Towing, on-site repair & emergency support.
        </p>

        {/* Side-by-side sections */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <CoverageList />
          <ResponseTime />
        </div>

        <CTAButtons />
      </div>
    </div>
  );
}