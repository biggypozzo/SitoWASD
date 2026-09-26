export const DISCORD_URL = "https://discord.gg/xZbNaZpKXZ";
const TIKTOK = "https://www.tiktok.com/@wasdfilo";

export function DiscordIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.5 5.2A16.2 16.2 0 0 0 15.6 4l-.5 1a14.5 14.5 0 0 0-4.2 0l-.5-1a16.2 16.2 0 0 0-3.9 1.2C4 8.7 3.3 12 3.6 15.2a16.1 16.1 0 0 0 4.8 2.4l1.2-1.6-1.4-.7.3-.2c2.8 1.3 5.8 1.3 8.5 0l.3.2-1.4.7 1.2 1.6a16.1 16.1 0 0 0 4.8-2.4c.4-3.7-.6-7-2.4-10Zm-9.1 8.1c-.8 0-1.5-.8-1.5-1.8s.7-1.8 1.5-1.8 1.5.7 1.5 1.8-.7 1.8-1.5 1.8Zm3.2 0c-.8 0-1.5-.8-1.5-1.8s.7-1.8 1.5-1.8 1.5.7 1.5 1.8-.7 1.8-1.5 1.8Z" /></svg>;
}

export default function SocialLinks() {
  return (
    <div className="social-links" aria-label="WASD social links">
      <a className="header-tiktok" href={TIKTOK} target="_blank" rel="noreferrer" aria-label="Open WASD TikTok channel @wasdfilo" data-tooltip="@wasdfilo">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path className="tiktok-cyan" d="M14.3 3.2c.4 2.3 1.7 3.8 4 4.2v3.1c-1.4-.1-2.7-.5-4-1.3v6.3a5.3 5.3 0 1 1-4.6-5.2v3.2a2.2 2.2 0 1 0 1.5 2.1V3.2h3.1Z" /><path className="tiktok-pink" d="M15.4 4.3c.5 1.5 1.5 2.5 2.9 3v2.3c-1.1-.1-2.1-.4-3-.9v6.3a5.3 5.3 0 1 1-4.6-5.2v2.1a2.2 2.2 0 1 0 2.5 2.1V4.3h2.2Z" /><path className="tiktok-core" d="M13.2 2.4c.4 2.3 1.7 3.8 4 4.2v3.1c-1.4-.1-2.7-.5-4-1.3v6.3a5.3 5.3 0 1 1-4.6-5.2v3.2a2.2 2.2 0 1 0 1.5 2.1V2.4h3.1Z" /></svg>
      </a>
      <a className="header-discord" href={DISCORD_URL} target="_blank" rel="noreferrer" aria-label="Open WASD Discord server" data-tooltip="Discord"><DiscordIcon /></a>
    </div>
  );
}
