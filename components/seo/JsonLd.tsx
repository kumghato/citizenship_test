/**
 * Renders a single, self-contained JSON-LD block. Each block carries its own
 * top-level `@type` so validators that do not walk `@graph` can read it.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default JsonLd;
