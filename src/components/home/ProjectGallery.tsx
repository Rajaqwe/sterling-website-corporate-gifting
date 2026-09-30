import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, MapPin, PackageCheck } from "lucide-react";
import { prisma } from "@/lib/prisma/client";
import { Reveal, StaggerContainer } from "@/components/ui/reveal";

async function getPublishedProjects(limit: number) {
  try {
    return await prisma.projectGalleryItem.findMany({
      where: { isPublished: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      take: limit,
    });
  } catch {
    return [];
  }
}

export async function ProjectGallery({ limit = 6, showHeading = true }: { limit?: number; showHeading?: boolean }) {
  const projects = await getPublishedProjects(limit);
  if (projects.length === 0) return null;

  return (
    <section className="border-y border-border/60 bg-secondary/15 py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {showHeading && (
          <Reveal animationType="fade-up">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-accent">
                <Camera className="h-3.5 w-3.5" /> Sterling in action
              </span>
              <h2 className="mt-4 font-serif text-3xl font-bold tracking-[-0.035em] text-primary sm:text-4xl">
                Real projects. Real production. Real delivery.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                A look at published Sterling work shared by the team. Details are shown only when approved for publication.
              </p>
            </div>
          </Reveal>
        )}

        <StaggerContainer staggerDelay={60} className="mx-auto mt-10 grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Reveal key={project.id}>
              <article className="group overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl dark:bg-card/60">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <Image
                    src={project.imageUrl}
                    alt={project.altText || project.title}
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  {project.projectType && (
                    <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-black/55 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                      {project.projectType}
                    </span>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold tracking-tight text-foreground">{project.title}</h3>
                  {project.description && (
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                  )}

                  {(project.clientName || project.quantityLabel || project.deliveryLabel) && (
                    <div className="mt-5 flex flex-wrap gap-2 border-t border-border/50 pt-4">
                      {project.clientName && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-foreground">
                          {project.clientName}
                        </span>
                      )}
                      {project.quantityLabel && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-foreground">
                          <PackageCheck className="h-3.5 w-3.5 text-accent" />
                          {project.quantityLabel}
                        </span>
                      )}
                      {project.deliveryLabel && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-foreground">
                          <MapPin className="h-3.5 w-3.5 text-accent" />
                          {project.deliveryLabel}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </StaggerContainer>

        <div className="mt-9 text-center">
          <Link href="/project-gallery" className="inline-flex items-center text-sm font-bold text-primary transition-colors hover:text-accent">
            View the project gallery
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
