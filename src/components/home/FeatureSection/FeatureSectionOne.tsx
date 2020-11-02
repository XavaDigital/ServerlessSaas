const FeatureSectionOne = ({ title, description, features }) => {
  return (
    <section className="text-gray-700 body-font" id="features">
      <div className="container px-5 py-24 mx-auto">
        <div className="mb-20 text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl title-font">
            {title}
          </h1>
          <p className="mx-auto text-base leading-relaxed xl:w-2/4 lg:w-3/4">
            {description}
          </p>
          <div className="flex justify-center mt-6">
            <div className="inline-flex w-16 h-1 rounded-full bg-royal-blue-500"></div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-4 -mt-4 -mb-10 sm:-m-4">
          {features?.map((feature, i) => {
            return (
              <div
                className="flex flex-col items-center p-4 mb-6 text-center md:w-1/3 md:mb-0"
                key={i}
              >
                <div className="inline-flex items-center justify-center flex-shrink-0 w-20 h-20 mb-5 rounded-full bg-royal-blue-100 text-royal-blue-500">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-10 h-10"
                    viewBox="0 0 24 24"
                  >
                    {i === 0 && <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>}
                    {i === 1 && (
                      <>
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </>
                    )}
                    {i === 2 && (
                      <>
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </>
                    )}
                  </svg>
                </div>
                <div className="flex-grow">
                  <h2 className="mb-3 text-lg font-medium text-gray-900 title-font">
                    {feature.name}
                  </h2>
                  <p className="text-base leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <button className="flex px-8 py-2 mx-auto mt-16 text-lg text-white border-0 rounded bg-royal-blue-500 focus:outline-none hover:bg-royal-blue-600">
          Start Free
        </button>
      </div>
    </section>
  );
};

export default FeatureSectionOne;
