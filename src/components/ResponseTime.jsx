import { Clock } from "lucide-react";

export default function ResponseTime() {
  return (
    <div className="bg-silver text-dark rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock size={22} className="text-steel" />
        <h2 className="text-xl font-bold">Response Time</h2>
      </div>

      {/* Two separate boxes */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-dark text-cream rounded-lg p-4 text-center">
          <p className="text-2xl font-bold">30 min</p>
          <p className="text-silver text-sm">Avg. arrival time</p>
        </div>
        <div className="bg-dark text-cream rounded-lg p-4 text-center">
          <p className="text-2xl font-bold">24/7</p>
          <p className="text-silver text-sm">Available all days</p>
        </div>
      </div>
    </div>
  );
}
