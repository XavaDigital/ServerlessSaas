import { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';

import HeroSection from 'components/home/HeroSection';
import BlogSection from 'components/home/BlogSections';
import Layout from 'components/home/Layout';
import FeatureSection from 'components/home/FeatureSection';
import StepsSection from 'components/home/StepsSection';
import TeamSection from 'components/home/TeamSection';
import PricingSection from 'components/home/PricingSection';

interface Props {
  content: { attributes: any };
  posts: { attributes: any; html: any }[];
}

const HomePage: NextPage<Props> = ({ content, posts }) => {
  const { attributes } = content;

  const latestPosts = posts.slice(Math.max(posts.length - 3, 0));

  return (
    <>
      <Head>
        <title>Serverless SaaS</title>
      </Head>
      <Layout>
        <HeroSection
          title={attributes.hero_title}
          description={attributes.hero_description}
          image={attributes.hero_image}
        />
        <FeatureSection
          title={attributes.feature_title}
          description={attributes.feature_description}
          features={attributes.features}
        />
        <StepsSection steps={attributes.steps} image={attributes.steps_image} />
        <PricingSection />
        <BlogSection posts={latestPosts} />
        <TeamSection
          title={attributes.steps_title}
          description={attributes.steps_description}
          team={attributes.team}
        />
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const content = await import('../content/home.md');

  const posts = ((context) => {
    const keys = context.keys();
    const values = keys.map(context) as any;

    const data = keys.map((_, index) => {
      const post = values[index];
      return post;
    });

    return data;
  })(require.context('../content/posts', true, /\.md$/));

  return { props: { content: content.default, posts } };
};

export default HomePage;
