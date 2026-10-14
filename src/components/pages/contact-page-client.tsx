"use client";

import { animate } from "animejs";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ContactForm } from "@/components/portfolio/contact-form";
import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import {
  Github,
  Linkedin,
  Mail,
  Rocket,
  Users,
} from "@/components/retroui/icons";
import { githubUrl, linkedinUrl } from "@/lib/site-config";

const contactFaqItems = [
  {
    question: "What roles are you looking for?",
    answer:
      "I am looking for Frontend / Full-Stack Developer roles. I am open to full-time positions as well as internships and entry-level opportunities.",
  },
  {
    question: "Are you open to relocation or remote work?",
    answer:
      "Yes! I am fully available for Remote, Hybrid, or Onsite roles (Based in Jakarta, GMT+7).",
  },
  {
    question: "How fast do you reply?",
    answer:
      "I usually respond within 1-2 business days via email.",
  },
  {
    question: "Can I see your work?",
    answer:
      "Absolutely. You can explore my featured work on the Projects page or inspect my code repositories directly on GitHub.",
  },
] as const;

export function ContactPageClient() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = pageRef.current;
    if (!root) {
      return;
    }

    const sections = root.querySelectorAll("[data-contact-reveal]");
    animate(sections, {
      opacity: [0, 1],
      translateY: [16, 0],
      stagger: 80,
      duration: 300,
      ease: "outQuad",
    });
  }, []);

  return (
    <div ref={pageRef} className="space-y-6 pb-16">
      <section
        className="border-4 border-black bg-card p-4 shadow-retro-lg sm:p-6 md:p-8"
        data-contact-reveal
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="font-pixel text-3xl uppercase sm:text-4xl md:text-5xl">
            Let&apos;s Talk
          </h1>
          <span className="inline-flex items-center gap-2 w-fit px-3 py-1.5 bg-emerald-400 text-black font-black uppercase text-xs sm:text-sm border-2 border-black rotate-[-1deg] shadow-retro-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-700 animate-pulse" />
            Open to work: Full-time, Internship, Freelance
          </span>
        </div>
        <p className="mt-4 max-w-2xl text-sm font-medium leading-relaxed sm:text-base">
          I&apos;m a fresh graduate looking for my first role as a Frontend / Full-Stack Developer. Send me a message and I&apos;ll reply within 1-2 days.
        </p>
        <p className="mt-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          📍 Based in Jakarta, GMT+7
        </p>
      </section>

      <section
        className="grid grid-cols-1 gap-4 md:grid-cols-3"
        data-contact-reveal
      >
        {[
          {
            icon: Mail,
            title: "Portfolio-Ready",
            description:
              "Yes! I am open to Remote, Hybrid, or Onsite roles. Based in Jakarta (GMT+7), and open to relocation for the right opportunity.",
          },
          {
            icon: Users,
            title: "Open to Opportunities",
            description:
              "Available for full-time, internship, freelance, remote or onsite roles.",
          },
          {
            icon: Rocket,
            title: "Eager to Learn",
            description:
              "Ready to learn new tech stacks and adapt to team workflows quickly.",
          },
        ].map((item) => (
          <Card
            key={item.title}
            className="border-4 border-black bg-card shadow-retro-md"
          >
            <Card.Content className="space-y-3 p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="border-2 border-black bg-primary p-2 text-primary-foreground shadow-retro-sm">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg uppercase">{item.title}</h3>
              </div>
              <p className="text-sm font-medium leading-relaxed">
                {item.description}
              </p>
            </Card.Content>
          </Card>
        ))}
      </section>

      <section
        className="border-4 border-black bg-card p-4 shadow-retro-lg sm:p-6 md:p-8"
        data-contact-reveal
      >
        <h2 className="mb-4 font-display text-2xl uppercase sm:text-3xl">
          Send a Message
        </h2>
        <ContactForm />
      </section>

      <section className="space-y-4" data-contact-reveal>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-display text-3xl uppercase sm:text-4xl">
            Direct Channels
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <Card className="border-4 border-black bg-card shadow-retro-md">
            <Card.Header className="pb-2">
              <Card.Title className="font-display text-xl uppercase flex items-center gap-2">
                <Mail className="h-5 w-5" /> Email
              </Card.Title>
            </Card.Header>
            <Card.Content className="space-y-3">
              <p className="text-sm font-medium leading-relaxed">
                Fastest channel for recruiter outreach & inquiries.
              </p>
              <Button
                asChild
                className="w-full border-4 border-black shadow-retro-sm uppercase"
              >
                <Link
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=fajriramadhan8998@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer">
                  Email Me
                  </Link>
              </Button>
            </Card.Content>
          </Card>

          <Card className="border-4 border-black bg-card shadow-retro-md">
            <Card.Header className="pb-2">
              <Card.Title className="font-display text-xl uppercase flex items-center gap-2">
                <Linkedin className="h-5 w-5" /> LinkedIn
              </Card.Title>
            </Card.Header>
            <Card.Content className="space-y-3">
              <p className="text-sm font-medium leading-relaxed">
                Connect for professional networking & job offers.
              </p>
              <Button
                asChild
                variant="secondary"
                className="w-full border-4 border-black shadow-retro-sm uppercase"
              >
                <Link
                  href={linkedinUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  LinkedIn
                </Link>
              </Button>
            </Card.Content>
          </Card>

          <Card className="border-4 border-black bg-card shadow-retro-md">
            <Card.Header className="pb-2">
              <Card.Title className="font-display text-xl uppercase flex items-center gap-2">
                <Github className="h-5 w-5" /> GitHub
              </Card.Title>
            </Card.Header>
            <Card.Content className="space-y-3">
              <p className="text-sm font-medium leading-relaxed">
                Check code repositories & active project commits.
              </p>
              <Button
                asChild
                variant="secondary"
                className="w-full border-4 border-black shadow-retro-sm uppercase"
              >
                <Link
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  GitHub
                </Link>
              </Button>
            </Card.Content>
          </Card>

          {/* <Card className="border-4 border-black bg-card shadow-retro-md">
            <Card.Header className="pb-2">
              <Card.Title className="font-display text-xl uppercase flex items-center gap-2">
                <Download className="h-5 w-5" /> Resume / CV
              </Card.Title>
            </Card.Header>
            <Card.Content className="space-y-3">
              <p className="text-sm font-medium leading-relaxed">
                Download latest resume for recruiter review.
              </p>
              <Button
                asChild
                className="w-full border-4 border-black shadow-retro-sm uppercase bg-emerald-400 text-black hover:bg-emerald-500"
              >
                <Link
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Download CV
                </Link>
              </Button>
            </Card.Content>
          </Card> */}
        </div>
      </section>

      <section className="space-y-4" data-contact-reveal>
        <h2 className="font-display text-3xl uppercase sm:text-4xl">
          Contact FAQ
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {contactFaqItems.map((item) => (
            <Card
              key={item.question}
              className="border-4 border-black bg-card shadow-retro-md"
            >
              <Card.Header>
                <Card.Title className="font-display text-xl uppercase">
                  {item.question}
                </Card.Title>
              </Card.Header>
              <Card.Content>
                <p className="font-medium leading-relaxed">{item.answer}</p>
              </Card.Content>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
