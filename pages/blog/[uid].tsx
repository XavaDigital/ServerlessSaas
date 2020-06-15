import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { RichText } from 'prismic-reactjs';

import { Client, Prismic } from 'config/prismic';
import Header from 'components/layout/Header';
import Link from 'next/link';

interface Props {
	post: Post;
}

const BlogDetailPage: React.FC<Props> = ({ post }) => {
	if (!post) return null;

	return (
		<>
			<article>
				<Head>
					<title>{post.data.title}</title>
					<meta property="og:image" content={post.data.image.url} />
				</Head>
				<Header />
				<div className="min-h-screen">
					<div className="bg-gray-800 pb-32">
						<header className="pt-16 pb-12 container mx-auto">
							<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
								<h1 className="text-3xl leading-9 font-bold text-white text-center">
									{post.data.title}
								</h1>
							</div>
						</header>
					</div>

					<main className="-mt-32 container mx-auto md:px-6 lg:px-32">
						<div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
							<div>
								<nav className="sm:hidden">
									<Link href="/blog">
										<a
											href="#"
											className="flex items-center text-sm mb-2 leading-5 font-medium text-gray-400 hover:text-gray-200 transition duration-150 ease-in-out"
										>
											<svg
												className="flex-shrink-0 -ml-1 mr-1 h-5 w-5 text-gray-500"
												viewBox="0 0 20 20"
												fill="currentColor"
											>
												<path
													fillRule="evenodd"
													d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
													clipRule="evenodd"
												/>
											</svg>
											Back
										</a>
									</Link>
								</nav>
								<nav className="hidden sm:flex items-center text-sm leading-5 font-medium mb-2">
									<Link href="/">
										<a
											href="#"
											className="text-gray-400 hover:text-gray-200 transition duration-150 ease-in-out"
										>
											Home
										</a>
									</Link>
									<svg
										className="flex-shrink-0 mx-2 h-5 w-5 text-gray-500"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
											clipRule="evenodd"
										/>
									</svg>
									<Link href="/blog">
										<a
											href="#"
											className="text-gray-400 hover:text-gray-200 transition duration-150 ease-in-out"
										>
											Blogs
										</a>
									</Link>
									<svg
										className="flex-shrink-0 mx-2 h-5 w-5 text-gray-500"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
											clipRule="evenodd"
										/>
									</svg>
									<a
										href="#"
										className="text-gray-400 hover:text-gray-200 transition duration-150 ease-in-out"
									>
										{post.data.title}
									</a>
								</nav>
							</div>
							<div className="bg-white rounded-lg shadow-xl px-5 py-6 sm:px-6 text-lg">
								{RichText.render(post.data.content)}
							</div>
						</div>
					</main>
				</div>
			</article>
		</>
	);
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const response = await Client().getByUID('blog', params.uid);

		return { props: { post: response || null } };
	} catch (error) {
		return { props: { error } };
	}
};

export const getStaticPaths: GetStaticPaths = async () => {
	const response = await Client().query(
		Prismic.Predicates.at('document.type', 'blog')
	);

	const paths =
		response.results.map((post) => {
			return {
				params: {
					uid: `/blog/${post.uid}`,
				},
			};
		}) || [];

	return {
		paths,
		fallback: true,
	};
};

export default BlogDetailPage;
