"use client";

import { useState, FormEvent } from "react";

// TODO: Replace with your actual Formspree endpoint from formspree.io
const FORMSPREE_ENDPOINT = "https://formspree.io/f/REPLACE_ME";

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(data: FormData) {
    const errs: Record<string, string> = {};
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const message = data.get("message") as string;

    if (!name.trim()) errs.name = "Name is required.";
    if (!email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!message.trim()) errs.message = "Message is required.";

    return errs;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const errs = validate(data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setState("submitting");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setState("success");
        form.reset();
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  return (
    <section
      id="contact"
      className="py-[160px] max-w-[1280px] mx-auto px-5 md:px-20"
    >
      <div className="grid grid-cols-4 md:grid-cols-12 gap-8">
        {/* Left column */}
        <div className="col-span-4 md:col-span-5 mb-16 md:mb-0">
          <h2
            className="text-[48px] md:text-[42px] leading-[1.2] font-normal text-ink mb-8"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Let&apos;s create something remarkable.
          </h2>
          <p className="text-ink-muted text-[18px] leading-[1.6] mb-12">
            Ready to transform your digital presence? Reach out for a
            consultation or just say hello.
          </p>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-line flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-accent">
                  mail
                </span>
              </div>
              <div>
                <p
                  className="text-ink-muted uppercase text-[10px]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Email
                </p>
                <p className="font-semibold">help@kodable.ai</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-line flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-accent">
                  location_on
                </span>
              </div>
              <div>
                <p
                  className="text-ink-muted uppercase text-[10px]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Studio
                </p>
                <p className="font-semibold">Valencia, Spain</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="col-span-4 md:col-span-7">
          {state === "success" ? (
            <div className="bg-white p-10 border border-line print-shadow h-full flex items-center justify-center text-center">
              <div>
                <span className="material-symbols-outlined text-accent text-5xl block mb-4">
                  check_circle
                </span>
                <h3
                  className="text-[32px] font-normal mb-4"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Message received.
                </h3>
                <p className="text-ink-muted text-[16px] leading-[1.6]">
                  Thanks for reaching out. I&apos;ll be in touch within one
                  business day.
                </p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-8 bg-white p-10 border border-line print-shadow"
            >
              <div className="grid grid-cols-2 gap-8">
                <div className="col-span-2 md:col-span-1">
                  <label
                    className="block text-ink-muted uppercase mb-2 text-[12px]"
                    style={{ fontFamily: "var(--font-mono)" }}
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    autoComplete="name"
                    className="w-full border-0 border-b border-line bg-transparent py-2 px-0 focus:outline-none focus:border-ink transition-all placeholder:text-line"
                  />
                  {errors.name && (
                    <p className="text-[#ba1a1a] text-[12px] mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label
                    className="block text-ink-muted uppercase mb-2 text-[12px]"
                    style={{ fontFamily: "var(--font-mono)" }}
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    autoComplete="email"
                    className="w-full border-0 border-b border-line bg-transparent py-2 px-0 focus:outline-none focus:border-ink transition-all placeholder:text-line"
                  />
                  {errors.email && (
                    <p className="text-[#ba1a1a] text-[12px] mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  className="block text-ink-muted uppercase mb-2 text-[12px]"
                  style={{ fontFamily: "var(--font-mono)" }}
                  htmlFor="project"
                >
                  Project Type
                </label>
                <select
                  id="project"
                  name="project"
                  className="w-full border-0 border-b border-line bg-transparent py-2 px-0 focus:outline-none focus:border-ink transition-all"
                >
                  <option>Marketing Website</option>
                  <option>E-commerce</option>
                  <option>AI Implementation</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label
                  className="block text-ink-muted uppercase mb-2 text-[12px]"
                  style={{ fontFamily: "var(--font-mono)" }}
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell us about your project..."
                  className="w-full border-0 border-b border-line bg-transparent py-2 px-0 focus:outline-none focus:border-ink transition-all placeholder:text-line resize-none"
                />
                {errors.message && (
                  <p className="text-[#ba1a1a] text-[12px] mt-1">
                    {errors.message}
                  </p>
                )}
              </div>

              {state === "error" && (
                <p className="text-[#ba1a1a] text-[14px]">
                  Something went wrong. Please try again or email us directly at
                  help@kodable.ai.
                </p>
              )}

              <button
                type="submit"
                disabled={state === "submitting"}
                className="w-full bg-ink text-white py-6 font-bold hover:bg-accent transition-all lift-hover disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              >
                {state === "submitting"
                  ? "Sending..."
                  : "Send Proposal Request"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
