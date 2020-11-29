import BlogCard from 'components/home/BlogCard';
import { useEffect, useState } from 'react';

const BlogSection: React.FC<{
  version: number;
  title: string;
  description: string;
  slugs: string[];
}> = ({ title, description, slugs, version }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const postsPromises = await slugs.map(async (slug) => {
        return import(`../../content/posts/${slug}.md`);
      });

      Promise.all(postsPromises).then(setPosts);
    };

    getPosts();
  }, [slugs]);

  return (
    <section className="text-gray-700 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="w-full mb-20 text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl title-font">
            {title}
          </h1>
          <p className="mx-auto text-base leading-relaxed lg:w-2/3">
            {description}
          </p>
        </div>
        <div className="flex flex-wrap mt-4 -m-4">
          {posts?.map((post, i) => {
            return (
              <div className="p-4 md:w-1/3" key={i}>
                <BlogCard post={post} version={version} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
