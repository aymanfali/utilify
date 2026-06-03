"use client";
import React, { useMemo, useState } from "react";
import {
  Braces,
  Type,
  FileText,
  Binary,
  Link2,
  KeyRound,
  Box,
  Palette,
  Search,
  Wrench,
  Menu,
  X,
} from "lucide-react";
import { Input } from "@/components/ui";
import { ResponsiveBannerAd, AdSlot } from "@/components/AdSlot";
import {
  JsonTool,
  CaseTool,
  CounterTool,
  Base64Tool,
  UrlTool,
  PasswordTool,
  ShadowTool,
  PaletteTool,
} from "@/components/tools";

type ToolId =
  | "json"
  | "case"
  | "counter"
  | "base64"
  | "url"
  | "password"
  | "shadow"
  | "palette";

type Tool = {
  id: ToolId;
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  Component: () => React.ReactElement;
};

const TOOLS: Tool[] = [
  {
    id: "json",
    name: "JSON Formatter",
    category: "Text & Data",
    icon: Braces,
    description: "Pretty-print, minify and validate JSON.",
    Component: JsonTool,
  },
  {
    id: "case",
    name: "Case Converter",
    category: "Text & Data",
    icon: Type,
    description: "UPPER, lower, camel, snake, kebab, slug.",
    Component: CaseTool,
  },
  {
    id: "counter",
    name: "Word & Character Counter",
    category: "Text & Data",
    icon: FileText,
    description: "Live word, character and reading-time stats.",
    Component: CounterTool,
  },
  {
    id: "base64",
    name: "Base64 Encoder / Decoder",
    category: "Coding & DevOps",
    icon: Binary,
    description: "Encode and decode Base64 safely client-side.",
    Component: Base64Tool,
  },
  {
    id: "url",
    name: "URL Encoder / Decoder",
    category: "Coding & DevOps",
    icon: Link2,
    description: "Encode query strings and special characters.",
    Component: UrlTool,
  },
  {
    id: "password",
    name: "Password Generator",
    category: "Coding & DevOps",
    icon: KeyRound,
    description: "Cryptographically secure passwords.",
    Component: PasswordTool,
  },
  {
    id: "shadow",
    name: "CSS Shadow & Radius",
    category: "Design Helpers",
    icon: Box,
    description: "Visual editor with copyable CSS / Tailwind.",
    Component: ShadowTool,
  },
  {
    id: "palette",
    name: "Color Palette Generator",
    category: "Design Helpers",
    icon: Palette,
    description: "Hit Space for a new palette. Click to copy.",
    Component: PaletteTool,
  },
];

export default function Page() {
  const [active, setActive] = useState<ToolId>("json");
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const filtered = useMemo(
    () =>
      TOOLS.filter((t) =>
        (t.name + t.category + t.description)
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [query],
  );

  const grouped = useMemo(() => {
    const g: Record<string, Tool[]> = {};
    for (const t of filtered) (g[t.category] ||= []).push(t);
    return g;
  }, [filtered]);

  const current = TOOLS.find((t) => t.id === active)!;
  const ActiveComponent = current.Component;

  const Sidebar = (
    <aside className="flex h-full w-full flex-col border-r border-border bg-card/40 md:w-72">
      <div className="flex items-center gap-2 border-b border-border p-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Wrench className="h-4 w-4" />
        </div>
        <div>
          <h1 className="text-sm font-semibold tracking-tight">Utilify</h1>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Online Utility Suite
          </p>
        </div>
        <button
          className="ml-auto rounded p-1 text-muted-foreground hover:bg-accent md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="p-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tools…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto px-2 pb-4">
        {Object.entries(grouped).map(([cat, items]) => (
          <div key={cat} className="mb-4">
            <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              {cat}
            </div>
            <ul className="space-y-0.5">
              {items.map((t) => {
                const Icon = t.icon;
                const isActive = t.id === active;
                return (
                  <li key={t.id}>
                    <button
                      onClick={() => {
                        setActive(t.id);
                        setMobileOpen(false);
                      }}
                      className={`flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors ${
                        isActive
                          ? "bg-primary/15 text-primary"
                          : "text-foreground/80 hover:bg-accent"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="truncate">{t.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="px-3 py-6 text-center text-sm text-muted-foreground">
            No tools match &quot;{query}&quot;
          </p>
        )}
      </nav>
    </aside>
  );

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <div className="hidden md:flex">{Sidebar}</div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="w-72 max-w-[85%]">{Sidebar}</div>
          <div
            className="flex-1 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-2 border-b border-border bg-card/40 px-4 py-3 md:px-6">
          <button
            className="rounded p-2 text-muted-foreground hover:bg-accent md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="min-w-0">
            <h2 className="truncate text-lg font-semibold tracking-tight">
              {current.name}
            </h2>
            <p className="truncate text-xs text-muted-foreground">
              {current.description}
            </p>
          </div>
        </header>

        <div className="border-b border-border bg-background/40 px-4 py-3 md:px-6">
          <ResponsiveBannerAd />
        </div>

        <div className="flex flex-1 gap-6 px-4 py-6 md:px-6">
          <main className="min-w-0 flex-1 space-y-6">
            <section className="rounded-xl border border-border bg-card p-4 md:p-6">
              <ActiveComponent />
            </section>

            <div className="flex justify-center">
              <AdSlot size="square" />
            </div>

            <footer className="pt-4 text-center text-xs text-muted-foreground">
              <span>
                All processing happens locally in your browser · No data leaves
                your device
              </span>
              <span>
                Created by{" "}
                <a
                  href="https://aymanfahd.com"
                  className="font-bold text-blue-600"
                >
                  Ayman Fahd
                </a>
              </span>
            </footer>
          </main>

          <aside className="hidden xl:block">
            <div className="sticky top-6">
              <AdSlot size="skyscraper" />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
