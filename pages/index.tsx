import { NextPage, GetStaticProps } from 'next';

import Header from 'components/layout/Header';
import HeroSection from 'components/layout/HeroSection';
import { Client, Prismic } from 'config/prismic';
import BlogsSection from 'components/layout/BlogsSections';

interface Props {
	posts: Post[];
}

const Home: NextPage<Props> = ({ posts }) => {
	return (
		<>
			<Header />
			<HeroSection />
			<BlogsSection posts={posts} />
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

export default Home;
