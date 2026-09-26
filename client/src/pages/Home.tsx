import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronDown,
  Menu,
  Moon,
  Plus,
  Sun,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type MouseEvent, type RefObject } from "react";
import { Link, useLocation } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";
import { openCookiePreferences } from "@/components/CookieConsent";
import SocialLinks from "@/components/SocialLinks";

type Collection = "Edition" | "SYZEX";

export type Product = {
  id: string;
  collection: Collection;
  name: string;
  price?: string;
  was?: string;
  status?: string;
  image: string;
  url: string;
  accent: string;
  ink: string;
};

const STORE = "https://wasd-shop.fourthwall.com/en-eur";
const TIKTOK = "https://www.tiktok.com/@wasdfilo";

export const products: Product[] = [
  {
    id: "devil-rose",
    collection: "Edition",
    name: "WASD Mousepad – Devil Rose Edition",
    price: "€60",
    was: "€70",
    status: "Sold out",
    image: "https://imgproxy.fourthwall.dev/kyo2Cp8xNDJCrOcQ2u7G6S1v0DaWm7eHGwrFoec7ms0/w:720/sm:1/enc/miadf7S1JfEjlCGk/_XVRWpT-9tMbcqnZ/uuqjxHGy7Dn8e5d3/pRjiJRefTgDavWnG/v0qJ0A2Djno6p7fa/QIq0a0oRd4J5Nmfc/chwIMyJXjm2wMuHP/lRj2GW48MUhuCNUo/62llgHIBrEdaOdUj/4AyzYtx8t7BlOUwW/v4r1nE9eFD5o7npp/a8Fzgg9GHI74V9ww/iFBjy7NZxDusdd_e/YAL3Mg.webp",
    url: `${STORE}/products/wasd-mousepad-devil-rose-edition`,
    accent: "#ea3d62",
    ink: "#210609",
  },
  {
    id: "chroma-jade",
    collection: "Edition",
    name: "WASD Mousepad – Chroma Jade Edition",
    price: "€60",
    was: "€70",
    status: "Sold out",
    image: "https://imgproxy.fourthwall.dev/fKyBlCg-zUKWm-IMCYZQN_mHyTMKA-Leg7x1pUkD3qI/w:720/sm:1/enc/0dL1u9JcH_14M6EQ/Xgdu0ahXO8CmtT1X/RBAvnVxr2kl7DFpD/Y1XC0fW3YoKcsJgz/FfZVjDBd6xh0COU1/IBK4C9MgNbfReTcX/BHW8WNBhSlpp0-I8/nSUVQ2NclUlL6s-F/65Pq0ENZYzl79vVS/_iQNM-T4ywHvdlw0/BCJbbvc0Q5UrxRdQ/umqC3Ok8tUgPj8hA/-29T9xARu1s0uq_c/_WENMw.jpg",
    url: `${STORE}/products/wasd-mousepad-chroma-jade-edition-3`,
    accent: "#44c69c",
    ink: "#062018",
  },
  {
    id: "onyx-eclipse",
    collection: "Edition",
    name: "WASD Mousepad – Onyx Eclipse Edition",
    price: "€60",
    was: "€70",
    status: "Sold out",
    image: "https://imgproxy.fourthwall.dev/JOVXHV_4JiCFA7d8mLdmIeEOJxb_yOZ9Ns2Y6CTTSzM/w:720/sm:1/enc/ZmGq8YEs8H18k7-y/OmgPLVnwECjyBJbt/5-TjfW7Z5D78W1M7/9YvuRtxyzfoSFq_u/S9TrtPER_b8NO0mo/FqyZLDCPM0-mPzPq/lqVbe3-F8avYbn7U/DLLosG1vuLAVEJ35/k-aHsMA8Q6Wx8m4l/S8cvz8QIWPI95zZH/stcp3jAdajbnwHhN/qH773qfquuG9e042/QiapLStnW2zJrG_8/-Yq0QA.webp",
    url: `${STORE}/products/wasd-mousepad-onyx-eclipse-edition`,
    accent: "#8590a1",
    ink: "#0d1014",
  },
  {
    id: "project-shadow",
    collection: "SYZEX",
    name: "WASD Mousepad – Project Shadow",
    image: "https://imgproxy.fourthwall.dev/SYKjIIcEaz2cX4mlsDSdj0921bz-4igd1xrvZT4RLYY/w:720/sm:1/enc/X6OLMTVLPRDlFBQG/f1Kwsz5MSqKgyPgo/-7vKseSfZQtKGyxr/9ZZIZBvaE-jB_ULx/cJhKFecaqKp1qMLb/LQ01SgfprTG9L0zN/eU2v1yxeeFMB0DqP/0xZeBgcFR6MjMMw6/ZoLRnG1RHfi6TbPr/XTYF9iUuvOGeQbdI/FyLnUIAwrNdRpGWC/fpJhIh3WE2AK_CDJ/XyEup2IFi24IhItE/8H9S-A.webp",
    url: `${STORE}/products/wasd-x-syzex-mousepad-project-shadow`,
    accent: "#c8c7c7",
    ink: "#0d0d0d",
  },
  {
    id: "project-shadow-reverse",
    collection: "SYZEX",
    name: "WASD Mousepad – Project Shadow Reverse",
    image: "https://imgproxy.fourthwall.dev/ccaC7pFXfKRzfhquNR0E2Cf-GZu8mQ0PMoffuwFJulk/w:720/sm:1/enc/KRnadDe7B2rzrljI/bmMAjEs1nHjfAbQC/0KhDftDylBmoqdTv/XOvowjSxQ3f1Mz8i/AogqgdOW9_mSAm7J/0LshCAHA70Mh9orq/NyHob8hPsrHyfKkI/g2N-NSucv23yc7Fj/Jj1EewY-tldrok12/Ww4VMofXbXoPBIms/fC5o8QWyAGvOayAa/c-WKG-mvd6t00z0T/3At9ny6Kl_IeInAI/95zBxQ.webp",
    url: `${STORE}/products/wasd-x-syzex-mousepad-project-shadow-reverse`,
    accent: "#f0eeeb",
    ink: "#252525",
  },
  {
    id: "project-shadow-blood",
    collection: "SYZEX",
    name: "WASD Mousepad – Project Shadow Blood",
    image: "https://imgproxy.fourthwall.dev/lMo3Y1SaXe4DwYQ4DFIiojy7R-sBpd6UVZqk8iNU_YY/w:720/sm:1/enc/vPgOaH_7ke_4O7vs/eG65y7rsTS6u9KAw/Ee_rPQgeW9nHafVC/J2pZLEgygfwfV9gc/YhMDkfs4d9psyCk6/nFa47RV82QPt2QJO/5UagFhubmJTr2Xx6/xqLOOttJ-2ub2JXe/0neK_zVl-WjXkRsL/J8-wqkXK6QFlf06O/qH-5FI9CmfgG5NEW/ifz8KqwadwboRTQa/x6lunEuh94AexERU/QT65Ng.webp",
    url: `${STORE}/products/wasd-x-syzex-mousepad-project-shadow-blood`,
    accent: "#a70822",
    ink: "#210407",
  },
  {
    id: "project-shadow-orchid",
    collection: "SYZEX",
    name: "WASD Mousepad – Project Shadow Orchid",
    image: "https://imgproxy.fourthwall.dev/IoWb7atVjxURDnFy-TPGG9qOo5WJ3TCvSl6rYnCo8jw/w:720/sm:1/enc/M27KTslYA9y9m16o/5usbgPGrm7BLOjxu/YVlMwN6-B9Ysqj-y/idFw8I0yUM1Mm5Rx/GXLpcjaSAxac4w2b/EpGI-6v46uFgJqc0/j67664i_2srFUod0/1pYAmye9JKBFku_x/ObPhRgxq0wkTZYeY/tIXI64NjGVvihU0l/D-nqJp4ZUaCMNAxt/K_99Olf99-iAL-Cd/2gne8Ub8Y_84itht/JiyVfg.webp",
    url: `${STORE}/products/wasd-x-syzex-mousepad-project-shadow-orchid`,
    accent: "#b994cf",
    ink: "#1c0c27",
  },
  {
    id: "project-neon-black",
    collection: "SYZEX",
    name: "WASD Mousepad – Project Neon Black",
    image: "https://imgproxy.fourthwall.dev/pyq_V0otx02PaQGBTYIopdgqW7jOeRSZM-f5Hh7VTsQ/w:720/sm:1/enc/3dPAT3mwJ_wGUu2Z/i-DttoVb2YDvYtLz/u628Ov8oZFF4tmpo/YDLmiFY8VH6zFt2h/sp-jcaicNdv_C3YL/DXrYUC0Z6V4XuYlu/uq9KZ3BeFWoD591g/7XdnutLBWarXkYm_/JFaQBkZwrmlZ0Yda/3rEEZ9R6KbA7i_8N/6Godxv08YgtjwxqF/hR17ZnPqEjHqTLAh/qS9Ot5mYQhMengyn/HYUXPA.webp",
    url: `${STORE}/products/wasd-x-syzex-mousepad-project-neon-black`,
    accent: "#aeb3ae",
    ink: "#101211",
  },
  {
    id: "project-neon-white",
    collection: "SYZEX",
    name: "WASD Mousepad – Project Neon White",
    image: "https://imgproxy.fourthwall.dev/dGjMW-jJCWNO44ImhcJiWhZAB1cLLwovINJjp7ctDVo/w:720/sm:1/enc/VcKyGwBeqgAuWONb/EvRXi0PSxWLEdgrL/sIjOvlCtjASssyLh/WGqXX-wi9KlQcxDh/xA54OQhWi9xtrUtx/s0uZDufGhnCrm2oO/xVPuyMpE8N8AnhkA/T1Dg98Y9FLsM8euP/KWQcAy5J9035O1Hg/JGhmIRU8X3jysDWs/rORXvzPZ132Rl9IM/xMV5ZVglkwXJyyqs/MOU6tyhDqV6_hnsD/E4CKhA.webp",
    url: `${STORE}/products/wasd-x-syzex-mousepad-project-neon-white`,
    accent: "#ded9cf",
    ink: "#26231f",
  },
  {
    id: "syzex-red",
    collection: "SYZEX",
    name: "WASD Mousepad – Red",
    image: "https://imgproxy.fourthwall.dev/C1jwIbFT5nNdfFvQHqOQQftMfVyoxdqh4K-ul3ftyP4/w:720/sm:1/enc/3Jn0CB7rnhBwwREx/3dxbNs6skSu5jU0P/5PqJtnmo-j3cwBH7/9-zmoUAqz5Ftjyw2/jbx5ZJYsHD6K3g9P/XGfN5aRYMX0LZ_4z/MPx5pW2QQ6X0Ctjc/pwakVJbdsgiWbStd/GsO5kaFTgJr841C-/Ebrtz2yPqMN1MRoe/uQeJ1XvWnyqLA-u9/XW-2FlU19ERoRKy6/vIikU9Vj_WJxepkZ/g60pig.webp",
    url: `${STORE}/products/wasd-x-syzex-mousepad-red`,
    accent: "#e34045",
    ink: "#250708",
  },
  {
    id: "syzex-blue",
    collection: "SYZEX",
    name: "WASD Mousepad – Blue",
    image: "https://imgproxy.fourthwall.dev/YfvbTd1qWtVA0A7SMgR-OFxRJ32gQgSql5mGSbSdyyk/w:720/sm:1/enc/BHPwn68CYbERYskO/1j2NplYN40GEnL5h/P-P9iAlJKKWJlIEp/siuW8vwNuO80p89p/D3Y_J9AWg_ylKKT-/lmygBjTBbGnac0CY/leG9nFod18x61M9i/YVP__hgBlCpxAoJs/zi21A45nTBQVT3U7/Wxlm03JkVGXYfR10/mzycaZNTOf7S9hno/Z3JLMcO0OCek-GPL/WZpDAfvvPso-rNpk/5K8YMQ.webp",
    url: `${STORE}/products/wasd-x-syzex-mousepad-blue`,
    accent: "#3979bd",
    ink: "#06142b",
  },
  {
    id: "syzex-pink",
    collection: "SYZEX",
    name: "WASD Mousepad – Pink",
    image: "https://imgproxy.fourthwall.dev/lSm6qB3r162GVLcwLKUkAR7LpAX4w9MIybwhEhADKV8/w:720/sm:1/enc/K3TYH2nh23K3yCjB/G4v9VJS4Wa5OBbUB/SvUtsbTuYWI1oCpM/tRyT__qkGVl-HaAg/DF8t5dMb7c7dOFjn/K7YHC20WB8lCxUG_/fjEZMBlzrycbaGFQ/IdU19dsWcwLTJ1Ug/vlsdatB8clu4A_h9/nDLuIa8BXGp2__ar/WcVnnae7UIQiKSTN/nGamTSc4q9gkydE5/kx67vJzUAst0wb4q/5ctawg.webp",
    url: `${STORE}/products/wasd-x-syzex-mousepad-pink`,
    accent: "#e8b4ca",
    ink: "#351323",
  },
  {
    id: "syzex-black",
    collection: "SYZEX",
    name: "WASD Mousepad – Black",
    image: "https://imgproxy.fourthwall.dev/sYIlRtTqm-mLPs8OEGPivxyOBQu_KDIzLcVCRBdhf1g/w:720/sm:1/enc/N177QiaE1PHzzcqm/jLb2HUY1L6y9L-pV/GH8CozDOtNzsb9FC/S_YoT3_1vBQRITgQ/_yYU6U_IpX_qhOZ8/OhyOIG6LEyA8dlgg/cqp6Pfzwr0a4JpaL/i0fKK6IiZ1b9uexb/N7nD2qnLYmIqCt67/pAH3y6GPjq2PWNtv/ET3r05ddEgYRo_cb/gr5X1wnsjemQa8t4/B2PhqECRJcsmheNc/QQ4iHA.webp",
    url: `${STORE}/products/wasd-x-syzex-mousepad-black`,
    accent: "#9ca0a7",
    ink: "#121316",
  },
];

