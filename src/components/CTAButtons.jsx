export default function CTAButtons() {
  return (
    <div className="mt-10">
      {/* Separator line */}
      <hr className="border-silver mb-6" />

      {/* Full-width buttons */}
      <div className="grid grid-cols-2 gap-6">
        {/* Call Now button */}
        <a
          href="tel:+911234567890" // apna number yahan daalna
          className="w-full bg-steel text-cream px-6 py-3 rounded-lg text-center font-semibold hover:bg-steel/80 transition-colors"
        >
          Call Now
        </a>

        {/* WhatsApp button */}
        <a
          href="https://wa.me/911234567890" // apna WhatsApp number yahan daalna
          className="w-full bg-steel text-cream px-6 py-3 rounded-lg text-center font-semibold  hover:bg-steel/80 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
