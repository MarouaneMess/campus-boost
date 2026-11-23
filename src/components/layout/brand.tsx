import Image from "next/image";
import Link from "next/link";

export function Brand({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link
      href="/"
      className="brand-system"
      aria-label="Campus Boost — accueil"
      onClick={onNavigate}
    >
      <Image
        className="campus-logo"
        src="/brand/campus-boost.webp"
        width={105}
        height={70}
        alt="Campus Boost"
        priority
      />
      <Image
        className="university-logo"
        src="/brand/universite-paris-cite.png"
        width={150}
        height={58}
        alt="Université Paris Cité"
        priority
      />
      <span className="ufr-badge">
        <span>UFR</span>
        <strong>
          Mathématiques
          <br className="badge-break" /> et Informatique
        </strong>
      </span>
    </Link>
  );
}