const facts = [
  ["01", "490 × 420", "MM", "Professional esports format"],
  ["02", "04", "MM", "Enhanced comfort & optimal shock absorption"],
  ["03", "PORON®", "BASE", "Original foam. Zero desk movement, total grip."],
  ["04", "TYPE ZERO", "SURFACE", "Micro-woven. Balanced friction & consistent glide."],
];

/**
 * Computes scroll progress directly from the viewport. This is more reliable
 * than observer-based target tracking when the app is launched privately from
 * a ZIP, where browser scroll restoration and initial layout timing differ.
 */
function useViewportScrollProgress(ref: RefObject<HTMLElement | null>, mode: "section" | "viewport") {
  const progress = useMotionValue(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const totalDistance = mode === "section"
        ? Math.max(element.offsetHeight - viewportHeight, 1)
        : viewportHeight + element.offsetHeight;
      const travelled = mode === "section" ? -rect.top : viewportHeight - rect.top;
      progress.set(Math.min(1, Math.max(0, travelled / totalDistance)));
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [mode, progress, ref]);

  return progress;
}

function Wordmark() {
  return (
    <a className="wordmark" href="#top" aria-label="WASD home">
      <img src="/assets/wasd-crown-logo.png" alt="WASD" />
    </a>
  );
}

function Header({ open, onToggle, onClose }: { open: boolean; onToggle: () => void; onClose: () => void }) {
  const { theme, toggleTheme } = useTheme();
  const links = [
    ["Control", "#control"],
    ["Specifications", "#specs"],
    ["Collection", "#collection"],
  ];

  return (
    <header className="site-header">
      <Wordmark />
      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
      </nav>
        <div className="header-actions">
        <SocialLinks />
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle light and dark mode">{theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}</button>
        <button className="menu-button" onClick={onToggle} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav className="mobile-nav" aria-label="Mobile navigation" initial={{ opacity: 0, y: -12, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12, scale: 0.985 }} transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}>
            {links.map(([label, href], index) => <a href={href} onClick={onClose} key={href}><span>0{index + 1}</span>{label}<ArrowDownRight size={21} /></a>)}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollYProgress = useViewportScrollProgress(sectionRef, "section");
  const padScale = useTransform(scrollYProgress, [0, 0.62, 1], [0.82, 1, 1.32]);
  const padY = useTransform(scrollYProgress, [0, 1], ["6%", "-33%"]);
  const padRotate = useTransform(scrollYProgress, [0, 1], [-5, 7]);
  const copyY = useTransform(scrollYProgress, [0, 0.65], [0, -120]);
  const fade = useTransform(scrollYProgress, [0.42, 0.8], [1, 0]);

  return (
    <section className="hero-scroll" id="top" ref={sectionRef}>
      <div className="hero-sticky">
        <div className="hero-radial" />
        <motion.div className="hero-content" style={{ y: copyY, opacity: fade }}>
          <p className="eyebrow hero-eyebrow"><span /> WASD — EST. FOR CONTROL</p>
          <a className="hero-title-link" href="#collection" aria-label="Scroll to the product collection" onClick={(event) => { event.preventDefault(); document.getElementById("collection")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}><h1><span>THE SCIEN<span className="hero-ce">CE</span></span><em>OF</em><span>CONTROL</span></h1></a>
          <p className="hero-deck">A precision surface made for the space between instinct and intent.</p>
        </motion.div>
        <motion.div className="hero-pad-wrap" style={{ scale: padScale, y: padY, rotate: padRotate }}>
          <div className="hero-pad-shadow" />
          <motion.img className="hero-pad" src={products[0].image} alt="WASD Mousepad — Devil Rose Edition" fetchPriority="high" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} />
          <div className="scan-line" />
        </motion.div>
        <div className="hero-bottom">
          <a className="round-cta" href="#control" aria-label="Begin the WASD product story"><ArrowDownRight size={20} /></a>
          <div className="hero-caption"><span>Built for control.</span><span>Born for victory.</span></div>
          <div className="hero-index"><span>01</span><i /><span>09</span></div>
        </div>
      </div>
    </section>
  );
}

