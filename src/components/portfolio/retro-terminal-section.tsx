"use client";

import { animate } from "animejs";
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/retroui/Card";
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/retroui/terminal";

const stepLines: Array<{
  kind: "type" | "line";
  text: string;
  className?: string;
}> = [
  { kind: "type", text: "C:\\dev> whoami.exe", className: "text-[#64cbff]" },
  {
    kind: "line",
    text: "# Loading developer profile...",
    className: "text-[#ffc96b]",
  },
  {
    kind: "type",
    text: "$ git status",
    className: "text-[#64cbff]",
  },
  {
    kind: "line",
    text: "On branch main, ready to push.",
    className: "text-[#84ff6f]",
  },
  {
    kind: "type",
    text: "$ git push origin main",
    className: "text-[#64cbff]",
  },
  {
    kind: "line",
    text: "✔ Pushed to GitHub successfully.",
    className: "text-[#84ff6f]",
  },
  {
    kind: "line",
    text: "# Vercel deployment triggered automatically.",
    className: "text-[#ffc96b]",
  },
  { kind: "type", text: "$ vercel --prod", className: "text-[#64cbff]" },
  {
    kind: "line",
    text: "✔ Build completed with no errors.",
    className: "text-[#84ff6f]",
  },
  {
    kind: "line",
    text: "✔ Deployment live at fajriramadhan.com",
    className: "text-[#84ff6f]",
  },
  {
    kind: "line",
    text: "# Running a quick performance check.",
    className: "text-[#ffc96b]",
  },
  {
    kind: "line",
    text: "ℹ Stack: Next.js, React, Tailwind CSS, TypeScript",
    className: "text-[#64cbff]",
  },
  {
    kind: "line",
    text: "# Still learning CI/CD and cloud fundamentals.",
    className: "text-[#ffc96b]",
  },
  {
    kind: "line",
    text: "✔ Success: another project shipped and learned from.",
    className: "text-[#84ff6f]",
  },
  {
    kind: "line",
    text: "Next: let's connect and build something together.",
    className: "text-[#ffc96b]",
  },
];

type LogEntry = {
  id: number;
  item: (typeof stepLines)[number];
};

export function RetroTerminalSection() {
  const [entries, setEntries] = useState<LogEntry[]>([]);
  const [hasStarted, setHasStarted] = useState(false);
  const indexRef = useRef(0);
  const idRef = useRef(0);
  const bodyRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || hasStarted) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, [hasStarted]);

  useEffect(() => {
  if (!hasStarted) {
    return;
  }

  indexRef.current = 1;
  idRef.current = 1;

  const initialTimeout = window.setTimeout(() => {
    const firstLine = stepLines[0];
    if (firstLine) {
      setEntries([{ id: 0, item: firstLine }]);
    }
  }, 0);

  intervalRef.current = window.setInterval(() => {
    setEntries((prev) => {
      if (indexRef.current >= stepLines.length) {
        if (intervalRef.current !== null) {
          window.clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        return prev;
      }

      const line = stepLines[indexRef.current];
      if (!line) {
        return prev;
      }

      const lastLine = prev.at(-1)?.item.text;
      if (lastLine === line.text) {
        indexRef.current += 1;
        return prev;
      }

      const next: LogEntry = { id: idRef.current, item: line };
      idRef.current += 1;
      const appended = [...prev, next];
      return appended.length > 24
        ? appended.slice(appended.length - 24)
        : appended;
    });
    indexRef.current += 1;
  }, 760);

  return () => {
    window.clearTimeout(initialTimeout);
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
    }
  };
}, [hasStarted]);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) {
      return;
    }

    const supportCards = root.querySelectorAll("[data-support-card]");
    animate(supportCards, {
      opacity: [0, 1],
      translateY: [12, 0],
      stagger: 75,
      duration: 300,
      ease: "outQuad",
    });
  }, []);

  useEffect(() => {
    if (entries.length === 0) {
      return;
    }

    const node = bodyRef.current;
    if (!node) {
      return;
    }

    node.scrollTo({ top: node.scrollHeight, behavior: "smooth" });
  }, [entries]);

  return (
    <section ref={sectionRef} className="space-y-4" data-anim="item">
      <h2 className="font-display text-3xl uppercase sm:text-4xl">
      How I Ship My Projects
    </h2>

    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Card className="border-4 border-black bg-card shadow-retro-md">
        <Card.Header>
          <Card.Title className="font-display text-2xl uppercase">
            Simple, Modern Deployment
          </Card.Title>
        </Card.Header>
        <Card.Content className="space-y-3">
          <p className="font-medium leading-relaxed">
            I deploy my projects using modern platforms like Vercel and GitHub,
            keeping the workflow simple, fast, and easy to maintain.
          </p>
          <p className="font-medium leading-relaxed">
            I&apos;m continuously learning about CI/CD, environment configuration,
            and best practices for building reliable web applications.
          </p>
          <p className="font-medium leading-relaxed">
            Every deployment is a chance to learn — from fixing build errors to
            understanding how things work behind the scenes.
          </p>
        </Card.Content>
      </Card>

      <Terminal
        className="h-[22rem] md:h-[24rem]"
        bodyRef={bodyRef}
        bodyClassName="retro-terminal-scrollbar pr-3"
      >
        {entries.map((entry) =>
          entry.item.kind === "type" ? (
            <TypingAnimation key={entry.id} className={entry.item.className}>
              {entry.item.text}
            </TypingAnimation>
          ) : (
            <AnimatedSpan key={entry.id} className={entry.item.className}>
              {entry.item.text}
            </AnimatedSpan>
          ),
        )}
      </Terminal>
    </div>

      <h3 className="font-display text-2xl uppercase sm:text-3xl">
        What I Bring
      </h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Card
          className="flex h-full flex-col border-4 border-black bg-card shadow-retro-md"
          data-support-card
        >
          <Card.Header>
            <Card.Title className="font-display text-xl uppercase">
              Willingness to Learn
            </Card.Title>
          </Card.Header>
          <Card.Content className="flex-1">
            <p className="font-medium leading-relaxed">
              I pick up new tools and concepts quickly, and I&apos;m not afraid to dive
              into something unfamiliar.
            </p>
          </Card.Content>
        </Card>
        <Card
          className="flex h-full flex-col border-4 border-black bg-card shadow-retro-md"
          data-support-card
        >
          <Card.Header>
            <Card.Title className="font-display text-xl uppercase">
              Honest Communication
            </Card.Title>
          </Card.Header>
          <Card.Content className="flex-1">
            <p className="font-medium leading-relaxed">
              I communicate clearly about progress, blockers, and what I still
              need to learn.
            </p>
          </Card.Content>
        </Card>
        <Card
          className="flex h-full flex-col border-4 border-black bg-card shadow-retro-md sm:col-span-2 xl:col-span-1"
          data-support-card
        >
          <Card.Header>
            <Card.Title className="font-display text-xl uppercase">
              Consistent Effort
            </Card.Title>
          </Card.Header>
          <Card.Content className="flex-1">
            <p className="font-medium leading-relaxed">
              I show up, build steadily, and keep improving with every project I
              take on.
            </p>
          </Card.Content>
        </Card>
      </div>
    </section>
  );
}
