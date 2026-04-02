import { Link } from "react-router-dom";

export default function BackLink() {
  return (
    <div className="mb-6">
      <Link
        to="/services"
        className="text-silver text-sm hover:text-cream transition-colors"
      >
        ← Back to Services
      </Link>
    </div>
  );
}
