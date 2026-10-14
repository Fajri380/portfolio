"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
// Hero section components — loaded eagerly (above the fold, must render immediately)
import { HeroFloatingBadges } from "@/components/portfolio/hero-floating-badges";
import { HyperNameReveal } from "@/components/portfolio/hyper-name-reveal";
import { StatsMarquee } from "@/components/portfolio/stats-marquee";
import { BentoCard, BentoGrid } from "@/components/retroui/Bento";
import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { Github, Linkedin, Twitter } from "@/components/retroui/icons";
import avaterimg from "../../../public/wmremove-transformed.jpeg";

// Below-the-fold components — lazy loaded for performance

const GithubOverviewBento = dynamic(
  () =>
    import("@/components/portfolio/github-overview-bento").then(
      (m) => m.GithubOverviewBento,
    ),
  { ssr: false },
);
const HomeDeliveryProcess = dynamic(
  () =>
    import("@/components/portfolio/home-delivery-process").then(
      (m) => m.HomeDeliveryProcess,
    ),
  { ssr: false },
);
const HomeEngagementModel = dynamic(
  () =>
    import("@/components/portfolio/home-engagement-model").then(
      (m) => m.HomeEngagementModel,
    ),
  { ssr: false },
);
const MorphScrollShowcase = dynamic(
  () =>
    import("@/components/portfolio/morph-scroll-showcase").then(
      (m) => m.MorphScrollShowcase,
    ),
  { ssr: false },
);
const ProjectsGrid = dynamic(
  () =>
    import("@/components/portfolio/projects-grid").then((m) => m.ProjectsGrid),
  { ssr: false },
);
const RetroCodeShowcase = dynamic(
  () =>
    import("@/components/portfolio/retro-code-showcase").then(
      (m) => m.RetroCodeShowcase,
    ),
  { ssr: false },
);
const RetroTerminalSection = dynamic(
  () =>
    import("@/components/portfolio/retro-terminal-section").then(
      (m) => m.RetroTerminalSection,
    ),
  { ssr: false },
);

import { links } from "@/lib/link-items";
import type {
  BlogPost,
  GitHubOverviewPayload,
  GithubRepo,
  HackatimePayload,
} from "@/lib/portfolio-types";
import {
  githubUrl,
  linkedinUrl,
  siteHost,
  xUrl,
} from "@/lib/site-config";
import { useHomeStore } from "@/store/home-store";

const traits = [
  {
    title: "Curious & Self-Taught",
    text: "I learn through building — exploring new tools, frameworks, and concepts on my own to keep growing as a developer.",
  },
  {
    title: "Detail-Oriented Coder",
    text: "I pay close attention to clean structure, readable code, and consistent design when building any project.",
  },
  {
    title: "Consistent & Disciplined",
    text: "I stay consistent with learning and building, turning small daily progress into real, working projects over time.",
  },
  {
    title: "Full-Stack Foundation",
    text: "I have hands-on experience across frontend and backend, building complete features from UI to database.",
  },
];

const focusFilters = [
  "All",
  "FRONTEND",
  "BACKEND",
  "PROJECTS",
  "LEARNING",
] as const;

type FaqItem = {
  question: string;
  answer: string;
  ctaHref?: string;
  ctaLabel?: string;
};

