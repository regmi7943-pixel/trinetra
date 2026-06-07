import { Metadata } from "next";
import AppointmentClient from "./AppointmentClient";

export const metadata: Metadata = {
  title: "Book Appointment | Trinetra Eye Care Center",
  description: "Schedule your eye checkup or consultation at Trinetra Eye Care Center in Pokhara.",
};

export default function AppointmentPage() {
  return <AppointmentClient />;
}
