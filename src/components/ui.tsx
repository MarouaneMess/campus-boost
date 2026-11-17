import {
  ArrowUpRight,
  Landmark,
  Code2,
  Plane,
  HeartPulse,
  Zap,
  ShoppingBag,
  Radio,
  Truck,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/types/content";
import type { ReactNode } from "react";

const icons: Record<IconName, LucideIcon> = {
  bank: Landmark,
  code: Code2,
  plane: Plane,
  heart: HeartPulse,
  energy: Zap,
  shop: ShoppingBag,
  radio: Radio,
  truck: Truck,
};

export function SectorIcon({
  name,
  size = 22,
  className = "",
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  const Icon = icons[name];
  return (
    <Icon
      size={size}
      strokeWidth={1.6}
      className={className}
      aria-hidden="true"
    />
  );
}

export function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <p className={`eyebrow${light ? " eyebrow-light" : ""}`}>
      <span aria-hidden="true" />
      {children}
    </p>
  );
}

/** Les liens externes sont annoncés ; aucun n’est préchargé par Next. */
export function ExternalLink({
  href,
  children,
  className = "text-link",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <ArrowUpRight size={16} aria-hidden="true" />
      <span className="sr-only"> (nouvel onglet)</span>
    </a>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  id?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id={id}>{title}</h2>
      </div>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