function FactStrip({ fact, index }: { fact: string[]; index: number }) {
  return (
    <motion.article className="fact-strip" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.7, delay: index * 0.08 }}>
      <span className="fact-number">{fact[0]}</span>
      <div className="fact-value">{fact[1]}<small>{fact[2]}</small></div>
      <p>{fact[3]}</p>
      <Plus className="fact-plus" size={18} />
    </motion.article>
  );
}

function ProductStage({ product }: { product: Product }) {
  const [, navigate] = useLocation();
  const [opening, setOpening] = useState(false);

  const openProduct = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (opening) return;
    setOpening(true);
    window.setTimeout(() => navigate(`/product/${product.id}`), 270);
  };

  return (
    <motion.div className={`product-stage ${opening ? "is-opening" : ""}`} initial={{ opacity: 0, scale: 0.965 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.03 }} transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }} style={{ background: `radial-gradient(circle at 55% 50%, ${product.accent} 0%, ${product.ink} 68%)` }}>
      <div className="stage-grid" />
      <div className="stage-ruler horizontal"><span>0</span><i /><i /><i /><i /><span>490</span></div>
      <div className="stage-ruler vertical"><span>0</span><i /><i /><i /><span>420</span></div>
      <Link className="stage-image-link" href={`/product/${product.id}`} aria-label={`Open details for ${product.name}`} onClick={openProduct}><div className="stage-image-frame"><motion.img src={product.image} alt={product.name} animate={{ rotate: [43, 45, 43], y: [0, -10, 0] }} transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }} /></div></Link>
      <p className="stage-label">WASD / {product.collection === "SYZEX" ? "SYZEX" : "ORIGINAL"}</p>
      <span className="stage-numeral"><img src="/assets/wasd-crown-logo.png" alt="WASD" /></span>
    </motion.div>
  );
}

