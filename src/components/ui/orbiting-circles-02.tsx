import {
  Droplets,
  FlaskConical,
  Leaf,
  LineChart,
  ShieldCheck,
  Sprout,
  Wheat,
  type LucideIcon,
} from "lucide-react";

import { LogoMark } from "@/components/brand/logo";
import { cn } from "@/lib/utils";

type OrbitIcon = { icon: LucideIcon; label: string; angle: number };

const orbits: { size: string; duration: number; icons: OrbitIcon[] }[] = [
  {
    size: "size-[15rem] md:size-[22rem]",
    duration: 18,
    icons: [
      { icon: Leaf, label: "Leaf Classification", angle: -60 },
      { icon: Droplets, label: "Soil Diagnostics", angle: 60 },
    ],
  },
  {
    size: "size-[21rem] md:size-[30rem]",
    duration: 24,
    icons: [
      { icon: FlaskConical, label: "Brix & pH Assessor", angle: 0 },
      { icon: Wheat, label: "Seed Quality Tester", angle: -90 },
    ],
  },
  {
    size: "size-[27rem] md:size-[38rem]",
    duration: 30,
    icons: [
      { icon: ShieldCheck, label: "Disease Detection", angle: -60 },
      { icon: Sprout, label: "Crop Health Analyzer", angle: 0 },
      { icon: LineChart, label: "Field Report Archive", angle: 60 },
    ],
  },
];

export default function OrbitingCirclesGlobe({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-[28rem] w-full items-center justify-center overflow-hidden md:h-[40rem]",
        className,
      )}
    >
      <style>{`
        @keyframes orbit-cw {
          from { transform: rotate(var(--start-angle)) }
          to   { transform: rotate(calc(var(--start-angle) + 360deg)) }
        }
        @keyframes orbit-ccw {
          from { transform: rotate(var(--start-angle)) }
          to   { transform: rotate(calc(var(--start-angle) - 360deg)) }
        }
        @keyframes counter-cw {
          from { transform: rotate(var(--counter-offset, 0deg)) }
          to   { transform: rotate(calc(var(--counter-offset, 0deg) - 360deg)) }
        }
        @keyframes counter-ccw {
          from { transform: rotate(var(--counter-offset, 0deg)) }
          to   { transform: rotate(calc(var(--counter-offset, 0deg) + 360deg)) }
        }
      `}</style>

      {/* Center: Farmer's APP logo */}
      <div className="absolute z-10 flex size-24 items-center justify-center rounded-full border border-border/70 bg-background/80 shadow-elegant backdrop-blur-xl md:size-32">
        <LogoMark className="size-14 md:size-20" />
      </div>

      {/* Orbiting rings */}
      {orbits.map((orbit, index) => {
        const isCW = index % 2 === 0;
        const orbitAnim = isCW ? "orbit-cw" : "orbit-ccw";
        const counterAnim = isCW ? "counter-cw" : "counter-ccw";

        const allIcons: OrbitIcon[] = [
          ...orbit.icons,
          ...orbit.icons.map((ic) => ({ ...ic, angle: ic.angle + 180 })),
        ];

        return (
          <div
            key={orbit.size}
            className={cn(
              "absolute rounded-full border border-primary/15",
              orbit.size,
            )}
          >
            {allIcons.map((iconData) => (
              <div
                key={`${iconData.label}-${iconData.angle}`}
                className="absolute inset-0"
                style={
                  {
                    "--start-angle": `${iconData.angle}deg`,
                    animation: `${orbitAnim} ${orbit.duration}s linear infinite`,
                  } as React.CSSProperties
                }
              >
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                  <div
                    className="flex size-11 items-center justify-center rounded-2xl border border-border/70 bg-card shadow-sm md:size-14"
                    style={
                      {
                        "--counter-offset": `${iconData.angle}deg`,
                        animation: `${counterAnim} ${orbit.duration}s linear infinite`,
                      } as React.CSSProperties
                    }
                    title={iconData.label}
                    aria-label={iconData.label}
                  >
                    <iconData.icon className="size-5 text-primary md:size-6" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
