import { NextPage, GetStaticProps } from 'next';

import HeroSection from 'components/home/HeroSection';
import { Client, Prismic } from 'config/prismic';
import BlogSection from 'components/home/BlogSections';
import Layout from 'components/home/Layout';

interface Props {
	posts: Post[];
}

const HomePage: NextPage<Props> = ({ posts }) => {
	return (
		<Layout>
			<HeroSection />
			<BlogSection posts={posts} />
		</Layout>
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