function Collection() {
  const [collection, setCollection] = useState<Collection>("Edition");
  const [selectedId, setSelectedId] = useState("devil-rose");
  const visibleProducts = useMemo(() => products.filter((product) => product.collection === collection), [collection]);
  const selected = products.find((product) => product.id === selectedId) ?? products[0];

  useEffect(() => {
    if (selected.collection !== collection) setSelectedId(visibleProducts[0].id);
  }, [collection, selected.collection, visibleProducts]);

  return (
    <section className="collection-section" id="collection">
      <div className="collection-intro">
        <p className="eyebrow"><span /> 06 — THE COLLECTION</p>
        <div className="collection-heading"><h2>SELECT<br />YOUR <em>CONTROL</em></h2><p>Every edition, in a single evolving product scene.</p></div>
        <div className="collection-tabs" role="tablist" aria-label="Collection selector">
          {(["Edition", "SYZEX"] as Collection[]).map((tab) => (
            <button key={tab} role="tab" aria-selected={collection === tab} className={collection === tab ? "active" : ""} onClick={() => setCollection(tab)}>{tab === "Edition" ? "WASD Editions" : "WASD × SYZEX"}</button>
          ))}
        </div>
      </div>
      <div className="collection-layout">
        <div className="product-list" role="list" aria-label={`${collection} products`}>
          {visibleProducts.map((product, index) => (
            <div className={`product-row ${selected.id === product.id ? "selected" : ""}`} key={product.id} onClick={() => setSelectedId(product.id)} role="button" tabIndex={0} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setSelectedId(product.id); }} aria-pressed={selected.id === product.id}>
              <span className="product-row-index">{String(index + 1).padStart(2, "0")}</span>
              <span className="product-row-name">{product.name}</span>
              <span className="product-row-price">{product.price ?? ""}</span>
              <Link className="product-row-link" href={`/product/${product.id}`} aria-label={`Open details for ${product.name}`} onClick={(event) => event.stopPropagation()}><ArrowUpRight size={17} /></Link>
            </div>
          ))}
        </div>
        <div className="stage-shell">
          <AnimatePresence mode="wait"><ProductStage product={selected} key={selected.id} /></AnimatePresence>
          <div className="stage-meta">
            <div><span>SELECTED EDITION</span><strong>{selected.name}</strong></div>
            <div className="stage-price">{selected.price && <>{selected.was && <del>{selected.was}</del>}<strong>{selected.price}</strong></>}{selected.status && <small>{selected.status}</small>}</div>
            <Link className="underlined-link" href={`/product/${selected.id}`}>View product details <ArrowUpRight size={15} /></Link>
          </div>
          <Link className="collection-showcase-link" href="/showcase">Explore full collection <ArrowUpRight size={15} /></Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-orbit" />
      <div className="footer-top"><p className="eyebrow"><span /> READY WHEN YOU ARE</p><Link href="#collection" className="round-cta footer-cta" aria-label="Explore the WASD collection"><ArrowDownRight size={20} /></Link></div>
      <h2>MAKE<br /><em>YOUR</em><br />MOVE.</h2>
      <div className="footer-bottom">
        <Wordmark />
        <div className="footer-links"><a href="#control">Control</a><a href="#specs">Specifications</a><a href="#collection">Collection</a></div>
        <div className="footer-legal"><span>© 2026 WASD</span><Link href="/cookie-policy">Cookie Policy</Link><Link href="/privacy-policy">Privacy Policy</Link><button type="button" onClick={openCookiePreferences}>Gestisci cookie</button></div>
      </div>
      <div className="feedback-form">
        <div><span className="feedback-label">CONTACT / FEEDBACK</span><h3>Tell us what<br /><em>you feel.</em></h3></div>
        <p className="feedback-prompt">Share your experience with the WASD surface.</p>
        <Link className="feedback-link" href="/feedback">Send feedback <ArrowUpRight size={15} /></Link>
      </div>
    </footer>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stickyVisible, setStickyVisible] = useState(false);
  const surfaceRef = useRef<HTMLElement>(null);
  const surfaceProgress = useViewportScrollProgress(surfaceRef, "viewport");
  const surfaceY = useTransform(surfaceProgress, [0, 0.5, 1], ["-12%", "0%", "12%"]);

  useEffect(() => {
    const updateStickyState = () => {
      const hero = document.getElementById("top");
      if (!hero) return;
      const threshold = hero.offsetTop + hero.offsetHeight - 72;
      setStickyVisible(window.scrollY > threshold);
    };

    updateStickyState();
    window.addEventListener("scroll", updateStickyState, { passive: true });
    window.addEventListener("resize", updateStickyState);
    return () => {
      window.removeEventListener("scroll", updateStickyState);
      window.removeEventListener("resize", updateStickyState);
    };
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1050);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main>
      <AnimatePresence>
        {loading && <motion.div className="preloader" initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] } }}><img className="preloader-logo" src="/assets/wasd-crown-logo.png" alt="WASD" /><i /><p>CALIBRATING CONTROL</p></motion.div>}
      </AnimatePresence>
      <Header open={menuOpen} onToggle={() => setMenuOpen((value) => !value)} onClose={() => setMenuOpen(false)} />
      <div className={`product-sticky-bar home-sticky-bar ${stickyVisible ? "is-visible" : ""}`} aria-hidden={!stickyVisible}>
        <span className="product-sticky-name">MOUSEPADS</span>
        <div className="product-sticky-actions">
          <Link className="product-sticky-buy" href="/showcase" tabIndex={stickyVisible ? 0 : -1}>Acquista</Link>
        </div>
      </div>
      <Hero />

      <section className="manifesto" id="control">
        <div className="section-marker"><span>02</span><i /><span>CONTROL</span></div>
        <div className="manifesto-copy">
          <p className="eyebrow"><span /> BUILT FOR THE MICRO-ADJUSTMENT</p>
          <h2>THE DIFFERENCE<br />IS <em>FELT.</em></h2>
          <p className="body-copy">Unlike standard mass-produced rubber pads, WASD is designed as a competitive hardware component for players who need precision when the movement gets small.</p>
        </div>
        <div className="manifesto-orbit"><span>CONTROL</span><span>GLIDE</span><span>STOPPING POWER</span><span>CONSISTENCY</span><div className="orbit-core">W</div></div>
      </section>

      <section className="scale-section" aria-label="Mousepad dimensions">
        <div className="scale-kicker"><span>03 — MOVEMENT</span><span>PRO ESports FORMAT</span></div>
        <div className="scale-number">490 <span>×</span> 420</div>
        <div className="scale-unit">MM</div>
        <motion.div className="scale-pad" initial={{ opacity: 0, x: "-50%", y: 34, rotate: -11 }} whileInView={{ opacity: 1, x: "-50%", y: 0, rotate: -4 }} viewport={{ once: true, amount: 0.08, margin: "0px 0px -8% 0px" }} transition={{ duration: 1.15, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}><img src={products[1].image} loading="lazy" alt="WASD Mousepad — Chroma Jade Edition" /><div className="scale-measure x-measure"><i /><span>490 MM</span><i /></div><div className="scale-measure y-measure"><i /><span>420 MM</span><i /></div></motion.div>
        <p>Room to commit. Proportioned for the full range of a competitive play space.</p>
      </section>

      <section className="spec-section" id="specs">
        <div className="spec-intro"><p className="eyebrow"><span /> 04 — MATERIAL SYSTEM</p><h2>BUILT FROM<br />THE <em>GROUND</em> UP.</h2><p>Four decisions. One uninterrupted relationship with the desk.</p></div>
        <div className="facts-list">{facts.map((fact, index) => <FactStrip fact={fact} index={index} key={fact[0]} />)}</div>
      </section>

      <section className="surface-section" ref={surfaceRef}>
        <div className="surface-image"><motion.img style={{ y: surfaceY, scale: 1.12 }} src="/assets/wasd-material-closeup.webp" alt="Close-up of WASD Type Zero micro-woven mousepad fabric" /><div className="surface-light" /></div>
        <div className="surface-copy"><p className="eyebrow"><span /> 05 — SURFACE</p><h2>FLOW.<br /><em>THEN</em><br />STOP.</h2><p>Type Zero micro-woven fabric balances stopping power with an effortless, consistent glide.</p><div className="surface-notes"><span>MICRO-WOVEN</span><i /><span>LOW-PROFILE STITCH</span><i /><span>PIXEL-PRECISE</span></div></div>
      </section>

      <Collection />

      <section className="outro-section">
        <p className="eyebrow"><span /> 08 — CHOSEN BY FEEL</p>
        <div><span className="outro-count">03</span><h2>THE ORIGINAL<br />WASD <em>EDITIONS.</em></h2></div>
        <p className="outro-copy">Devil Rose, Chroma Jade and Onyx Eclipse are currently listed as sold out. Explore every edition, save your selection, and send feedback directly from this experience.</p>
        <Link href="/showcase" className="text-link">Explore the collection <ArrowUpRight size={16} /></Link>
      </section>
      <Footer />
    </main>
  );
}
