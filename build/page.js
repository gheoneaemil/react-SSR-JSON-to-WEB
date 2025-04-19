// app/page.tsx
import { Suspense } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
async function Albums() {
  return /* @__PURE__ */ jsx("ul", {});
}
async function Page() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl mb-3", children: "Spotifn\u2019t" }),
    /* @__PURE__ */ jsx(Suspense, { fallback: "Getting albums", children: /* @__PURE__ */ jsx(Albums, {}) })
  ] });
}
export {
  Page as default
};
