import BlogCard from 'components/home/BlogCard';

const BlogSection: React.FC<{ posts: any }> = ({ posts }) => {
  return (
    <section className="text-gray-700 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="text-center w-full mb-20">
          <h1 className="text-2xl font-medium title-font mb-4 text-gray-900 tracking-widest">
            FROM OUR BLOG
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            We blog about all kinds of stuff
          </p>
        </div>
        <div className="flex flex-wrap -m-4 mt-4">
          {posts?.map((post, i) => {
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
