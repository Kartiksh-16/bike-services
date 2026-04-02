// import React from "react";
// import Button from "../components/Button";

// export default function AccidentalRepairss() {
//   return (
//     <div className="bg-dark  text-cream font-sans pt-24 pb-5">
//       <div className="max-w-3xl mx-auto">
//         <h1 className="text-4xl font-bold mb-4 ">Accidental Repair</h1>
//         <p className="text-silver mb-14">
//           Full dent, paint & frame restoration after accidents.
//         </p>

//         <div className="text-center">
//           <Button label="Book Accidental Repair" />
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function AccidentalRepairss() {
  return (
    <section className="bg-dark text-cream font-sans px-8 pt-24 pb-6">
      <div className="max-w-4xl mx-auto">
        {/* Back to Services link */}
        <div className="mb-6">
          <Link
            to="/services"
            className="text-silver text-sm hover:text-cream transition-colors"
          >
            ← Back to Services
          </Link>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-4">Accidental Repair</h1>

        {/* Description */}
        <p className="text-silver mb-8">
          Full dent, paint & frame restoration after accidents. We restore your
          bike to its original condition.
        </p>
      </div>
      <div className="text-center">
         <Button label="Book Accidental Repair" />
      </div>
    </section>
  );
}
