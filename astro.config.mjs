// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import fs from "node:fs";
import path from "node:path";

const getBlogSidebar = () => {
  const blogDir = "src/content/docs/blog";

  const files = fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  const items = files.map((file) => {
    const content = fs.readFileSync(path.join(blogDir, file), "utf-8");
    const titleMatch = content.match(/^title:\s*(.+)$/m);
    const dateMatch = content.match(/^date:\s*(.+)$/m);

    const title = titleMatch ? titleMatch[1].replace(/['"]/g, "").trim() : file;
    const dateStr = dateMatch
      ? dateMatch[1].replace(/['"]/g, "").trim()
      : "1970-01-01";

    return {
      label: title,
      link: `blog/${file.replace(/\.mdx?$/, "")}/`,
      dateObj: new Date(dateStr),
    };
  });

  // 4. Sort by Date (Newest First)
  // @ts-expect-error
  items.sort((a, b) => b.dateObj - a.dateObj);

  // 5. Return only the format Starlight expects
  return items.map(({ label, link }) => ({ label, link }));
};

export default defineConfig({
  site: "https://benjypng.github.io",
  base: "/blogseq",
  integrations: [
    starlight({
      title: "Blogseq",
      plugins: [],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/withastro/starlight",
        },
      ],
      sidebar: [
        {
          label: "Blog",
          items: getBlogSidebar(),
          collapsed: false,
        },
        {
          label: "Plugin README",
          autogenerate: { directory: "guides" },
          collapsed: false,
        },
      ],
    }),
  ],
});
