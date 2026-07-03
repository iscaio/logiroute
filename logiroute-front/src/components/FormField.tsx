import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  erro?: string;
  sufixo?: string;
}

export default function FormField({ label, erro, sufixo, id, ...rest }: Props) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-body text-[13px] font-medium text-paper-200">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          {...rest}
          className={`w-full rounded-md border bg-graphite-800 py-2.5 px-3 font-body text-sm text-paper-100 outline-none transition-colors placeholder:text-paper-600/70 ${
            erro ? "border-route-danger/60" : "border-graphite-600 focus:border-manifest"
          } ${sufixo ? "pr-12" : ""}`}
        />
        {sufixo && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[11px] text-paper-600">
            {sufixo}
          </span>
        )}
      </div>
      {erro && <p className="mt-1.5 font-mono text-[11px] text-route-danger">{erro}</p>}
    </div>
  );
}
