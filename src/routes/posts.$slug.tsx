import { createFileRoute, notFound, Link } from "@tanstack/react-router";

import { getPostBySlug } from "@/lib/posts";
import heroImg from "@/assets/hero.jpg";
import paperImg from "@/assets/paper.jpg";
import concreteImg from "@/assets/concrete.jpg";
import cameraImg from "@/assets/camera.jpg";

const imageMap: Record<string, string> = {
  hero: heroImg,
  paper: paperImg,
  concrete: concreteImg,
  camera: cameraImg,
};

export const Route = createFileRoute("/posts/$slug")({
  loader: async ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => {
    const title = loaderData?.title ?? "Artículo";
    const excerpt = loaderData?.excerpt ?? "";
    return {
      meta: [
        { title: `${title} — Crónica` },
        { name: "description", content: excerpt },
        { property: "og:title", content: title },
        { property: "og:description", content: excerpt },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: PostDetail,
  notFoundComponent: PostNotFound,
});

function PostDetail() {
  const post = Route.useLoaderData();
  const image = imageMap[post.imageKey];

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 lg:py-24">
      <article className="max-w-[65ch] mx-auto">
        <header className="mb-16 animate-reveal">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="text-[10px] font-mono uppercase tracking-widest bg-foreground text-background px-2 py-1">
              {post.category}
            </span>
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
              {post.date}
            </span>
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
              {post.readTime}
            </span>
          </div>
          <h1 className="font-display text-4xl lg:text-6xl leading-[1.05] tracking-tight mb-8 text-balance">
            {post.title}
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground max-w-[50ch] text-pretty">
            {post.excerpt}
          </p>
        </header>

        <div className="mb-16 animate-clip">
          <img
            src={image}
            alt={post.title}
            width={1200}
            height={800}
            className="w-full aspect-[16/10] object-cover bg-muted rounded-sm"
          />
        </div>

        <div className="space-y-16">
          <Section title="Contexto" body={post.context} delay={200} />
          <Section title="Problema" body={post.problem} delay={300} />
          <Section title="Acciones" body={post.actions} delay={400} />
          <EvidenceSection evidence={post.evidence} delay={500} />
          <LearningsSection learnings={post.learnings} delay={600} />
          <Section
            title="Reflexión sobre Feedback Radicalmente Sincero"
            body={post.feedback}
            delay={700}
          />
        </div>
      </article>

      <div
        className="mt-24 max-w-[65ch] mx-auto border-t border-border pt-8 animate-reveal"
        style={{ animationDelay: "800ms" }}
      >
        <Link
          to="/"
          className="font-mono text-xs uppercase tracking-widest hover:text-accent transition-colors"
        >
          ← Volver al archivo
        </Link>
      </div>
    </main>
  );
}

function Section({
  title,
  body,
  delay,
}: {
  title: string;
  body: string;
  delay: number;
}) {
  return (
    <section
      className="animate-reveal"
      style={{ animationDelay: `${delay}ms` }}
    >
      <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-4">
        {title}
      </h2>
      <p className="text-lg leading-relaxed text-foreground/90 text-pretty">
        {body}
      </p>
    </section>
  );
}

function EvidenceSection({
  evidence,
  delay,
}: {
  evidence: { label: string; href: string }[];
  delay: number;
}) {
  return (
    <section
      className="animate-reveal"
      style={{ animationDelay: `${delay}ms` }}
    >
      <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-4">
        Evidencia de Control de Versiones
      </h2>
      <ul className="space-y-2">
        {evidence.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="text-lg text-foreground/90 underline decoration-accent/30 underline-offset-4 hover:text-accent transition-colors"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function LearningsSection({
  learnings,
  delay,
}: {
  learnings: string[];
  delay: number;
}) {
  return (
    <section
      className="animate-reveal"
      style={{ animationDelay: `${delay}ms` }}
    >
      <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-4">
        Aprendizajes
      </h2>
      <ol className="list-decimal list-inside space-y-3">
        {learnings.map((item, index) => (
          <li
            key={index}
            className="text-lg leading-relaxed text-foreground/90 text-pretty"
          >
            {item}
          </li>
        ))}
      </ol>
    </section>
  );
}

function PostNotFound() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24 text-center">
      <h1 className="font-display text-4xl mb-4">Artículo no encontrado</h1>
      <p className="text-muted-foreground mb-8">
        El post que buscas no existe o fue movido.
      </p>
      <Link
        to="/"
        className="font-mono text-xs uppercase tracking-widest hover:text-accent transition-colors"
      >
        Volver al archivo
      </Link>
    </div>
  );
}
