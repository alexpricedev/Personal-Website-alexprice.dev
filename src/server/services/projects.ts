import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

export type Project = {
  slug: string;
  title: string;
  description: string;
  image?: string;
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  order: number;
};

type Frontmatter = {
  title: string;
  description: string;
  image?: string;
  stack?: string[];
  liveUrl?: string;
  githubUrl?: string;
  order?: number;
};

const CONTENT_DIR = join(process.cwd(), "content", "projects");

function parseProject(filePath: string, slug: string): Project {
  const fileContent = readFileSync(filePath, "utf-8");
  const { data } = matter(fileContent);
  const frontmatter = data as Frontmatter;

  return {
    slug,
    title: frontmatter.title,
    description: frontmatter.description,
    image: frontmatter.image,
    stack: frontmatter.stack ?? [],
    liveUrl: frontmatter.liveUrl,
    githubUrl: frontmatter.githubUrl,
    order: frontmatter.order ?? 999,
  };
}

/**
 * Get all projects, sorted by order (lowest first)
 * Returns empty array if directory doesn't exist
 */
export function getAllProjects(): Project[] {
  if (!existsSync(CONTENT_DIR)) {
    return [];
  }

  const files = readdirSync(CONTENT_DIR).filter((file) => file.endsWith(".md"));

  const projects = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const filePath = join(CONTENT_DIR, file);
    return parseProject(filePath, slug);
  });

  return projects.sort((a, b) => a.order - b.order);
}
