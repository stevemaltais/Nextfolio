// components/SEO/JsonLd.js
import { DefaultSeo, NextSeo } from 'next-seo';
import Head from 'next/head';

const JsonLd = ({ schema }) => (
  <Head>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  </Head>
);

export default JsonLd;
