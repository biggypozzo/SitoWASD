import { ArrowLeft, ArrowUpRight, Sun, Moon } from "lucide-react";
import { Link, useLocation, useRoute } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";
import { products } from "./Home";
import SocialLinks from "@/components/SocialLinks";

export default function ProductPage() {
  const [, params] = useRoute("/product/:id");
  const [, navigate] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const product = products.find((item) => item.id === params?.id);
  if (!product) return <div className="simple-page"><Link href="/">Product not found — return home</Link></div>;
  return <main className="product-page internal-page-entrance" style={{ "--product-accent": product.accent, "--product-ink": product.ink } as React.CSSProperties}>
    <header className="detail-header"><Link href="/" className="wordmark" aria-label="Back to WASD home"><img src="/assets/wasd-crown-logo.png" alt="WASD" /></Link><div className="detail-actions"><SocialLinks /><button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle light and dark mode">{theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}</button></div></header>
    <div className="detail-back"><button onClick={() => navigate("/showcase")}><ArrowLeft size={15} /> Back to collection</button><span>{product.collection === "SYZEX" ? "WASD × SYZEX" : "WASD EDITIONS"}</span></div>
    <section className="detail-hero"><div className="detail-copy"><p className="eyebrow"><span /> PRODUCT / {product.collection === "SYZEX" ? "SYZEX" : "ORIGINAL"}</p><h1>{product.name}</h1>{product.price && <div className="detail-price">{product.was && <del>{product.was}</del>}<strong>{product.price}</strong></div>}<p className="detail-lead">A surface designed for the space between instinct and intent. Explore the edition, then choose how you want to move.</p><Link className="detail-add" href={`/purchase/${product.id}`}>Purchase this edition <ArrowUpRight size={17} /></Link><small className="detail-note">Direct payment handoff through PayPal and Discord.</small></div><div className="detail-visual"><div className="detail-grid" /><img src={product.image} alt={product.name} /></div></section>
    <section className="detail-specs"><div><span>01 / FORMAT</span><strong>490 × 420 <small>MM</small></strong><p>Professional esports format, built for full-range movement.</p></div><div><span>02 / THICKNESS</span><strong>4 <small>MM</small></strong><p>Enhanced comfort and optimal shock absorption.</p></div><div><span>03 / SYSTEM</span><strong>PORON®</strong><p>Original foam base for zero desk movement and total grip.</p></div><div><span>04 / SURFACE</span><strong>TYPE ZERO</strong><p>Micro-woven surface for balanced friction and consistent glide.</p></div></section>
    <section className="detail-footer"><p className="eyebrow"><span /> KEEP EXPLORING</p><Link href="/showcase" className="detail-next">Back to the full collection <ArrowUpRight size={18} /></Link></section>
  </main>;
}
