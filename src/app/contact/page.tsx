import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Sterling's corporate gifting team for bulk orders, custom branding, and enterprise gifting proposals.",
};

export default function ContactPage() {
  return <ContactForm />;
}
