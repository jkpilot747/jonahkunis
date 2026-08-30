const LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/jonahkunis",
    icon: "/icons/instagram.svg",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jonahkunis",
    icon: "/icons/linkedin.svg",
  },
  {
    label: "Email",
    href: "mailto:jonahkunis@gmail.com",
    icon: "/icons/email.svg",
  },
] as const;

export function SocialDock() {
  return (
    <div className="fixed right-5 bottom-5 flex w-14 flex-col items-center gap-5 bg-panel p-3">
      {LINKS.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="h-8 w-8 bg-muted transition-colors hover:bg-ink"
          style={{
            maskImage: `url(${link.icon})`,
            maskRepeat: "no-repeat",
            maskPosition: "center",
            maskSize: "contain",
            WebkitMaskImage: `url(${link.icon})`,
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            WebkitMaskSize: "contain",
          }}
        />
      ))}
    </div>
  );
}
