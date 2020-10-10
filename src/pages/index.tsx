import { NextPage, GetStaticProps } from 'next';

import SEO from 'components/home/SEO';
import HeroSection from 'components/home/HeroSection';
import BlogSection from 'components/home/BlogSection';
import Layout from 'components/home/Layout';
import FeatureSection from 'components/home/FeatureSection';
import StepsSection from 'components/home/StepsSection';
import TeamSection from 'components/home/TeamSection';
import PricingSection from 'components/home/PricingSection';
import { HomeAttributes } from 'interfaces/home';

interface Props {
  content: { attributes: HomeAttributes };
}

const HomePage: NextPage<Props> = ({ content }) => {
  const { attributes } = content;

  return (
    <>
      <SEO />
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
        <PricingSection
          title={attributes.pricing_title}
          description={attributes.pricing_description}
          plans={attributes.plans}
        />
        <TeamSection
          title={attributes.team_title}
          description={attributes.team_description}
          team={attributes.team}
        />
        <BlogSection
          title={attributes.blog_title}
          description={attributes.blog_description}
          slugs={attributes.posts}
        />
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const content = await import(`../content/pages/${'home'}.md`);

  return { props: { content: content.default } };
};

export default HomePage;
