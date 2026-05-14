import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

const localeToFileName: Record<string, string> = {
  'nb': 'cv-no.pdf',
  'en': 'cv-en-GB.pdf',
  //'ja': 'cv-ja.pdf',
  // add more if needed
};

export async function GET(
  req: NextRequest,
  context: { params: { locale: string } }
) {
  const { locale } = context.params;

  const fileName = localeToFileName[locale] ?? localeToFileName['no']; // default to Norwegian

  const filePath = path.join(process.cwd(), 'assets', 'resumes', fileName);

  const fileBuffer = await fs.readFile(filePath);

  return new NextResponse(fileBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${fileName}"`,
    },
  });
}