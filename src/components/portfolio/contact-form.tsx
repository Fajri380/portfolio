"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { animate } from "animejs";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/retroui/Button";
import { Input } from "@/components/retroui/Input";
import {
  CheckCircle2,
  FileText,
  Info,
  Mail,
  MessageSquare,
  User,
  XCircle,
} from "@/components/retroui/icons";
import { Textarea } from "@/components/retroui/Textarea";
import { useContactSubmissionMutation } from "@/lib/client/portfolio-queries";
import {
  CONTACT_SUBMISSION_COOLDOWN_MS,
  useContactFormStore,
} from "@/store/contact-form-store";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Enter a valid email."),
  subject: z.string().min(1, "Please select a subject."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const subjectOptions = [
  "Job Opportunity",
  "Internship",
  "Freelance Project",
  "Just Saying Hi",
] as const;

export function ContactForm() {
  const mutation = useContactSubmissionMutation();
  const setCooldown = useContactFormStore((state) => state.setCooldown);
  const getRemainingMs = useContactFormStore((state) => state.getRemainingMs);
  const popup = useContactFormStore((state) => state.popup);
  const openPopup = useContactFormStore((state) => state.openPopup);
  const closePopup = useContactFormStore((state) => state.closePopup);
  const popupPanelRef = useRef<HTMLDivElement>(null);

  const [clockTick, setClockTick] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "Job Opportunity",
      message: "",
    },
  });

  const activeEmail = watch("email").trim().toLowerCase();
  const remainingMs =
    clockTick !== null && activeEmail
      ? getRemainingMs(activeEmail, clockTick)
      : 0;
  const isCooldownActive = remainingMs > 0;
  const cooldownMinutes = Math.floor(remainingMs / 60000);
  const cooldownSeconds = Math.floor((remainingMs % 60000) / 1000)
    .toString()
    .padStart(2, "0");

  useEffect(() => {
    setClockTick(Date.now());

    const intervalId = window.setInterval(() => {
      setClockTick((previous) =>
        previous === null ? Date.now() : previous + 1000,
      );
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (!popup.open || !popupPanelRef.current) {
      return;
    }

    animate(popupPanelRef.current, {
      opacity: [0, 1],
      scale: [0.92, 1],
      translateY: [14, 0],
      duration: 260,
      ease: "outQuad",
    });
  }, [popup.open]);

  useEffect(() => {
    if (!popup.open) {
      return;
    }

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePopup();
      }
    };

    window.addEventListener("keydown", onEscape);
    return () => {
      window.removeEventListener("keydown", onEscape);
    };
  }, [popup.open, closePopup]);

  const onSubmit = async (values: ContactFormValues) => {
    const normalizedEmail = values.email.trim().toLowerCase();
    const lockedRemainingMs = getRemainingMs(normalizedEmail);

    if (lockedRemainingMs > 0) {
      const mm = Math.floor(lockedRemainingMs / 60000);
      const ss = Math.floor((lockedRemainingMs % 60000) / 1000)
        .toString()
        .padStart(2, "0");
      openPopup({
        status: "info",
        title: "Cooldown Active",
        description: `This email can submit again in ${mm}:${ss}.`,
      });
      return;
    }

    try {
      await mutation.mutateAsync(values);

      setCooldown(normalizedEmail, Date.now() + CONTACT_SUBMISSION_COOLDOWN_MS);
      reset({
        name: "",
        email: values.email,
        subject: "Job Opportunity",
        message: "",
      });

      openPopup({
        status: "success",
        title: "Message Sent",
        description:
          "Your message was submitted successfully. I will reply within 1-2 business days.",
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Could not send your message right now.";
      openPopup({
        status: "error",
        title: "Submission Failed",
        description: message,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label htmlFor="contact-name" className="space-y-2">
            <span className="flex items-center gap-2 text-sm font-black uppercase">
              <User className="h-4 w-4" /> Name
            </span>
            <Input
              id="contact-name"
              {...register("name")}
              className="border-4 border-black bg-card py-3 shadow-retro"
            />
            {errors.name ? (
              <p className="text-sm font-bold text-destructive">
                {errors.name.message}
              </p>
            ) : null}
          </label>

          <label htmlFor="contact-email" className="space-y-2">
            <span className="flex items-center gap-2 text-sm font-black uppercase">
              <Mail className="h-4 w-4" /> Email
            </span>
            <Input
              id="contact-email"
              {...register("email")}
              type="email"
              placeholder="name@example.com"
              className="border-4 border-black bg-card py-3 shadow-retro"
            />
            {errors.email ? (
              <p className="text-sm font-bold text-destructive">
                {errors.email.message}
              </p>
            ) : null}
          </label>
        </div>

        <label htmlFor="contact-subject" className="block space-y-2">
          <span className="flex items-center gap-2 text-sm font-black uppercase">
            <FileText className="h-4 w-4" /> Subject
          </span>
          <select
            id="contact-subject"
            {...register("subject")}
            className="w-full border-4 border-black bg-card p-3 font-medium shadow-retro focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {subjectOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.subject ? (
            <p className="text-sm font-bold text-destructive">
              {errors.subject.message}
            </p>
          ) : null}
        </label>

        <label htmlFor="contact-message" className="block space-y-2">
          <span className="flex items-center gap-2 text-sm font-black uppercase">
            <MessageSquare className="h-4 w-4" /> Message
          </span>
          <Textarea
            id="contact-message"
            {...register("message")}
            rows={5}
            placeholder="Tell me about your team, role opportunities, project details, or say hello!"
            className="border-4 border-black bg-card py-3 shadow-retro"
          />
          {errors.message ? (
            <p className="text-sm font-bold text-destructive">
              {errors.message.message}
            </p>
          ) : null}
        </label>

        {isCooldownActive ? (
          <p className="border-4 border-black bg-muted px-3 py-2 text-xs font-black uppercase shadow-retro-sm sm:text-sm">
            Cooldown active for this email: {cooldownMinutes}:{cooldownSeconds}
          </p>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row">
          <motion.div
            whileHover={{ x: 4, y: 4, boxShadow: "0px 0px 0px rgba(0,0,0,1)" }}
          >
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting || mutation.isPending || isCooldownActive}
              className="w-full border-4 border-black shadow-retro-sm sm:w-auto uppercase"
            >
              {mutation.isPending || isSubmitting
                ? "Sending..."
                : "Send Message"}
            </Button>
          </motion.div>
        </div>
      </form>

      {popup.open ? (
        <div
          className="fixed inset-0 z-120 flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-live="polite"
        >
          <div
            ref={popupPanelRef}
            className="w-full max-w-md border-4 border-black bg-card p-4 shadow-retro-lg sm:p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2">
                {popup.status === "success" ? (
                  <CheckCircle2 className="mt-0.5 h-5 w-5" />
                ) : popup.status === "error" ? (
                  <XCircle className="mt-0.5 h-5 w-5" />
                ) : (
                  <Info className="mt-0.5 h-5 w-5" />
                )}
                <div>
                  <p className="font-display text-2xl uppercase">
                    {popup.title}
                  </p>
                  <p className="mt-1 text-sm font-medium leading-relaxed sm:text-base">
                    {popup.description}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={closePopup}
                className="retro-social-icon"
                aria-label="Close popup"
              >
                <XCircle className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 flex justify-end">
              <Button
                type="button"
                onClick={closePopup}
                className="border-4 border-black uppercase shadow-retro-sm"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
