import type { Metadata } from "next";
import { DemoExperience } from "@/components/demo/demo-experience";

export const metadata: Metadata = {
  title: "La démonstration en 3 minutes",
  description:
    "Explorez Campus Boost : un secteur, des compétences, un projet, une simulation et le parcours SOLTéA.",
};

export default function DemoPage() {
  return (
    <main id="main-content" className="demo-page">
      <DemoExperience />
    </main>
  );
}
