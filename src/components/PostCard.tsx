import { Link } from "@tanstack/react-router";
import type { Post } from "@/lib/posts";

interface PostCardProps {
  post: Post;
  image: string;
  index: number;
}

export function PostCard({ post, image, index }: PostCardProps) {
  return (
    <article
      className={`group animate-reveal ${index === 1 ? "lg:mt-12" : ""}`}
      style={{ animationDelay: `${(index + 2) * 100}ms` }}
    >
      <Link
        to="/posts/$slug"
        params={{ slug: post.slug }}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <div className="overflow-hidden mb-6">
          <img
            src={image}
            alt={post.title}
            width={800}
            height={1000}
            loading="lazy"
            decoding="async"
            className="w-full aspect-[3/4] object-cover bg-muted transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="flex justify-between items-center mb-3">
          <span className="font-mono text-[10px] uppercase text-accent tracking-tighter">
            {post.category} • {post.readTime}
          </span>
          <span className="font-mono text-[10px] text-muted-foreground">
            {post.date}
          </span>
        </div>
        <h3 className="font-display text-2xl leading-tight mb-3 group-hover:underline decoration-accent/30 underline-offset-4">
          {post.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>
      </Link>
    </article>
  );
}
