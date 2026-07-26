import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Acerca de — Crónica" },
      {
        name: "description",
        content:
          "Qué es Crónica y por qué documentamos post-mortems técnicos.",
      },
      { property: "og:title", content: "Acerca de — Crónica" },
      {
        property: "og:description",
        content:
          "Qué es Crónica y por qué documentamos post-mortems técnicos.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-24">
      <div className="max-w-[65ch] mx-auto animate-reveal">
        <h1 className="font-display text-5xl lg:text-7xl leading-tight mb-8 text-balance">
          Acerca de <i>Crónica.</i>
        </h1>
        <p className="text-lg leading-relaxed text-muted-foreground mb-6 text-pretty">
          Crónica es un blog de post-mortems técnicos. Cada artículo sigue una
          estructura clara: contexto, problema, acciones, evidencia de control de
          versiones, aprendizajes y una reflexión sobre el feedback
          radicalmente sincero que nos ayudó a mejorar.
        </p>
        <p className="text-lg leading-relaxed text-muted-foreground mb-6 text-pretty">
          Creemos que el error es información valiosa cuando se documenta con
          honestidad. Compartir lo que falló, cómo se resolvió y qué se
          aprendió es la forma más rápida de construir equipos resilientes.
        </p>
        <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
          Si quieres proponer un tema o compartir tu propio post-mortem,
          escríbenos.
        </p>
      </div>
    </main>
  );
}
