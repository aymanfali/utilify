"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Copy, Check, RefreshCw, Space } from "lucide-react";
import { Button, Textarea, Input, Label, Slider, Switch } from "@/components/ui";
import { toast } from "sonner";

function CopyBtn({ value, label = "Copy" }: { value: string; label?: string }) {
  const [done, setDone] = useState(false);
  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      onClick={async () => {
        if (!value) return;
        await navigator.clipboard.writeText(value);
        setDone(true);
        toast.success("Copied to clipboard");
        setTimeout(() => setDone(false), 1200);
      }}
    >
      {done ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      <span className="ml-2">{done ? "Copied" : label}</span>
    </Button>
  );
}

export function JsonTool() {
  const [input, setInput] = useState('{"hello":"world","arr":[1,2,3]}');
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);

  const run = (mode: "pretty" | "minify" | "validate") => {
    try {
      const parsed = JSON.parse(input);
      if (mode === "pretty") setOutput(JSON.stringify(parsed, null, 2));
      else if (mode === "minify") setOutput(JSON.stringify(parsed));
      else setOutput(input);
      setStatus({ ok: true, msg: "Valid JSON" });
    } catch (e) {
      setStatus({ ok: false, msg: (e as Error).message });
      setOutput("");
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <Label>Input</Label>
        <Textarea value={input} onChange={(e) => setInput(e.target.value)} className="h-72 font-mono text-sm" />
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => run("pretty")}>Pretty Print</Button>
          <Button variant="secondary" onClick={() => run("minify")}>Minify</Button>
          <Button variant="outline" onClick={() => run("validate")}>Validate</Button>
        </div>
      </div>
      <div className="space-y-2">
        <Label>Output</Label>
        <Textarea readOnly value={output} className="h-72 font-mono text-sm" />
        <div className="flex items-center justify-between gap-2">
          {status && (
            <span className={status.ok ? "text-sm text-primary" : "text-sm text-destructive"}>{status.msg}</span>
          )}
          <CopyBtn value={output} />
        </div>
      </div>
    </div>
  );
}

