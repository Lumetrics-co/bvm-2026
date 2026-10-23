import en from "@/messages/en.json";

type Params = Record<string, string | number>;

function resolve(path: string): unknown {
  return path.split(".").reduce<unknown>((node, part) => {
    if (node && typeof node === "object") return (node as Record<string, unknown>)[part];
    return undefined;
  }, en);
}

/** Translate a fully-qualified key such as `Hero.usp`. Supports `{name}` placeholders. */
export function t(key: string, params?: Params): string {
  const value = resolve(key);
  if (typeof value !== "string") {
    if (process.env.NODE_ENV !== "production") console.warn(`[i18n] missing message: ${key}`);
    return key;
  }
  if (!params) return value;
  return value.replace(/\{(\w+)\}/g, (_, name: string) => String(params[name] ?? `{${name}}`));
}

/** Return the raw message value (arrays / objects) for data-driven sections. */
export function tRaw<T = unknown>(key: string): T {
  return resolve(key) as T;
}
