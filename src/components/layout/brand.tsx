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
        className="ufr-logo"
        src="/brand/ufr-mathematiques-informatique.png"
        width={2224}
        height={700}
        alt="UFR Mathématiques et Informatique — Université Paris Cité"
        priority
      />
    </Link>
  );
}
