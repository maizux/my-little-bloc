import { createFileRoute, Link } from "@tanstack/react-router";

import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Crónica — Post-mortems técnicos" },
      {
        name: "description",
        content:
          "Un blog editorial sobre errores, aprendizajes y feedback radicalmente sincero en equipos de software.",
      },
      {
        property: "og:title",
        content: "Crónica — Post-mortems técnicos",
      },
      {
        property: "og:description",
        content:
          "Un blog editorial sobre errores, aprendizajes y feedback radicalmente sincero en equipos de software.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  const posts = getAllPosts();
  const featured = posts[0];

  return (
    <main className="max-w-7xl mx-auto px-6">
      {/* Hero editorial */}
      <section className="pt-12 pb-24 grid grid-cols-12 gap-8 items-end">
        <div className="col-span-12 lg:col-span-7">
          <div className="animate-clip">
            <Link to="/posts/$slug" params={{ slug: featured.slug }}>
              <img
                src={imageMap[featured.imageKey]}
                alt={featured.title}
                width={1200}
                height={800}
                className="w-full aspect-[4/3] lg:aspect-[16/10] object-cover bg-muted rounded-sm"
              />
            </Link>
          </div>
        </div>
        <div
          className="col-span-12 lg:col-span-5 lg:pl-12 pb-4 animate-reveal"
          style={{ animationDelay: "200ms" }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[10px] font-mono uppercase tracking-widest bg-foreground text-background px-2 py-1">
              Destacado
            </span>
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
              {featured.date}
            </span>
          </div>
          <h1 className="font-display text-5xl lg:text-7xl leading-[1.05] tracking-tight mb-8 text-balance">
            {featured.title}
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground max-w-[45ch] mb-8 text-pretty">
            {featured.excerpt}
          </p>
          <Link
            to="/posts/$slug"
            params={{ slug: featured.slug }}
            className="border-b-2 border-foreground pb-1 text-sm font-mono uppercase tracking-widest hover:border-accent hover:text-accent transition-all"
          >
            Leer artículo
          </Link>
        </div>
      </section>

      {/* Article grid */}
      <section className="py-24 border-t border-border">
        <div className="flex justify-between items-baseline mb-16">
          <h2 className="font-display text-3xl">Entradas recientes</h2>
          <span className="font-mono text-[10px] text-muted-foreground uppercase">
            Volumen 01 / Edición 01
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {posts.map((post, index) => (
            <PostCard
              key={post.slug}
              post={post}
              image={imageMap[post.imageKey]}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-32 border-t border-border flex flex-col items-center text-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] mb-8 text-accent animate-reveal">
          Suscripción
        </span>
        <h2
          className="font-display text-4xl lg:text-5xl max-w-2xl mb-12 leading-tight animate-reveal"
          style={{ animationDelay: "100ms" }}
        >
          Recibe post-mortems semanales en tu bandeja.
        </h2>
        <form
          className="w-full max-w-md flex flex-col gap-4 animate-reveal"
          style={{ animationDelay: "200ms" }}
        >
          <input
            type="email"
            placeholder="tu@correo.com"
            className="bg-transparent border-b border-foreground/20 py-4 text-center text-lg focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/40"
          />
          <button
            type="button"
            className="mt-4 font-mono text-xs uppercase tracking-widest hover:text-accent transition-colors"
          >
            Unirse a la lista
          </button>
        </form>
      </section>
    </main>
  );
}