const faqItems: readonly FaqItem[] = [
  {
    question: "What kind of role are you looking for?",
    answer:
      "I'm open to full-time roles, internships, or entry-level positions in web development, especially frontend or full-stack roles where I can learn and contribute.",
  },
  {
    question: "What is your tech stack?",
    answer:
      "I work primarily with Next.js, React, and Tailwind CSS on the frontend, and I'm comfortable with Node.js and databases like MongoDB or PostgreSQL on the backend.",
  },
  {
    question: "Do you have any real project experience?",
    answer:
      "I've built several personal and academic projects covering full-stack development, from UI design to backend logic and deployment. You can check them in the Projects section.",
  },
  {
    question: "Are you open to remote work?",
    answer:
      "Yes, I'm open to remote, hybrid, or on-site opportunities, depending on the role and team.",
  },
  {
    question: "What are you currently learning?",
    answer:
      "I'm currently deepening my knowledge in backend development, system design, and exploring practical use cases for AI in web applications.",
  },
  {
    question: "How can we contact you?",
    answer:
      "You can reach me directly by email or connect with me on LinkedIn for job opportunities, collaboration, or a quick chat.",
    ctaHref: "mailto:fajriramadhan8998@gmail.com",
    ctaLabel: "Email Now",
  },
  {
    question: "Do you take freelance or small projects?",
    answer:
      "Yes, I'm open to small freelance projects as a way to keep building experience while looking for full-time opportunities.",
  },
] as const;

type HomePageClientProps = {
  initialRepos?: GithubRepo[];
  initialPosts?: BlogPost[];
  initialHackatime?: HackatimePayload | null;
  initialGitHubOverview?: GitHubOverviewPayload | null;
};

