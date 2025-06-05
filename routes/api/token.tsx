import { define } from "../../utils.ts";

export const handler = define.handlers({
  async GET(_ctx) {
    const res = await fetch(
      `http://oidc-provider.localhost/token?audience=${
        encodeURIComponent("https://example.com")
      }&attributes=otel/deno.organization,otel/deno.app,otel/deno.context`,
    );
    return res;
  },
});
