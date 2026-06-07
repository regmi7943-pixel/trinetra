import { Metadata } from "next";
import ServiceDetailClient from "./ServiceDetailClient";

const serviceData: Record<string, { title: string; subtitle: string }> = {
  "eye-examination": {
    title: "Eye Examination",
    subtitle: "Thorough vision and eye health assessment by our expert optometrists",
  },
  "computerized-eye-checkup": {
    title: "Computerized Eye Power Check-Up",
    subtitle: "Precision digital refraction for accurate lens prescriptions",
  },
  "prescription-glasses": {
    title: "Prescription Glasses",
    subtitle: "Designer frames and precision lenses tailored to your style and vision",
  },
  "eye-condition-consultation": {
    title: "Eye Condition Consultation",
    subtitle: "Expert evaluation and treatment plans for various eye conditions",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const p = await params;
  const service = serviceData[p.service];
  
  if (!service) {
    return {
      title: "Service Not Found | Trinetra Eye Care Center",
    };
  }

  return {
    title: `${service.title} | Trinetra Eye Care Center`,
    description: service.subtitle,
  };
}

export default function ServiceDetailPage() {
  return <ServiceDetailClient />;
}