export function HomePageClient({
  initialRepos,
  initialPosts,
  initialGitHubOverview,
}: HomePageClientProps) {
  const githubOverview = initialGitHubOverview ?? null;
  const focus = useHomeStore((state) => state.focus);
  const setFocus = useHomeStore((state) => state.setFocus);

  const focusItems = [
    {
      key: "FRONTEND",
      title: "Frontend Development",
      body: "I build responsive, accessible interfaces using React, Next.js, and Tailwind CSS, focusing on clean UI and smooth user experience.",
    },
    {
      key: "BACKEND",
      title: "Backend & API Development",
      body: "I build backend logic, REST APIs, and database structures to support functional, well-organized applications.",
    },
    {
      key: "PROJECTS",
      title: "Personal Projects & Practice",
      body: "I regularly build small projects to practice new concepts, fix bugs, and strengthen my understanding of full-stack development.",
    },
    {
      key: "LEARNING",
      title: "AI & Automation (Learning)",
      body: "I'm exploring practical AI integrations and automation tools like APIs and workflow scripts to solve real, small-scale problems.",
    },
  ] as const;

  const visibleFocusItems =
    focus === "All"
      ? focusItems
      : focusItems.filter((item) => item.key === focus);

  return (
    <div className="-mt-3 space-y-8 pb-16 sm:mt-0 sm:space-y-14">
      <StatsMarquee />

      <section
        className="relative overflow-visible border-4 border-black bg-card shadow-retro-lg"
        data-home-reveal
      >
        <div
          aria-hidden
          className="retro-stripes pointer-events-none absolute inset-0 opacity-20"
        />
        <div className="hidden sm:block">
          <HeroFloatingBadges />
        </div>

        <div className="relative z-10 overflow-hidden border-4 border-black bg-card">
          <div className="flex items-center justify-between border-b-4 border-black bg-[#d7d7d7] px-2 py-2 text-black sm:px-3 dark:bg-[#2f2f2f] dark:text-white">
            <p className="font-pixel text-[11px] font-black sm:text-xs">
              {siteHost}
            </p>
            <div className="flex gap-2">
              <span className="inline-flex h-5 w-5 items-center justify-center border-2 border-black bg-[#ffd146] text-[#5c3d00] font-black text-[10px] shadow-retro-sm sm:h-6 sm:w-6 sm:text-xs">
                -
              </span>
              <span className="inline-flex h-5 w-5 items-center justify-center border-2 border-black bg-[#52d46b] text-[#0d4f1a] font-black text-[10px] shadow-retro-sm sm:h-6 sm:w-6 sm:text-xs">
                +
              </span>
              <span className="inline-flex h-5 w-5 items-center justify-center border-2 border-black bg-[#ff6e6e] text-[#6b1010] font-black text-[10px] shadow-retro-sm sm:h-6 sm:w-6 sm:text-xs">
                x
              </span>
            </div>
          </div>

          <div className="grid gap-4 p-2 sm:gap-6 sm:p-5 md:grid-cols-[1.2fr_0.8fr] md:gap-8 md:p-10">
            <div className="order-2 space-y-4 md:order-1 md:space-y-6">
              <h1 className="font-display uppercase leading-[1.1]">
                <span className="block text-[clamp(0.95rem,6vw,2.5rem)] sm:text-[clamp(1.7rem,5.2vw,3.8rem)]">
                  Hey There! I&apos;M
                </span>
                <span className="mt-1 block text-[clamp(1.05rem,8vw,3rem)] sm:text-[clamp(1.8rem,5.6vw,4.4rem)]">
                  <span className="retro-curve-underline">
                    <HyperNameReveal text="Fajri Ramadhan." />
                  </span>
                </span>
              </h1>
              <p className="max-w-2xl border-l-4 border-black pl-3 text-xs font-medium leading-relaxed sm:pl-4 sm:text-sm md:text-lg">
                I&apos;m a fresh graduate passionate about web development. I build clean, responsive web applications with modern tools like Next.js and React, and I&apos;m eager to learn, grow, and contribute to real-world projects.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  asChild
                  className="w-full border-4 border-black px-4 py-2 text-sm font-black uppercase tracking-wide shadow-retro retro-press sm:w-auto sm:px-6 sm:py-3 sm:text-base"
                >
                  <Link href="mailto:contact@muhammadfiaz.com">Contact Me</Link>
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  asChild
                  className="w-full border-4 border-black px-4 py-2 text-sm font-black uppercase tracking-wide shadow-retro retro-press sm:w-auto sm:px-6 sm:py-3 sm:text-base"
                >
                  <Link href="/project">View Projects</Link>
                </Button>
              </div>
            </div>

            <div className="order-1 mx-auto w-full max-w-56 border-4 border-black bg-primary p-2 shadow-retro-md sm:max-w-xs sm:p-3 md:order-2 md:max-w-sm">
              <div className="border-4 border-black bg-card p-0">
                <Image
                  src={avaterimg}
                  alt="Fajri Ramadhan"
                  width={384}
                  height={384}
                  loading="eager"
                  priority
                  fetchPriority="high"
                  quality={65}
                  sizes="(max-width: 640px) 224px, (max-width: 768px) 320px, 384px"
                  className="block h-full w-full object-cover"
                />
              </div>
              <div className="mt-3 flex items-center justify-center gap-3">
                <Link
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="retro-social-icon"
                  aria-label="GitHub profile"
                >
                  <Github className="h-4 w-4" />
                </Link>
                <Link
                  href={linkedinUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="retro-social-icon"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4" data-home-reveal>
        <h2 className="font-display text-3xl uppercase sm:text-4xl">
          Mission Control
        </h2>
        <BentoGrid>
          <BentoCard className="min-h-48 h-full sm:col-span-1 lg:col-span-2">
            <p className="font-display text-xl uppercase sm:text-2xl">
              Full-Stack Development Skills
            </p>
            <p className="mt-3 font-medium leading-relaxed">
              I build web applications from front to back, using modern tools like Next.js, React, and Tailwind to turn ideas into working products.
            </p>
          </BentoCard>
          <BentoCard className="min-h-48 h-full sm:col-span-1 lg:col-span-2">
            <p className="font-display text-xl uppercase">
              Fast Learner, Fast Adapter
            </p>
            <p className="mt-2 text-sm font-medium">
              I pick up new technologies quickly and adapt to different stacks, frameworks, and tools as projects require.
            </p>
          </BentoCard>
          <BentoCard className="min-h-48 h-full sm:col-span-1 lg:col-span-2">
            <p className="font-display text-xl uppercase">
              Clean Code and Best Practices
            </p>
            <p className="mt-2 text-sm font-medium">
              I write structured, readable code and follow modern development practices to keep projects maintainable and scalable.
            </p>
          </BentoCard>
          <BentoCard className="min-h-48 h-full sm:col-span-1 lg:col-span-2">
            <p className="font-display text-xl uppercase">
              Problem Solving and Debugging
            </p>
            <p className="mt-2 text-sm font-medium">
              I enjoy breaking down complex problems, debugging issues, and finding practical solutions through hands-on experimentation.
            </p>
          </BentoCard>
          <BentoCard className="min-h-48 h-full sm:col-span-1 lg:col-span-2">
            <p className="font-display text-xl uppercase">
              UI/UX Attention to Detail
            </p>
            <p className="mt-2 text-sm font-medium">
              I care about clean, responsive design and smooth user experience, making sure every interface feels intuitive and polished.
            </p>
          </BentoCard>
          <BentoCard className="min-h-48 h-full sm:col-span-1 lg:col-span-2">
            <p className="font-display text-xl uppercase">
              Growth Mindset and Collaboration
            </p>
            <p className="mt-2 text-sm font-medium">
              I&apos;m eager to learn from teams, take feedback well, and grow my skills through real-world projects and challenges.
            </p>
          </BentoCard>
        </BentoGrid>
      </section>

      <section className="space-y-4" data-home-reveal>
        <h2 className="font-display text-3xl uppercase sm:text-4xl">
          Core Traits
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {traits.map((trait) => (
            <Card
              key={trait.title}
              className="w-full border-4 border-black bg-card shadow-retro-md retro-press"
            >
              <Card.Header>
                <Card.Title className="font-display text-2xl uppercase">
                  {trait.title}
                </Card.Title>
              </Card.Header>
              <Card.Content>
                <p className="font-medium leading-relaxed">{trait.text}</p>
              </Card.Content>
            </Card>
          ))}
        </div>
      </section>

      <div data-home-reveal>
        <HomeDeliveryProcess />
      </div>

      <section className="space-y-4" data-home-reveal>
        <div className="flex flex-wrap items-center gap-2">
          {focusFilters.map((item) => (
            <Button
              key={item}
              variant={focus === item ? "default" : "secondary"}
              onClick={() => setFocus(item)}
              className="border-4 border-black shadow-retro-sm uppercase"
            >
              {item}
            </Button>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {visibleFocusItems.map((item) => (
            <Card
              key={item.key}
              className="border-4 border-black bg-card shadow-retro-md"
            >
              <Card.Header>
                <Card.Title className="font-display text-xl uppercase">
                  {item.title}
                </Card.Title>
              </Card.Header>
              <Card.Content>
                <p className="font-medium leading-relaxed">{item.body}</p>
              </Card.Content>
            </Card>
          ))}
        </div>
      </section>

      <div data-home-reveal>
        <HomeEngagementModel />
      </div>

      <section className="space-y-4" data-home-reveal>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-display text-3xl uppercase sm:text-4xl">
            Featured Projects
          </h2>
          <Button
            asChild
            variant="secondary"
            className="w-full sm:w-auto uppercase"
          >
            <Link href="/project">View All</Link>
          </Button>
        </div>
        <ProjectsGrid compact limit={3} initialRepos={initialRepos} />
      </section>

      <section className="space-y-4" data-home-reveal>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-display text-3xl uppercase sm:text-4xl">
            Github Stats
          </h2>
          <Button
            asChild
            variant="secondary"
            className="w-full border-4 border-black shadow-retro-sm sm:w-auto uppercase"
          >
            <Link href={githubUrl} target="_blank" rel="noreferrer noopener">
              View Full GitHub Profile
            </Link>
          </Button>
        </div>
        <p className="font-bold uppercase text-muted-foreground">
          Followers, following, stars, forks, watchers, repositories, and GitHub
          activity analytics.
        </p>
        <GithubOverviewBento stats={githubOverview ?? null} />
      </section>

      <section className="space-y-4" data-home-reveal>
        <h2 className="font-display text-3xl uppercase sm:text-4xl">
          Highlights
        </h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {[
            {
              quote:
                "Built and deployed full-stack web applications from scratch.",
              by: "3+ Personal Projects",
            },
            {
              quote:
                "Completed multiple courses in modern web development.",
              by: "Active Learner",
            },
            {
              quote:
                "Collaborated in a team to build and pitch a working prototype.",
              by: "Hackathon Participant",
            },
          ].map((item) => (
            <Card
              key={item.by}
              className="flex h-full w-full flex-col border-4 border-black bg-card shadow-retro-md retro-press"
            >
              <Card.Content className="flex h-full min-h-44 flex-col gap-4">
                <p className="text-lg font-bold leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <p className="mt-auto text-sm font-black uppercase text-muted-foreground">
                  {item.by}
                </p>
              </Card.Content>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4" data-home-reveal>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-display text-3xl uppercase sm:text-4xl">
            Connect Hub
          </h2>
          
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {links.slice(0, 9).map((item) => (
            <Card
              key={item.href}
              className="flex h-full w-full flex-col border-4 border-black bg-card shadow-retro-md retro-press"
            >
              <Card.Header className="min-h-36 flex-1">
                <Card.Title className="font-display text-xl uppercase">
                  {item.name}
                </Card.Title>
                <Card.Description className="mt-2 text-base leading-relaxed">
                  {item.description}
                </Card.Description>
              </Card.Header>
              <Card.Content className="pt-0">
                <Button
                  asChild
                  className="w-full border-4 border-black shadow-retro-sm uppercase"
                >
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Open View
                  </Link>
                </Button>
              </Card.Content>
            </Card>
          ))}
        </div>
      </section>

      <section
        className="border-4 border-black bg-primary p-6 shadow-retro-lg sm:p-8 md:p-10"
        data-home-reveal
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3">
            <h2 className="font-display text-3xl uppercase text-primary-foreground sm:text-4xl md:text-5xl">
              Let&apos;s Connect
            </h2>
            <p className="max-w-xl text-sm font-medium leading-relaxed text-primary-foreground/90 sm:text-base">
              Open for full-time roles, internships, or freelance collaborations. If you&apos;re looking for an enthusiastic Informatics graduate ready to contribute, drop me a line and let&apos;s talk!
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              asChild
              className="w-full border-4 border-black bg-card text-card-foreground px-6 py-3 font-black uppercase shadow-retro retro-press sm:w-auto"
            >
              <Link href="/contact">Contact Me</Link>
            </Button>
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="w-full border-4 border-black px-6 py-3 font-black uppercase shadow-retro retro-press sm:w-auto"
            >
              <Link
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                LinkedIn
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-4" data-home-reveal>
        <h2 className="font-display text-3xl uppercase sm:text-4xl">FAQ</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {faqItems.map((item) => (
            <Card
              key={item.question}
              className="flex h-full w-full flex-col border-4 border-black bg-card shadow-retro-md retro-press"
            >
              <Card.Header>
                <Card.Title className="font-display text-xl uppercase">
                  {item.question}
                </Card.Title>
              </Card.Header>
              <Card.Content className="flex flex-1 flex-col gap-3">
                <p className="font-medium leading-relaxed">{item.answer}</p>
                {item.ctaHref && item.ctaLabel ? (
                  <Button
                    asChild
                    className="mt-auto w-full border-4 border-black shadow-retro-sm sm:w-auto uppercase"
                  >
                    <Link href={item.ctaHref}>{item.ctaLabel}</Link>
                  </Button>
                ) : null}
              </Card.Content>
            </Card>
          ))}
        </div>
      </section>

      <div data-home-reveal>
        <MorphScrollShowcase />
      </div>

      <div data-home-reveal>
        <RetroCodeShowcase />
      </div>

      <div data-home-reveal>
        <RetroTerminalSection />
      </div>
    </div>
  );
}
