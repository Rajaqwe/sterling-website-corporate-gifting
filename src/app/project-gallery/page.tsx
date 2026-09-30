import type { Metadata } from "next";
import { ProjectGallery } from "@/components/home/ProjectGallery";

export const metadata: Metadata = {
  title: "Project Gallery | Sterling Corporate Gifting",
  description: "Published project and delivery work from Sterling Corporate Gifting.",
};

export default function ProjectGalleryPage() {
  return (
    <main className="min-h-screen bg-background pt-16">
      <ProjectGallery limit={24} />
    </main>
  );
}
