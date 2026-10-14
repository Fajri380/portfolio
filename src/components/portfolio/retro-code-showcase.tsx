"use client";

import { animate } from "animejs";
import { useEffect, useRef } from "react";
import { MatrixBinaryText } from "@/components/portfolio/matrix-binary-text";
import { TypingRevealText } from "@/components/portfolio/typing-reveal-text";
import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { useShowcaseStore } from "@/store/showcase-store";

const snippetOrder = ["next", "query", "store"] as const;

const stackItems = [
  {
    title: "Understand",
    body: "Break down the problem, research references, and plan the structure before writing code.",
  },
  {
    title: "Build",
    body: "Develop features step by step, focusing on clean code and readable structure.",
  },
  {
    title: "Improve",
    body: "Test, debug, and refine based on feedback until it feels solid and polished.",
  },
];

const snippets = {
  next: `// Frontend I've practiced with
Next.js + React + TypeScript
Tailwind CSS for styling
Framer Motion / Anime.js for animation`,
  query: `// Backend & data handling I'm learning
Node.js + Express basics
REST API design
MongoDB / PostgreSQL for storage`,
  store: `// Tools I use while building
Git & GitHub for version control
Vercel for deployment
VS Code + ESLint/Prettier for clean code`,
} as const;

const flipCards = [
  {
    front: "Speed",
    back: "I stay focused and efficient, aiming to ship working features without unnecessary delays.",
  },
  {
    front: "Quality",
    back: "I care about clean, readable code and follow best practices even under time pressure.",
  },
  {
    front: "Growth",
    back: "I'm always learning — every project is a chance to pick up something new.",
  },
] as const;

