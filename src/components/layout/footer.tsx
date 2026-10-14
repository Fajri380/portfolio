"use client";

import { animate } from "animejs";
import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  Github,
  Link2,
  Linkedin,
  Twitter,
  Youtube,
} from "@/components/retroui/icons";
import {
  githubUrl,
  linkedinUrl,
  linkHubUrl,
  xUrl,
  youtubeUrl,
} from "@/lib/site-config";

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const root = footerRef.current;
    if (!root) {
      return;
    }

    const socialTargets = root.querySelectorAll("[data-footer-social]");
    const policyTargets = root.querySelectorAll("[data-footer-policy]");
    const versionTargets = root.querySelectorAll("[data-footer-version]");

    animate(socialTargets, {
      opacity: [0, 1],
      translateY: [10, 0],
      stagger: 45,
      duration: 280,
      ease: "outQuad",
    });

    animate(policyTargets, {
      opacity: [0, 1],
      translateY: [10, 0],
      delay: 120,
      stagger: 35,
      duration: 280,
      ease: "outQuad",
    });

    animate(versionTargets, {
      opacity: [0, 1],
      translateY: [10, 0],
      delay: 220,
      duration: 280,
      ease: "outQuad",
    });
  }, []);

  return (
    <footer
      ref={footerRef}
      className="mt-20 border-t-4 border-black bg-secondary"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 text-secondary-foreground lg:flex-row lg:items-start lg:justify-between">
        <div className="flex w-full flex-col items-center gap-3 text-center lg:w-auto lg:items-start lg:text-left">
          <p
            className="inline-flex border-4 border-black bg-[#111827] px-3 py-2 text-xs font-black uppercase text-white shadow-retro-sm sm:text-sm"
            data-footer-policy
          >
            Copyright {currentYear} Fajri Ramadhan
          </p>
        </div>

        <div className="flex w-full flex-col items-center gap-3 lg:w-auto lg:items-end">
          <div className="grid grid-cols-4 gap-2">
            <Link
              href={githubUrl}
              className="retro-social-icon"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              data-footer-social
            >
              <Github className="h-4 w-4" />
            </Link>
            <Link
              href={linkedinUrl}
              className="retro-social-icon"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn"
              data-footer-social
            >
              <Linkedin className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