export function CaseTool() {
  const [text, setText] = useState("Hello World From Lovable");
  const transforms = useMemo(
    () => ({
      UPPERCASE: text.toUpperCase(),
      lowercase: text.toLowerCase(),
      camelCase: text
        .toLowerCase()
        .replace(/[^a-z0-9]+(.)/g, (_, c) => c.toUpperCase())
        .replace(/^[A-Z]/, (m) => m.toLowerCase()),
      snake_case: text.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, ""),
      "kebab-case": text.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      slugify: text.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    }),
    [text],
  );
  return (
    <div className="space-y-4">
      <Textarea value={text} onChange={(e) => setText(e.target.value)} className="h-32" />
      <div className="grid gap-3 sm:grid-cols-2">
        {Object.entries(transforms).map(([k, v]) => (
          <div key={k} className="rounded-lg border border-border bg-card p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">{k}</span>
              <CopyBtn value={v} />
            </div>
            <code className="block break-words font-mono text-sm">{v || "—"}</code>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CounterTool() {
  const [text, setText] = useState("");
  const stats = useMemo(() => {
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim()).length;
    const paragraphs = text.split(/\n+/).filter((p) => p.trim()).length;
    const readingTime = Math.max(1, Math.ceil(words / 200));
    return { chars, charsNoSpace, words, sentences, paragraphs, readingTime };
  }, [text]);

  return (
    <div className="space-y-4">
      <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Start typing…" className="h-56" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {([
          ["Words", stats.words],
          ["Characters", stats.chars],
          ["No spaces", stats.charsNoSpace],
          ["Sentences", stats.sentences],
          ["Paragraphs", stats.paragraphs],
          ["Reading min", stats.readingTime],
        ] as const).map(([k, v]) => (
          <div key={k} className="rounded-lg border border-border bg-card p-4 text-center">
            <div className="text-2xl font-semibold text-primary">{v}</div>
            <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{k}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Base64Tool() {
  const [input, setInput] = useState("Hello, world!");
  const [output, setOutput] = useState("");

  const encode = () => {
    try { setOutput(btoa(unescape(encodeURIComponent(input)))); }
    catch { toast.error("Encoding failed"); }
  };
  const decode = () => {
    try { setOutput(decodeURIComponent(escape(atob(input.trim())))); }
    catch { toast.error("Invalid Base64"); }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <Label>Input</Label>
        <Textarea value={input} onChange={(e) => setInput(e.target.value)} className="h-64 font-mono text-sm" />
        <div className="flex gap-2">
          <Button onClick={encode}>Encode</Button>
          <Button variant="secondary" onClick={decode}>Decode</Button>
        </div>
      </div>
      <div className="space-y-2">
        <Label>Output</Label>
        <Textarea readOnly value={output} className="h-64 font-mono text-sm" />
        <CopyBtn value={output} />
      </div>
    </div>
  );
}

export function UrlTool() {
  const [input, setInput] = useState("https://example.com/?q=hello world&lang=en");
  const [output, setOutput] = useState("");
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <Label>Input</Label>
        <Textarea value={input} onChange={(e) => setInput(e.target.value)} className="h-64 font-mono text-sm" />
        <div className="flex gap-2">
          <Button onClick={() => setOutput(encodeURIComponent(input))}>Encode</Button>
          <Button variant="secondary" onClick={() => { try { setOutput(decodeURIComponent(input)); } catch { toast.error("Invalid URL string"); } }}>Decode</Button>
        </div>
      </div>
      <div className="space-y-2">
        <Label>Output</Label>
        <Textarea readOnly value={output} className="h-64 font-mono text-sm" />
        <CopyBtn value={output} />
      </div>
    </div>
  );
}

export function PasswordTool() {
  const [length, setLength] = useState(20);
  const [upper, setUpper] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [pw, setPw] = useState("");

  const generate = () => {
    let chars = "abcdefghijklmnopqrstuvwxyz";
    if (upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    let out = "";
    for (let i = 0; i < length; i++) out += chars[arr[i] % chars.length];
    setPw(out);
  };
  useEffect(generate, [length, upper, numbers, symbols]);

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="font-mono text-lg break-all">{pw}</div>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button onClick={generate}><RefreshCw className="h-4 w-4 mr-2" />Regenerate</Button>
        <CopyBtn value={pw} label="Copy password" />
      </div>
      <div className="space-y-4">
        <div>
          <div className="mb-2 flex justify-between text-sm">
            <Label>Length</Label>
            <span className="font-mono text-primary">{length}</span>
          </div>
          <Slider value={[length]} min={6} max={64} step={1} onValueChange={(v) => setLength(v[0])} />
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <label className="flex items-center justify-between rounded-md border border-border p-3"><span>Uppercase</span><Switch checked={upper} onCheckedChange={setUpper} /></label>
          <label className="flex items-center justify-between rounded-md border border-border p-3"><span>Numbers</span><Switch checked={numbers} onCheckedChange={setNumbers} /></label>
          <label className="flex items-center justify-between rounded-md border border-border p-3"><span>Symbols</span><Switch checked={symbols} onCheckedChange={setSymbols} /></label>
        </div>
      </div>
    </div>
  );
}

export function ShadowTool() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(12);
  const [blur, setBlur] = useState(28);
  const [spread, setSpread] = useState(-6);
  const [radius, setRadius] = useState(16);
  const [opacity, setOpacity] = useState(40);

  const css = `box-shadow: ${x}px ${y}px ${blur}px ${spread}px rgba(0,0,0,${(opacity/100).toFixed(2)});\nborder-radius: ${radius}px;`;
  const tw = `shadow-[${x}px_${y}px_${blur}px_${spread}px_rgba(0,0,0,${(opacity/100).toFixed(2)})] rounded-[${radius}px]`;

  const controls: Array<[string, number, (n: number) => void, number, number]> = [
    ["Offset X", x, setX, -50, 50],
    ["Offset Y", y, setY, -50, 50],
    ["Blur", blur, setBlur, 0, 100],
    ["Spread", spread, setSpread, -50, 50],
    ["Radius", radius, setRadius, 0, 100],
    ["Opacity", opacity, setOpacity, 0, 100],
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="flex items-center justify-center rounded-lg border border-border bg-muted/30 p-10 min-h-[300px]">
        <div
          className="bg-primary"
          style={{
            width: 160, height: 160,
            boxShadow: `${x}px ${y}px ${blur}px ${spread}px rgba(0,0,0,${opacity/100})`,
            borderRadius: radius,
          }}
        />
      </div>
      <div className="space-y-4">
        {controls.map(([name, val, set, min, max]) => (
          <div key={name}>
            <div className="mb-1 flex justify-between text-sm">
              <Label>{name}</Label>
              <span className="font-mono text-primary">{val}</span>
            </div>
            <Slider value={[val]} min={min} max={max} step={1} onValueChange={(v) => set(v[0])} />
          </div>
        ))}
        <div className="space-y-3">
          <div className="rounded-md border border-border bg-card p-3">
            <div className="mb-2 flex items-center justify-between"><span className="text-xs uppercase text-muted-foreground">CSS</span><CopyBtn value={css} /></div>
            <pre className="font-mono text-xs whitespace-pre-wrap">{css}</pre>
          </div>
          <div className="rounded-md border border-border bg-card p-3">
            <div className="mb-2 flex items-center justify-between"><span className="text-xs uppercase text-muted-foreground">Tailwind</span><CopyBtn value={tw} /></div>
            <pre className="font-mono text-xs whitespace-pre-wrap">{tw}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

function randHex() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0");
}
export function PaletteTool() {
  const [colors, setColors] = useState<string[]>(["#0ea5e9", "#22c55e", "#f59e0b", "#ef4444", "#a855f7"]);
  const regenerate = () => setColors(Array.from({ length: 5 }, randHex));
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = document.activeElement?.tagName;
      if (e.code === "Space" && tag !== "INPUT" && tag !== "TEXTAREA") {
        e.preventDefault();
        regenerate();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return (
    <div className="space-y-4" ref={ref}>
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground"><kbd className="rounded border border-border bg-muted px-2 py-0.5 text-xs">Space</kbd> for new palette · click swatch to copy</p>
        <Button onClick={regenerate}><Space className="h-4 w-4 mr-2" />Generate</Button>
      </div>
      <div className="grid gap-3 sm:grid-cols-5">
        {colors.map((c, i) => (
          <button
            key={i}
            onClick={() => { navigator.clipboard.writeText(c); toast.success(`Copied ${c}`); }}
            className="group relative h-40 rounded-lg border border-border transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: c }}
          >
            <span className="absolute bottom-2 left-2 right-2 rounded bg-black/60 px-2 py-1 font-mono text-xs text-white">{c.toUpperCase()}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
