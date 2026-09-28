import { ArrowLeft, ArrowUpRight, Moon, Paperclip, Send, Sun } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";
import SocialLinks from "@/components/SocialLinks";

const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;

export default function FeedbackPage() {
  const { theme, toggleTheme } = useTheme();
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (file && file.size > MAX_ATTACHMENT_BYTES) {
      setAttachment(null);
      setError("Choose a file smaller than 5 MB.");
      event.target.value = "";
      return;
    }
    setError("");
    setAttachment(file);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsPending(true);

    try {
      // Simulate network submission gracefully for static deploy
      await new Promise((resolve) => setTimeout(resolve, 600));
      setSent(true);
      setError("");
      setAttachment(null);
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <main className="feedback-page internal-page-entrance">
      <header className="detail-header">
        <Link href="/" className="wordmark" aria-label="Back to WASD home">
          <img src="/assets/wasd-crown-logo.png" alt="WASD" />
        </Link>
        <div className="detail-actions">
          <SocialLinks />
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle light and dark mode"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </header>

      <div className="feedback-inner">
        <Link href="/" className="back-link">
          <ArrowLeft size={15} /> Back to experience
        </Link>
        <p className="eyebrow">
          <span /> CONTACT / FEEDBACK
        </p>
        <h1>
          Tell us what
          <br />
          <em>you feel.</em>
        </h1>
        {sent ? (
          <div className="feedback-success">
            <Send size={24} />
            <h2>Received.</h2>
            <p>Thank you for helping us refine the feel of WASD.</p>
            <Link href="/" className="detail-add">
              Return home <ArrowUpRight size={16} />
            </Link>
          </div>
        ) : (
          <form className="feedback-card" onSubmit={handleSubmit}>
            <label>
              Email
              <input
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
              />
            </label>
            <label>
              Your message
              <textarea
                required
                minLength={10}
                maxLength={5000}
                rows={5}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Tell us about your experience..."
              />
            </label>
            <label className="feedback-file-label">
              Reference file <span>optional · max 5 MB</span>
              <input
                className="feedback-file-input"
                type="file"
                accept="image/*,.pdf,.txt"
                onChange={handleFileChange}
              />
              <span className="feedback-file-button">
                <Paperclip size={15} /> {attachment ? attachment.name : "Attach a file"}
              </span>
            </label>
            {error && (
              <p className="feedback-error" role="alert">
                {error}
              </p>
            )}
            <button className="detail-add" type="submit" disabled={isPending}>
              {isPending ? "Saving feedback…" : "Send feedback"}{" "}
              <ArrowUpRight size={16} />
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
