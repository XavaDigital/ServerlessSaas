const FeatureSectionTwo = ({ title, description, features }) => {
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
        </div>
        <div className="flex flex-wrap -m-4">
          {features?.map((feature, i) => {
            return (
              <div className="p-4 md:w-1/3">
                <div className="flex flex-col h-full p-8 bg-gray-100 rounded-lg">
                  <div className="flex items-center mb-3">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 mr-3 text-white bg-indigo-500 rounded-full">
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
                    <h2 className="text-lg font-medium text-gray-900 title-font">
                      {feature.name}
                    </h2>
                  </div>
                  <div className="flex-grow">
                    <p className="text-base leading-relaxed">
                      {feature.description}
                    </p>
                    <a className="inline-flex items-center mt-3 text-indigo-500">
                      Learn More
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureSectionTwo;
