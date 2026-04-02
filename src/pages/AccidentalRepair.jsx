import React, { useState } from "react";
import WorkFlow from "../components/WorkFlow";
import FAQ from "../components/FAQ";
import Button from "../components/Button";
import AccidentalRepairss from "@/components/AccidentalRepairss";

// import BookingForm from "../components/BookingForm";

export default function AccidentalRepair() {
  return (
    <div className="w-full">
      <AccidentalRepairss />
      <WorkFlow />
      <FAQ />
      <div className=" z-50 flex justify-center bg-cream py-4">
        <Button
          label="Book Accidental Repair"
          className="shadow-lg animate-bounce"
        />
      </div>
    </div>
  );
}
