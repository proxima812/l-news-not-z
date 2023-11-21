import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import robotsTxt from "astro-robots-txt";
import { defineConfig } from "astro/config";
import { setting } from "./src/config.ts";

// https://astro.build/config
export default defineConfig({
 site: `${setting.site.url}` ? `${setting.site.url}` : "http://site.com",
 base: `${setting.site.base_path}` ? `${setting.site.base_path}` : "/",
 trailingSlash: `${setting.site.trailing_slash}` ? "always" : "never",
 experimental: {
  assets: true,
 },
 compressHTML: true,
 integrations: [
  tailwind({
   config: {
    applyBaseStyles: false,
   },
  }),
  react(),
  mdx(),
  sitemap(),
  robotsTxt({
   sitemap: [
    `${setting.site.siteLink}/sitemap-index.xml`,
    `${setting.site.siteLink}/sitemap-0.xml`,
   ],
  }),
 ],
 output: "server",
 adapter: vercel(),
});
