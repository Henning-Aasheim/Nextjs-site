import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  /* config options here */
    turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};

const withNextIntl = createNextIntlPlugin();

const withMDX = createMDX({
  extension: /\.mdx?$/,
})

export default withNextIntl(withMDX(nextConfig));
