import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(absolute)));
    else if (absolute.endsWith(".tsx")) files.push(absolute);
  }
  return files;
}

const roots = [path.join("src", "app", "(marketing)"), path.join("src", "components", "marketing")];
for (const root of roots) {
  for (const file of await walk(root)) {
    let source = await readFile(file, "utf8");
    const original = source;
    source = source.replaceAll('href="/signup"', 'href={appUrl("/signup")}');
    source = source.replaceAll('ctaHref = "/signup"', 'ctaHref = appUrl("/signup")');
    source = source.replaceAll('primaryHref="/signup"', 'primaryHref={appUrl("/signup")}');
    source = source.replaceAll('secondaryHref="/signup"', 'secondaryHref={appUrl("/signup")}');
    source = source.replaceAll('primaryHref = "/signup"', 'primaryHref = appUrl("/signup")');
    source = source.replace(
      /href=\{`\/signup\?source=scorecard&session=\$\{sessionId\}`\}/g,
      'href={appUrl(`/signup?source=scorecard&session=${sessionId}`)}',
    );
    if (source === original) continue;

    const importLine = 'import { appUrl } from "@/config/urls";\n';
    if (!source.includes('from "@/config/urls"')) {
      if (source.startsWith('"use client";')) {
        source = source.replace('"use client";\n', `"use client";\n\n${importLine}`);
      } else {
        source = `${importLine}${source}`;
      }
    }
    await writeFile(file, source);
  }
}

