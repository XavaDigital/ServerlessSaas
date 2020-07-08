import { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';

import { Client, Prismic } from 'config/prismic';
import { Post } from 'interfaces/post';
import HeroSection from 'components/home/HeroSection';
import BlogSection from 'components/home/BlogSections';
import Layout from 'components/home/Layout';
import FeatureSection from 'components/home/FeatureSection';
import StepsSection from 'components/home/StepsSection';
import TeamSection from 'components/home/TeamSection';
import PricingSection from 'components/home/PricingSection';

import { attributes, react as HomeContent } from '../content/home.md';

interface Props {
  posts: Post[];
}

const HomePage: NextPage<Props> = ({ posts }) => {
  const { title, cats } = attributes;
  return (
    <>
      <Head>
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Head>
      <article>
        <h1>{title}</h1>
        <HomeContent />
        <ul>
          {cats.map((cat, k) => (
            <li key={k}>
              <h2>{cat.name}</h2>
              <p>{cat.description}</p>
            </li>
          ))}
        </ul>
      </article>
      <Layout>
        <HeroSection />
        <FeatureSection />
        <StepsSection />
        <PricingSection />
        <TeamSection />
        <BlogSection posts={posts} />
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await Client().query(
      Prismic.Predicates.at('document.type', 'blog'),
      { pageSize: 3, orderings: '[my.blog.date desc]' }
    );

    return { props: { posts: response.results } };
  } catch (error) {
    return { props: { error } };
  }
};

export default HomePage;
