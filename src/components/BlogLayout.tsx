import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/20 font-sans antialiased">
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link
            to="/"
            className="font-display italic text-2xl tracking-tight hover:text-accent transition-colors"
          >
            Crónica.
          </Link>
          <div className="flex gap-10 text-xs font-mono uppercase tracking-widest">
            <Link to="/" className="hover:text-accent transition-colors">
              Archivo
            </Link>
            <Link to="/" className="hover:text-accent transition-colors">
              Ensayos
            </Link>
            <Link to="/about" className="hover:text-accent transition-colors">
              Acerca de
            </Link>
          </div>
        </div>
      </nav>

      {children}

      <footer className="bg-foreground text-background py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 lg:col-span-6">
            <span className="font-display italic text-3xl block mb-4">
              Crónica.
            </span>
            <p className="text-background/60 text-sm max-w-xs">
              Una publicación digital dedicada a la observación lenta y el
              diseño reflexivo.
            </p>
          </div>
          <div className="col-span-6 lg:col-span-3 font-mono text-[10px] uppercase tracking-widest flex flex-col gap-4">
            <a href="#" className="hover:text-accent transition-colors">
              Instagram
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              Twitter
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              RSS Feed
            </a>
          </div>
          <div className="col-span-6 lg:col-span-3 font-mono text-[10px] uppercase tracking-widest flex flex-col gap-4 text-right lg:text-left">
            <p className="text-background/40">© 2024</p>
            <p className="text-background/40">Hecho con Tinta y Aire</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
