"use client";

import Link from "next/link";
import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";

const models = [
  {
    title: "Frontend Development Role",
    summary:
      "Building interfaces and user experiences with modern frameworks like React and Next.js.",
    bullets: [
      "Clean, component-based UI",
      "Responsive design across devices",
      "Collaborative code reviews",
    ],
  },
  {
    title: "Full-Stack Opportunities",
    summary:
      "Contributing across the stack, from database design to client-facing features.",
    bullets: [
      "End-to-end feature development",
      "API integration and testing",
      "Continuous learning on the job",
    ],
  },
  {
    title: "Internship or Junior Role",
    summary:
      "Open to mentorship-driven environments where I can grow while contributing real value to the team.",
    bullets: [
      "Fast learner, low ego",
      "Comfortable receiving feedback",
      "Reliable and consistent output",
    ],
  },
] as const;

export function HomeEngagementModel() {
  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-display text-3xl uppercase sm:text-4xl">
          WHAT I&apos;M LOOKING FOR
        </h2>
        <Button
          asChild
          variant="secondary"
          className="w-full sm:w-auto uppercase"
        >
          <Link href="/contact">LET&apos;S CONNECT</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {models.map((model) => (
          <Card
            key={model.title}
            className="h-full border-4 border-black bg-card shadow-retro-md"
          >
            <Card.Header>
              <Card.Title className="font-display text-2xl uppercase">
                {model.title}
              </Card.Title>
              <Card.Description className="text-sm leading-relaxed sm:text-base">
                {model.summary}
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <ul className="space-y-2">
                {model.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="border-l-4 border-black pl-3 text-sm font-medium leading-relaxed"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </Card.Content>
          </Card>
        ))}
      </div>
    </section>
  );
}
