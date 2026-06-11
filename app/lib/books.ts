import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { BookMeta, Book } from '@/types'

const bookDirectory = path.join(process.cwd(), 'content', 'books')

export function getBookById(locale: string, id: string): Book {
  const fullPath = path.join(bookDirectory, locale, `${id}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);

  const meta: BookMeta = {
    id,
    title: data.title,
    author: data.author,
    translator: data.translator || undefined,
    image: data.image,
  };

  return { ...meta, content };
}

export function getAllBookIds() {
  const fileNames = fs.readdirSync(bookDirectory)

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.mdx$/, ''),
      },
    }
  })
}

export function getBookIds(locale: string): string[] {
  const localeDir = path.join(bookDirectory, locale);
  if (!fs.existsSync(localeDir)) return [];

  return fs
    .readdirSync(localeDir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

export function getAllBooks(locale: string): Book[] {
  const id = getBookIds(locale);
  return id.map((id) => getBookById(locale, id));
}
