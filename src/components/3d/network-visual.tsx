"use client";

import dynamic from "next/dynamic";
import {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Pause, Play } from "lucide-react";
import { StaticNetwork } from "./static-network";

const Scene = dynamic(() => import("./network-scene"), {
  ssr: false,
  loading: () => null,
});

class CanvasBoundary extends Component<
  { children: ReactNode; fallback: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/** 3D différée, hors écran suspendue, version statique sur appareils modestes et mouvement réduit. */
export function NetworkVisual({
  dark = false,
  selection = 0,
  active = true,
  className = "",
}: {
  dark?: boolean;
  selection?: number;
  active?: boolean;
  className?: string;
}) {
  const wrapper = useRef<HTMLDivElement>(null);
  const [capable, setCapable] = useState(false);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const onError = useCallback(() => setFailed(true), []);
  const onReady = useCallback(() => setSceneReady(true), []);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const updateCapability = () => {
      const nav = navigator as Navigator & {
        deviceMemory?: number;
        connection?: { saveData?: boolean };
      };
      if (
        media.matches ||
        nav.connection?.saveData ||
        (nav.deviceMemory !== undefined && nav.deviceMemory <= 4) ||
        nav.hardwareConcurrency <= 2
      ) {
        setCapable(false);
        return;
      }
      try {
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl2");
        setCapable(Boolean(gl));
        gl?.getExtension("WEBGL_lose_context")?.loseContext();
      } catch {
        setCapable(false);
      }
    };
    updateCapability();
    media.addEventListener("change", updateCapability);
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "80px" },
    );
    if (wrapper.current) observer.observe(wrapper.current);
    const visibility = () => {
      if (document.hidden) setInView(false);
      else if (wrapper.current) {
        const bounds = wrapper.current.getBoundingClientRect();
        setInView(bounds.bottom > 0 && bounds.top < innerHeight);
      }
    };
    document.addEventListener("visibilitychange", visibility);
    return () => {
      media.removeEventListener("change", updateCapability);
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  const animated = capable && inView && !paused && !failed;
  return (
    <div
      ref={wrapper}
      className={`network-visual ${dark ? "network-dark" : ""} ${className}`}
    >
      <div
        className={`network-fallback ${animated && sceneReady ? "under-canvas" : ""}`}
      >
        <StaticNetwork dark={dark} active={active} />
      </div>
      {animated && (
        <div className="network-canvas" aria-hidden="true">
          <CanvasBoundary
            fallback={<StaticNetwork dark={dark} active={active} />}
            onError={onError}
          >
            <Scene
              dark={dark}
              selection={selection}
              active={active}
              onError={onError}
              onReady={onReady}
            />
          </CanvasBoundary>
        </div>
      )}
      {capable && !failed && (
        <button
          className="animation-toggle"
          type="button"
          onClick={() => setPaused(!paused)}
          aria-label={
            paused ? "Activer l’animation 3D" : "Mettre l’animation 3D en pause"
          }
        >
          {paused ? (
            <Play size={12} aria-hidden="true" />
          ) : (
            <Pause size={12} aria-hidden="true" />
          )}
          <span>{paused ? "Animer" : "Pause"}</span>
        </button>
      )}
    </div>
  );
}
