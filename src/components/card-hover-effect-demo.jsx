import { HoverEffect } from "@/components/ui/card-hover-effect";

export default function CardHoverEffectDemo({items = []}) {
  return (
    <div className="w-full bg-white">
      <div className="max-w-5xl mx-auto px-8">
        <HoverEffect items={items} />
      </div>
    </div>
  );
}
export const projects = [
  {
    title: "Oil Change",
    description:
      "Keep your engine running smooth with fresh engine & gear oil replacement.",
    link: "/services/oil-change",
  },
  {
    title: "Engine Repair",
    description:
      "Diagnostics, rebuild & overhaul",
    link: "",
  },
  {
    title: "Tire Service",
    description:
      "Rotation, balancing & replacement",
    link: "",
  },
  {
    title: "Spare Parts",
    description:
      "Advanced OBD & computer scanning",
    link: "",
  },
  {
    title: "Accidental Repair",
    description:
      "Dent removal, paint & panel repair.",
    link: "/services/accidental-repair",
  },
  {
    title: "RSA Services",
    description:
      "Recharge, leak detection & repair",
    link: "",
  },
];
