import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { ArticleItem } from '@/types'

const articlesDirectory = path.join(process.cwd(), 'content', 'articles')

export function getSortedArticles() {
  const fileNames = fs.readdirSync(articlesDirectory)

  const allArticlesData = fileNames.map(fileName => {
    const id = fileName.replace(/\.mdx$/, '')

    const fullPath = path.join(articlesDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const matterResult = matter(fileContents)

    return {
      id,
      ...(matterResult.data as ArticleItem),
    }
  })

  return allArticlesData.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getAllArticleIds() {
  const fileNames = fs.readdirSync(articlesDirectory)

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    }
  })
}

export function getExcerptFromHtml(html: string, maxChars = 200): string {
  // Strip tags
  const text = html
    .replace(/<[^>]+>/g, ' ')   // remove all HTML tags
    .replace(/\s+/g, ' ')       // collapse whitespace
    .trim();

  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars).trimEnd() + '…';
}

export async function getArticleData(id : string) {
  const fullPath = path.join(articlesDirectory, `${id}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
 
  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
 
  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
 
  const excerpt = getExcerptFromHtml(contentHtml, 220);

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    excerpt,
    ...(matterResult.data as ArticleItem),
  };
}