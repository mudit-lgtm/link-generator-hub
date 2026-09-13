import { useEffect, useState } from "react";

const SITE = "https://shortlink.businestools.online";

type Entry = { name: string; site?: string; msg: string; at: number };

export function ShareAndGuestbook({ path, title }: { path: string; title: string }) {
  const url = `${SITE}${path}`;
  const enc = encodeURIComponent(url);
  const encT = encodeURIComponent(title);
  const shares = [
    { label: "X", href: `https://twitter.com/intent/tweet?url=${enc}&text=${encT}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${enc}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc}` },
    { label: "Reddit", href: `https://www.reddit.com/submit?url=${enc}&title=${encT}` },
    { label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(title + " " + url)}` },
    { label: "Telegram", href: `https://t.me/share/url?url=${enc}&text=${encT}` },
  ];

  const key = `guestbook:${path}`;
  const [entries, setEntries] = useState<Entry[]>([]);
  const [name, setName] = useState("");
  const [site, setSite] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setEntries(JSON.parse(raw));
    } catch { /* ignore */ }
  }, [key]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !msg.trim()) return;
    const next = [{ name: name.trim(), site: site.trim() || undefined, msg: msg.trim(), at: Date.now() }, ...entries].slice(0, 50);
    setEntries(next);
    try { localStorage.setItem(key, JSON.stringify(next)); } catch { /* ignore */ }
    setName(""); setSite(""); setMsg("");
  }

  const inputCls = "w-full rounded-md border border-border bg-background px-3 py-2 text-sm";

  return (
    <section className="mt-12 space-y-6">
      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="font-display text-lg font-bold mb-1">Share this link generator</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Found it useful? Share it, or link back to{" "}
          <a href={SITE} className="text-primary font-semibold underline underline-offset-2">Businestools Links</a>{" "}
          from your own site.
        </p>
        <div className="flex flex-wrap gap-2">
          {shares.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener"
              className="text-xs font-semibold px-3 py-1.5 rounded-full border border-border hover:bg-accent transition"
            >
              Share on {s.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => navigator.clipboard?.writeText(url)}
            className="text-xs font-semibold px-3 py-1.5 rounded-full border border-border hover:bg-accent transition"
          >
            Copy page URL
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="font-display text-lg font-bold mb-1">Guestbook</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Leave a note about how you use this tool. Entries are saved in your browser.
        </p>
        <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2">
          <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
          <input className={inputCls} value={site} onChange={(e) => setSite(e.target.value)} placeholder="Your website (optional)" />
          <textarea className={`${inputCls} sm:col-span-2`} rows={3} value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Your message" />
          <div className="sm:col-span-2">
            <button type="submit" className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold">
              Sign the guestbook
            </button>
          </div>
        </form>
        {entries.length > 0 && (
          <ul className="mt-5 space-y-3">
            {entries.map((en) => (
              <li key={en.at} className="rounded-lg border border-border/70 p-3">
                <p className="text-sm font-semibold">
                  {en.site ? (
                    <a href={en.site} rel="nofollow noopener" target="_blank" className="text-primary underline underline-offset-2">{en.name}</a>
                  ) : en.name}
                  <span className="ml-2 text-xs font-normal text-muted-foreground">{new Date(en.at).toLocaleDateString()}</span>
                </p>
                <p className="text-sm text-muted-foreground mt-1">{en.msg}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
