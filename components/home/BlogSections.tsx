import BlogCard from 'components/BlogCard';

interface Props {
	posts: Post[];
}

const BlogSection: React.FC<Props> = ({ posts }) => {
	if (!posts) return null;

	return (
		<section className="text-gray-700 body-font">
			<div className="container px-5 py-24 mx-auto">
				<div className="flex flex-wrap -m-4">
					{posts.map((post, i) => {
						return (
							<div className="p-4 md:w-1/3" key={i}>
								<BlogCard post={post} />
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default BlogSection;