export function RetroCodeShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const activeStack = useShowcaseStore((state) => state.activeStack);
  const setActiveStack = useShowcaseStore((state) => state.setActiveStack);
  const activeSnippet = useShowcaseStore((state) => state.activeSnippet);
  const setActiveSnippet = useShowcaseStore((state) => state.setActiveSnippet);
  const flippedCard = useShowcaseStore((state) => state.flippedCard);
  const setFlippedCard = useShowcaseStore((state) => state.setFlippedCard);

  const orderedStack = [0, 1, 2].map(
    (offset) => stackItems[(activeStack + offset) % stackItems.length],
  );

  const stackSlotClasses = [
    "z-30 translate-y-0 rotate-0 scale-100 opacity-100",
    "z-20 translate-y-5 rotate-1 scale-95 opacity-100",
    "z-10 translate-y-9 -rotate-1 scale-95 opacity-90",
  ];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let index = 0;
    const interval = window.setInterval(() => {
      index = (index + 1) % stackItems.length;
      setActiveStack(index);
    }, 1800);

    return () => {
      window.clearInterval(interval);
    };
  }, [setActiveStack]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let interval = 0;
    const startTimeout = window.setTimeout(() => {
      interval = window.setInterval(() => {
        const currentSnippet = useShowcaseStore.getState().activeSnippet;
        const currentIndex = snippetOrder.indexOf(currentSnippet);
        const nextSnippet =
          snippetOrder[(currentIndex + 1) % snippetOrder.length] ?? "next";
        setActiveSnippet(nextSnippet);
      }, 2800);
    }, 900);

    return () => {
      window.clearTimeout(startTimeout);
      if (interval) {
        window.clearInterval(interval);
      }
    };
  }, [setActiveSnippet]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const interval = window.setInterval(() => {
      setFlippedCard((flippedCard + 1) % flipCards.length);
    }, 2200);

    return () => {
      window.clearInterval(interval);
    };
  }, [flippedCard, setFlippedCard]);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) {
      return;
    }

    const cards = Array.from(
      root.querySelectorAll("[data-stack-card]"),
    ) as HTMLElement[];
    if (cards.length === 0) {
      return;
    }

    animate(cards, {
      opacity: [0, 1],
      translateY: [14, 0],
      stagger: 70,
      duration: 500,
      ease: "outCubic",
    });

    const gridItems = root.querySelectorAll("[data-matrix-grid-item]");
    animate(gridItems, {
      opacity: [0, 1],
      translateY: [18, 0],
      delay: 180,
      stagger: 85,
      duration: 380,
      ease: "outQuad",
    });

    const flipCardsNodes = root.querySelectorAll("[data-flip-card]");
    animate(flipCardsNodes, {
      opacity: [0, 1],
      scale: [0.96, 1],
      delay: 260,
      stagger: 90,
      duration: 360,
      ease: "outQuad",
    });
  }, []);

  useEffect(() => {
    if (!codeRef.current) {
      return;
    }

    const currentTab = activeSnippet;

    animate(codeRef.current, {
      opacity: [0.2, 1],
      translateY: [6, 0],
      duration: 320,
      ease: "outCubic",
    });

    const activeTab = sectionRef.current?.querySelector(
      `[data-snippet-tab='${currentTab}']`,
    );
    if (activeTab) {
      animate(activeTab, {
        scale: [0.98, 1],
        duration: 200,
        ease: "outQuad",
      });
    }

    const tabTargets =
      sectionRef.current?.querySelectorAll("[data-snippet-tab]");
    if (tabTargets) {
      animate(tabTargets, {
        opacity: [0.7, 1],
        translateY: [4, 0],
        stagger: 45,
        duration: 240,
        ease: "outQuad",
      });
    }
  }, [activeSnippet]);

  useEffect(() => {
    const primaryCard = sectionRef.current?.querySelector(
      "[data-stack-primary='true']",
    );
    if (!primaryCard) {
      return;
    }

    animate(primaryCard, {
      scale: [0.98, 1],
      translateY: [-2, 0],
      duration: 250 + activeStack * 4,
      ease: "outQuad",
    });
  }, [activeStack]);

  return (
    <section className="space-y-4" ref={sectionRef} data-anim="item">
      <h2 className="font-display text-3xl uppercase sm:text-4xl">
        <MatrixBinaryText text="Tech Stack & Approach" />
      </h2>

      <p className="font-pixel text-sm uppercase text-muted-foreground">
        <TypingRevealText text="Tools, workflow, and mindset I bring to every project." />
      </p>

      <div
        className="grid grid-cols-1 gap-4 lg:grid-cols-3"
        data-matrix-grid-item
      >
        <Card
          className="border-4 border-black bg-card shadow-retro-md lg:col-span-1"
          data-matrix-grid-item
        >
          <Card.Header>
            <Card.Title className="font-display text-2xl uppercase">
              My Approach
            </Card.Title>
          </Card.Header>
          <Card.Content className="relative h-48">
            {orderedStack.map((item, idx) => {
              return (
                <div
                  key={item.title}
                  data-stack-card
                  data-stack-primary={idx === 0 ? "true" : "false"}
                  className={`absolute inset-x-0 top-0 border-4 border-black bg-muted p-3 shadow-retro-sm transition-all duration-500 ${stackSlotClasses[idx]}`}
                >
                  <p className="font-display text-lg uppercase">{item.title}</p>
                  <p className="mt-2 text-sm font-bold leading-relaxed">
                    {item.body}
                  </p>
                </div>
              );
            })}
          </Card.Content>
        </Card>

        <Card
          className="border-4 border-black bg-card shadow-retro-md lg:col-span-2"
          data-matrix-grid-item
        >
          <Card.Header>
            <Card.Title className="font-display text-2xl uppercase">
              Frameworks & Languages I Use
            </Card.Title>
            <Card.Description className="font-bold uppercase">
              Tools and technologies I use to build modern web applications.
            </Card.Description>
          </Card.Header>
          <Card.Content className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={activeSnippet === "next" ? "default" : "secondary"}
                className="border-4 border-black uppercase"
                onClick={() => setActiveSnippet("next")}
                data-snippet-tab="next"
              >
                Frontend
              </Button>
              <Button
                variant={activeSnippet === "query" ? "default" : "secondary"}
                className="border-4 border-black uppercase"
                onClick={() => setActiveSnippet("query")}
                data-snippet-tab="query"
              >
                Backend
              </Button>
              <Button
                variant={activeSnippet === "store" ? "default" : "secondary"}
                className="border-4 border-black uppercase"
                onClick={() => setActiveSnippet("store")}
                data-snippet-tab="store"
              >
                Tools
              </Button>
            </div>

            <div
              ref={codeRef}
              className="border-4 border-black bg-black p-4 text-[#7BFF6A] shadow-retro-sm"
            >
              <pre className="overflow-x-auto text-xs leading-relaxed sm:text-sm">
                <code>{snippets[activeSnippet]}</code>
              </pre>
            </div>
          </Card.Content>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {flipCards.map((item, index) => {
          const isFlipped = flippedCard === index;

          return (
            <button
              key={item.front}
              type="button"
              onClick={() => setFlippedCard(index)}
              className="group retro-flip-perspective h-40"
              data-flip-card
            >
              <div
                className={`retro-flip-inner relative h-full w-full border-4 border-black shadow-retro-md ${isFlipped ? "is-flipped" : ""}`}
              >
                <div className="retro-flip-face absolute inset-0 flex items-center justify-center bg-primary p-4">
                  <p className="font-display text-2xl uppercase text-primary-foreground">
                    {item.front}
                  </p>
                </div>
                <div className="retro-flip-face retro-flip-back absolute inset-0 flex items-center justify-center bg-secondary p-4">
                  <p className="text-center font-black leading-relaxed">
                    {item.back}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
