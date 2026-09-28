import { ArrowLeft, Check, Copy, ExternalLink, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";
import { products } from "./Home";
import { DiscordIcon } from "@/components/SocialLinks";

const PURCHASE_DISCORD_URL = "https://discord.gg/HrZnyd7E57";

export default function PurchasePage() {
  const [, params] = useRoute("/purchase/:id");
  const [, navigate] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [copied, setCopied] = useState(false);
  const product = products.find((item) => item.id === params?.id);

  if (!product) return <div className="simple-page"><Link href="/">Product not found — return home</Link></div>;

  const orderMessage = [
    "Hi! I'd like to pay for my WASD order.",
    "",
    `Product: ${product.name}`,
    `Amount to send: ${product.price ?? "Please confirm the current price in Discord."}`,
    "",
    "Please send me the payment details and confirm my order.",
  ].join("\n");

  const copyMessage = async () => {
    await navigator.clipboard?.writeText(orderMessage);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <main className="purchase-page internal-page-entrance">
      <header className="detail-header">
        <Link href="/" className="wordmark" aria-label="Back to WASD home"><img src="/assets/wasd-crown-logo.png" alt="WASD" /></Link>
        <div className="detail-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle light and dark mode"><span>{theme === "dark" ? "LIGHT" : "DARK"}</span></button>
        </div>
      </header>

      <div className="purchase-inner">
        <div className="purchase-back"><button onClick={() => navigate(`/product/${product.id}`)}><ArrowLeft size={15} /> Back to product</button><span>ORDER / 01</span></div>
        <section className="purchase-intro">
          <p className="eyebrow"><span /> PAYPAL PAYMENT</p>
          <h1>SECURE<br /><em>YOUR CONTROL.</em></h1>
          <p>WASD uses a direct payment handoff. Confirm the current amount through Discord, then complete the PayPal payment and send the order request so the edition can be reserved for you.</p>
        </section>

        <section className="purchase-order-card">
          <div className="purchase-order-image"><img src={product.image} alt={product.name} /></div>
          <div className="purchase-order-copy"><span>YOUR ORDER</span><h2>{product.name}</h2><strong>{product.price ? <>Amount to send <b>{product.price}</b></> : <>Amount <b>Confirm in Discord</b></>}</strong><small>{product.price ? "No extra fee — send exactly this amount." : "The current amount will be confirmed through Discord."}</small></div>
          <Link href={`/product/${product.id}`} className="purchase-product-link">Open product page <ExternalLink size={13} /></Link>
        </section>

        <section className="purchase-steps">
          <article className="purchase-step">
            <div className="purchase-step-heading"><b>1</b><div><h2>Copy this message</h2><p>Copy the order details and send them through the WASD Discord server.</p></div></div>
            <div className="purchase-message-head"><span>ORDER REQUEST</span><button onClick={copyMessage} aria-label="Copy order request">{copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}</button></div>
            <pre className="purchase-message">{orderMessage}</pre>
          </article>
          <article className="purchase-step">
            <div className="purchase-step-heading"><b>2</b><div><h2>Send it in a ticket</h2><p>Open the Discord server and paste the copied request into a new ticket.</p></div></div>
            <a className="purchase-discord" href={PURCHASE_DISCORD_URL} target="_blank" rel="noreferrer"><DiscordIcon /><span>Open the Discord server</span><ExternalLink size={15} /></a>
          </article>
        </section>
        <p className="purchase-note">After payment is confirmed, WASD will verify the transfer and continue your order. Keep your payment receipt until the handoff is complete.</p>
      </div>
    </main>
  );
}
