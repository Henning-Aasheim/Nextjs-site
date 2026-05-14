import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
    locales: ["no", "en", "ja"],
    defaultLocale: "no",
    localePrefix: "always",
});
