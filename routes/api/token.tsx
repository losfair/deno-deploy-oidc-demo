import { define } from "../../utils.ts";

export const handler = define.handlers({
  async GET(_ctx) {
    const res = await fetch(
      `http://oidc-provider.localhost/token?audience=${
        encodeURIComponent("https://example.com")
      }&attributes=otel/deno.organization,otel/deno.app,otel/deno.context`,
    );
    if (res.status !== 200) {
      throw new Error(`Failed to fetch token: ${res.status}`);
    }

    const token = await res.text();
    const [_header, payload, _signature] = token.split(".");
    const decodedPayload = JSON.parse(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/")),
    );
    return Response.json({ token, payload: decodedPayload });
  },
});
