import { ArrowLeft, ArrowUpRight, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";
import { products, type Product } from "./Home";

function ShowcaseCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.article
      className="showcase-card"
      style={{ "--showcase-accent": product.accent, "--showcase-ink": product.ink } as React.CSSProperties}
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.72, delay: (index % 3) * 0.07, ease: [0.23, 1, 0.32, 1] }}
    >
      <Link
        className="showcase-image-link"
        href={`/product/${product.id}`}
        aria-label={`Apri le specifiche di ${product.name}`}
      >
        <div className="showcase-image">
          <div className="showcase-grid" />
          <span className="showcase-index">{String(index + 1).padStart(2, "0")}</span>
          <motion.img src={product.image} alt={product.name} loading={index < 3 ? "eager" : "lazy"} whileHover={{ scale: 1.055, rotate: 1 }} transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }} />
          <span className="showcase-open"><ArrowUpRight size={17} /> SPECIFICHE</span>
        </div>
      </Link>
      <div className="showcase-card-meta">
        <div>
          <span className="showcase-collection">{product.collection === "SYZEX" ? "WASD × SYZEX" : "WASD EDITION"}</span>
          <h2>{product.name}</h2>
        </div>
        {product.price && <strong>{product.price}</strong>}
      </div>
    </motion.article>
  );
}

export default function ShowcasePage() {
  const { theme, toggleTheme } = useTheme();
  const editions = products.filter((product) => product.collection === "Edition");
  const syzex = products.filter((product) => product.collection === "SYZEX");

  return (
    <main className="showcase-page internal-page-entrance">
      <header className="showcase-header">
        <Link href="/" className="wordmark" aria-label="Torna alla home WASD">
          <img src="/assets/wasd-crown-logo.png" alt="WASD" />
        </Link>
        <div className="showcase-actions">
          <Link className="showcase-back" href="/"><ArrowLeft size={15} /> HOME</Link>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle light and dark mode">
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </header>

      <section className="showcase-intro">
        <nav className="showcase-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span aria-current="page">Collection</span></nav>
        <p className="eyebrow"><span /> 06 — THE COLLECTION</p>
        <div className="showcase-title-row">
          <h1>CHOOSE<br /><em>YOUR</em><br />CONTROL.</h1>
          <p>Every WASD surface, gathered in one place. Select an image to open its full specifications.</p>
        </div>
      </section>

      <motion.section className="showcase-section" aria-labelledby="editions-heading" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 0.7 }}>
        <div className="showcase-section-heading"><span>01 / ORIGINALS</span><h2 id="editions-heading">WASD EDITIONS.</h2><span>{String(editions.length).padStart(2, "0")} ITEMS</span></div>
        <div className="showcase-grid-list">
          {editions.map((product, index) => <ShowcaseCard key={product.id} product={product} index={index} />)}
        </div>
      </motion.section>

      <motion.section className="showcase-section showcase-syzex" aria-labelledby="syzex-heading" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 0.7 }}>
        <div className="showcase-section-heading"><span>02 / COLLABORATIONS</span><h2 id="syzex-heading">WASD × SYZEX.</h2><span>{String(syzex.length).padStart(2, "0")} ITEMS</span></div>
        <div className="showcase-grid-list">
          {syzex.map((product, index) => <ShowcaseCard key={product.id} product={product} index={editions.length + index} />)}
        </div>
      </motion.section>

      <footer className="showcase-footer">
        <Link className="showcase-footer-link" href="/"><ArrowLeft size={17} /> BACK TO THE ART OF CONTROL</Link>
        <span>© 2026 WASD / BUILT FOR CONTROL.</span>
      </footer>
    </main>
  );
}

export { ShowcaseCard };
