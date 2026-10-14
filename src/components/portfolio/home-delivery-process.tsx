"use client";

import { Card } from "@/components/retroui/Card";

const processSteps = [
  {
    title: "UNDERSTAND",
    description:
      "Break down the problem, research references, and understand the goal before writing a single line of code.",
  },
  {
    title: "Build",
    description:
      "Develop features step by step, focusing on clean structure and readable code over quick fixes.",
  },
  {
    title: "TEST & REFINE",
    description:
      "Check functionality, fix bugs, and polish the UI/UX until it feels smooth and reliable.",
  },
  {
    title: "REFLECT & IMPROVE",
    description:
      "Review what worked, learn from mistakes, and carry those lessons into the next project.",
  },
] as const;

export function HomeDeliveryProcess() {
  return (
    <section className="space-y-4">
      <h2 className="font-display text-3xl uppercase sm:text-4xl">
        HOW I LEARN & BUILD
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((step, index) => (
          <Card
            key={step.title}
            className="h-full border-4 border-black bg-card shadow-retro-md"
          >
            <Card.Header>
              <p className="retro-badge w-max text-[10px] sm:text-xs">
                Step {index + 1}
              </p>
              <Card.Title className="mt-2 font-display text-2xl uppercase">
                {step.title}
              </Card.Title>
            </Card.Header>
            <Card.Content>
              <p className="font-medium leading-relaxed">{step.description}</p>
            </Card.Content>
          </Card>
        ))}
      </div>
    </section>
  );
}
