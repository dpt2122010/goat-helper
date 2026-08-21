import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Droplets,
  FlaskConical,
  Leaf,
  LineChart,
  ShieldCheck,
  Sprout,
  Wheat,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

import { LogoMark } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type Feature = {
  icon: LucideIcon;
  label: string;
  summary: string;
  traits: string[];
  to: string;
};

const FEATURES = {
  leaf: {
    icon: Leaf,
    label: "Leaf Classification",
    summary: "Identify species and leaf disorders from a single photograph.",
    traits: [
      "Species & family level taxonomy",
      "Leaf spot, blight and mildew recognition",
      "Stress pattern and chlorosis scoring",
      "Confidence levels with honest limitations",
    ],
    to: "/product/crop-health",
  },
  soil: {
    icon: Droplets,
    label: "Soil Diagnostics",
    summary: "Read soil condition and plan irrigation from a soil photo.",
    traits: [
      "Texture class (sandy, loamy, clay)",
      "pH band and moisture balance",
      "N-P-K breakdown with amendments",
      "Best-fit crops and irrigation setup",
    ],
    to: "/product/soil-diagnostics",
  },
  brix: {
    icon: FlaskConical,
    label: "Brix & pH Assessor",
    summary: "Estimate sweetness, acidity and ripeness before harvest.",
    traits: [
      "Estimated Brix (sugar) range",
      "Acidity / pH indication",
      "Ripeness stage and harvest window",
      "Grading hints for pricing",
    ],
    to: "/product/brix-ph",
  },
  seed: {
    icon: Wheat,
    label: "Seed Quality Tester",
    summary: "Judge a seed lot before it ever reaches the field.",
    traits: [
      "Germination percentage estimate",
      "Physical purity and damage rate",
      "Moisture content indication",
      "Cultivar / GMO trait indicators",
    ],
    to: "/product/seed-quality",
  },
  disease: {
    icon: ShieldCheck,
    label: "Disease Detection",
    summary: "Catch pathogens and pests early with 95% field accuracy.",
    traits: [
      "Fungal, bacterial and viral signatures",
      "Pest damage identification",
      "Ranked causes with severity score",
      "Organic and chemical treatment plans",
    ],
    to: "/product/crop-health",
  },
  crop: {
    icon: Sprout,
    label: "Crop Health Analyzer",
    summary: "A full agronomic read-out for any crop, fruit or flower.",
    traits: [
      "0-100 crop health score",
      "Nutrient deficiency mapping",
      "Staged treatments with dosages",
      "Follow-up timing for the next check",
    ],
    to: "/product/crop-health",
  },
  report: {
    icon: LineChart,
    label: "Field Report Archive",
    summary: "Keep a season-long history of every plot you scan.",
    traits: [
      "Every diagnosis saved to your dashboard",
      "Plot-by-plot trend tracking",
      "Downloadable printable PDF reports",
      "Shareable with agronomists and buyers",
    ],
    to: "/dashboard",
  },
} satisfies Record<string, Feature>;

type OrbitIcon = { key: keyof typeof FEATURES; angle: number };

const orbits: { size: string; duration: number; icons: OrbitIcon[] }[] = [
  {
    size: "size-[15rem] md:size-[22rem]",
    duration: 18,
    icons: [
      { key: "leaf", angle: -60 },
      { key: "soil", angle: 60 },
    ],
  },
  {
    size: "size-[21rem] md:size-[30rem]",
    duration: 24,
    icons: [
      { key: "brix", angle: 0 },
      { key: "seed", angle: -90 },
    ],
  },
  {
    size: "size-[27rem] md:size-[38rem]",
    duration: 30,
    icons: [
      { key: "disease", angle: -60 },
      { key: "crop", angle: 0 },
      { key: "report", angle: 60 },
    ],
  },
];

export default function OrbitingCirclesGlobe({ className }: { className?: string }) {
  const [active, setActive] = useState<Feature | null>(null);
  const [aboutOpen, setAboutOpen] = useState(false);

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
        .orbit-paused, .orbit-paused * { animation-play-state: paused !important; }
      `}</style>

      {/* Center: Farmer's APP logo → About us */}
      <button
        type="button"
        onClick={() => setAboutOpen(true)}
        aria-label="About Farmer's APP"
        className="absolute z-10 flex size-24 items-center justify-center rounded-full border border-border/70 bg-background/80 shadow-elegant backdrop-blur-xl transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:size-32"
      >
        <LogoMark className="size-14 md:size-20" />
      </button>

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
            className={cn("absolute rounded-full border border-primary/15", orbit.size)}
          >
            {allIcons.map((iconData) => {
              const feature = FEATURES[iconData.key];
              const Icon = feature.icon;
              return (
                <div
                  key={`${iconData.key}-${iconData.angle}`}
                  className="absolute inset-0"
                  style={
                    {
                      "--start-angle": `${iconData.angle}deg`,
                      animation: `${orbitAnim} ${orbit.duration}s linear infinite`,
                    } as React.CSSProperties
                  }
                >
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                    <button
                      type="button"
                      onClick={() => setActive(feature)}
                      title={feature.label}
                      aria-label={feature.label}
                      className="pointer-events-auto relative flex size-11 flex-col items-center justify-center rounded-2xl border border-border/70 bg-card shadow-sm transition-colors hover:border-primary hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:size-14"
                      style={
                        {
                          "--counter-offset": `${iconData.angle}deg`,
                          animation: `${counterAnim} ${orbit.duration}s linear infinite`,
                        } as React.CSSProperties
                      }
                    >
                      <Icon className="size-5 text-primary md:size-6" />
                      {/* Label visible for every rotating logo */}
                      <span className="absolute -bottom-5 whitespace-nowrap rounded-full bg-card/90 px-2 py-0.5 text-[9px] font-medium text-foreground shadow-sm backdrop-blur-sm md:-bottom-6 md:px-2.5 md:text-[10px]">
                        {feature.label}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}

      {/* Feature characteristics */}
      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="sm:max-w-md">
          {active ? (
            <>
              <DialogHeader>
                <span className="gradient-primary mb-3 flex size-11 items-center justify-center rounded-2xl text-primary-foreground">
                  <active.icon className="size-5" />
                </span>
                <DialogTitle>{active.label}</DialogTitle>
                <DialogDescription>{active.summary}</DialogDescription>
              </DialogHeader>
              <ul className="space-y-2 text-sm">
                {active.traits.map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="text-muted-foreground">{t}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-2 w-full rounded-full">
                <Link to={active.to} onClick={() => setActive(null)}>
                  Learn more <ArrowRight className="size-4" />
                </Link>
              </Button>
            </>
          ) : null}
        </DialogContent>
      </Dialog>

      {/* About us */}
      <Dialog open={aboutOpen} onOpenChange={setAboutOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>About Farmer&apos;s APP</DialogTitle>
            <DialogDescription>
              Biological vision AI that reads crops, fruit, seeds and soil like an agronomist —
              built for growers in 14 countries.
            </DialogDescription>
          </DialogHeader>
          <ul className="space-y-2 text-sm">
            {[
              "95% disease detection accuracy on field imagery",
              "30% less water used across irrigated plots",
              "10,000+ growers supported worldwide",
              "Every diagnosis exportable as a printable PDF",
            ].map((t) => (
              <li key={t} className="flex gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span className="text-muted-foreground">{t}</span>
              </li>
            ))}
          </ul>
          <Button asChild className="mt-2 w-full rounded-full">
            <Link to="/company/about" onClick={() => setAboutOpen(false)}>
              Read our full story <ArrowRight className="size-4" />
            </Link>
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
