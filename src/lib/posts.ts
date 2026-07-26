export type Evidence = {
  label: string;
  href: string;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  imageKey: string;
  cardImageKey: string;
  context: string;
  problem: string;
  actions: string;
  evidence: Evidence[];
  learnings: string[];
  feedback: string;
};

export const posts: Post[] = [
  {
    slug: "cache-traicion-latencia",
    title: "Cuando el caché nos traicionó: un post-mortem de latencia",
    excerpt:
      "Un deploy aparentemente inocuo disparó los percentiles de respuesta. Reconstruimos qué falló, cómo lo medimos y por qué el feedback directo del equipo fue clave.",
    category: "Rendimiento",
    date: "12 de Mayo, 2024",
    readTime: "8 min",
    imageKey: "hero",
    context:
      "Somos una app web en React que consume datos en tiempo real para dashboards de operaciones. Hace tres semanas migramos parte del estado global a una capa de caché compartida con Redis, buscando reducir la carga en la base de datos y mejorar la experiencia de filtrado.",
    problem:
      "Tras el deploy, los percentiles p95 y p99 se duplicaron. Los usuarios reportaban que los filtros tardaban varios segundos en responder. El monitor mostraba latencia estable en el backend, pero el frontend parecía congelarse. La sospecha inicial apuntaba a una regresión en la query de la base de datos.",
    actions:
      "Revisamos la arquitectura y descubrimos que el TTL por defecto de Redis generaba hits parciales: algunas claves expiraban en medio de una sesión de usuario. Implementamos invalidación explícita por evento, agregamos métricas de hit-rate por clave y un circuit breaker para caer a la base de datos si el caché fallaba. También añadimos alertas por hit-rate anómalo.",
    evidence: [
      {
        label: "PR #34 — Invalidación explícita del caché",
        href: "https://github.com/example/repo/pull/34",
      },
      {
        label: "Commit abc123 — Métricas de hit-rate",
        href: "https://github.com/example/repo/commit/abc123",
      },
    ],
    learnings: [
      "No confíes en los TTL por defecto sin entender el ciclo de vida de los datos.",
      "Instrumenta antes de optimizar; sin métricas por clave estábamos ciegos.",
      "Un fallback saludable vale tanto como el caché mismo.",
    ],
    feedback:
      "La crítica directa del equipo de backend —«esto huele a caché, no a query»— nos ahorró horas de búsqueda. El feedback radicalmente sincero, lejos de ser incómodo, se convirtió en nuestra brújula. Decidir escuchar sin defensas nos llevó a una solución más simple y robusta.",
  },
  {
    slug: "migracion-typescript",
    title: "La migración que casi rompe producción",
    excerpt:
      "Migrar un backend de Node.js a TypeScript sonó seguro hasta que los tipos se encontraron con el runtime. Aquí está el post-mortem de lo que aprendimos.",
    category: "TypeScript",
    date: "15 Abr, 2024",
    readTime: "12 min",
    imageKey: "concrete",
    context:
      "Llevábamos meses migrando un backend de Node.js puro a TypeScript. El objetivo era reducir errores de tipado, mejorar la autocompletación y preparar el terreno para un dominio más complejo. El proceso parecía controlado: los tests pasaban, el build compilaba y el despliegue en staging fue tranquilo.",
    problem:
      "En producción, una ruta de pagos empezó a devolver respuestas vacías. El servicio no se caía, pero los clientes recibían objetos incompletos. La causa raíz no estaba en la lógica de negocio, sino en un `as` que ocultaba un campo opcional que en runtime llegaba como `undefined`. TypeScript nos había dado una falsa sensación de seguridad.",
    actions:
      "Reemplazamos los type assertions por validación en runtime usando Zod en los límites del sistema. Auditamos todos los `as` y `any` del proyecto. Introdujimos contratos de API explícitos y tests de integración que ejecutan el build real, no solo el transpilado. También documentamos una guía de patrones prohibidos.",
    evidence: [
      {
        label: "PR #21 — Validación de contratos con Zod",
        href: "https://github.com/example/repo/pull/21",
      },
      {
        label: "PR #23 — Guía de patrones prohibidos",
        href: "https://github.com/example/repo/pull/23",
      },
    ],
    learnings: [
      "TypeScript no reemplaza la validación de runtime; los límites del sistema siempre deben verificar datos externos.",
      "Un `as` apresurado es deuda técnica camuflada.",
      "Los tests de integración con el build real detectan errores que el typecheck no ve.",
    ],
    feedback:
      "Durante la retrospectiva, un compañero señaló sin filtros que habíamos confundido «tener tipos» con «tener seguridad». Fue incómodo, pero nos obligó a repensar dónde poner validaciones. Ese comentario cambió nuestra política de code review para siempre.",
  },
  {
    slug: "query-dormida",
    title: "Una query que dormía despierta",
    excerpt:
      "Un dashboard de analytics que cargaba en 200 ms de repente tardaba 12 segundos. La culpa no era el volumen de datos, sino un índice olvidado.",
    category: "Base de datos",
    date: "28 Mar, 2024",
    readTime: "5 min",
    imageKey: "camera",
    context:
      "El dashboard de analytics es una de las funcionalidades más usadas por los equipos de operaciones. Muestra métricas agregadas por fecha, usuario y tipo de evento. Históricamente había respondido en menos de 200 ms, incluso con millones de filas.",
    problem:
      "De un día para otro, una consulta de resumen empezó a tardar entre 8 y 12 segundos. No habíamos desplegado cambios recientes en el dashboard. El volumen de datos había crecido, pero no de forma anómala. El plan de ejecución mostraba un full table scan en una tabla de eventos recién particionada.",
    actions:
      "Revisamos el script de particionado y descubrimos que el índice compuesto no se había recreado en la nueva partición. Reconstruimos el índice, actualizamos el playbook de migraciones para incluir una verificación de índices y añadimos un job que compara el esquema esperado contra el real después de cada migración.",
    evidence: [
      {
        label: "PR #18 — Reconstrucción de índices tras particionado",
        href: "https://github.com/example/repo/pull/18",
      },
      {
        label: "Commit def456 — Verificación de esquema post-migración",
        href: "https://github.com/example/repo/commit/def456",
      },
    ],
    learnings: [
      "Una migración que funciona no garantiza un esquema óptimo; hay que verificar los índices.",
      "Las métricas de latencia por endpoint detectan regresiones antes que las quejas de usuarios.",
      "Documenta el playbook de migraciones como si lo fuera a ejecutar alguien nuevo.",
    ],
    feedback:
      "La revisión del PR de particionado fue aprobada sin cuestionar los índices. En la retrospectiva, el feedback sincero nos hizo ver que habíamos normalizado la prisa. Ahora cada migración de datos tiene un checklist obligatorio y un par de ojos críticos.",
  },
];

export function getAllPosts(): Post[] {
  return posts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}
