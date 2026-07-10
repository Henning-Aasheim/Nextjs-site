import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { BookMeta, Book, YearValue, YearRange, BookEra } from '@/types'

export const BOOK_ERAS: BookEra[] = ['archaic', 'classical', 'medieval', 'earlyModern', 'modern']


// --- Main path to the mdx files ---

const bookDirectory = path.join(process.cwd(), 'content', 'books')

// --- Reading the content of the mdx files ---

export function getBookById(locale: string, id: string): Book {
  const fullPath = path.join(bookDirectory, locale, `${id}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);

  const meta: BookMeta = {
    id,
    title: data.title,
    author: data.author,
    date: data.date,
    translator: data.translator || undefined,
    image: data.image,
    year: data.year as YearValue | undefined,
    yearRange: data.yearRange as YearRange | undefined,
    era: data.era as BookEra | undefined,
  };

  return { ...meta, content };
}

// --- Gets the book ids ---

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

// --- Sorting the books by date ---

function yearToSortable(y: YearValue): number {
  return y.era === 'BCE' ? -y.value : y.value;
}

function getBookSortKey(book: BookMeta): number {
  if (book.year) {
    return yearToSortable(book.year);
  }
  if (book.yearRange) {
    return yearToSortable(book.yearRange.start);
  }
  return Number.POSITIVE_INFINITY; // undated → pushed to end
}

export function sortBooksByDate<T extends BookMeta>(books: T[]): T[] {
  return [...books].sort((a, b) => getBookSortKey(a) - getBookSortKey(b));
}

export function groupBooksByEra<T extends BookMeta>(books: T[]): Record<BookEra, T[]> {
  const grouped = BOOK_ERAS.reduce((acc, era) => {
    acc[era] = []
    return acc
  }, {} as Record<BookEra, T[]>)

  for (const book of books) {
    if (book.era && grouped[book.era]) {
      grouped[book.era].push(book)
    }
  }

  return grouped
}