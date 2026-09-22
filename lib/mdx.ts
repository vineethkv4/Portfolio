import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type CaseStudyTemplate = "standard" | "chart-countdown";

export type CaseStudyFrontmatter = {
  title: string;
  slug: string;
  summary: string;
  isGated: boolean;
  coverImage: string;
  publishDate: string;
  tags: string[];
  template?: CaseStudyTemplate;
};

export type CaseStudy = {
  frontmatter: CaseStudyFrontmatter;
  content: string;
  filePath: string;
};

const WORK_DIR = path.join(process.cwd(), "content/work");
const VAULT_DIR = path.join(process.cwd(), "content/vault");

function readMdxDir(dir: string): CaseStudy[] {
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(dir, file);
      const raw = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(raw);

      return {
        frontmatter: data as CaseStudyFrontmatter,
        content,
        filePath,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.frontmatter.publishDate).getTime() -
        new Date(a.frontmatter.publishDate).getTime(),
    );
}

export function getPublicCaseStudies(): CaseStudy[] {
  return readMdxDir(WORK_DIR).filter((study) => !study.frontmatter.isGated);
}

export function getVaultCaseStudies(): CaseStudy[] {
  return readMdxDir(VAULT_DIR).filter((study) => study.frontmatter.isGated);
}

export function getCaseStudyBySlug(
  slug: string,
  gated: boolean,
): CaseStudy | undefined {
  const studies = gated ? getVaultCaseStudies() : getPublicCaseStudies();
  return studies.find((study) => study.frontmatter.slug === slug);
}

export function getPublicSlugs(): string[] {
  return getPublicCaseStudies().map((study) => study.frontmatter.slug);
}

export function getVaultSlugs(): string[] {
  return getVaultCaseStudies().map((study) => study.frontmatter.slug);
}
