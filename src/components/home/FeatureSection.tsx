import { getIcon } from 'utils/getIcon';

interface Props {
  title: string;
  description: string;
  features: Array<{
    name: string;
    description: string;
  }>;
  version: number;
}

const FeatureSection: React.FC<Props> = ({
  title,
  description,
  features,
  version,
}) => {
  if (version === 2) {
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
                <div className="p-4 md:w-1/3" key={i}>
                  <div className="flex flex-col h-full p-8 bg-gray-100 rounded-lg">
                    <div className="flex items-center mb-3">
                      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 mr-3 text-white bg-indigo-500 rounded-full">
                        {getIcon(i, 5)}
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
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
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
  }

  if (version === 3) {
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
                <div className="flex flex-col items-center pb-10 mx-auto mb-10 border-b border-gray-200 lg:w-3/5 sm:flex-row">
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-20 h-20 text-indigo-500 bg-indigo-100 rounded-full sm:w-32 sm:h-32 sm:mr-10">
                    {getIcon(i, 10)}
                  </div>
                  <div className="flex-grow mt-6 text-center sm:text-left sm:mt-0">
                    <h2 className="mb-2 text-lg font-medium text-gray-900 title-font">
                      {feature.name}
                    </h2>
                    <p className="text-base leading-relaxed">
                      {feature.description}
                    </p>
                    <a className="inline-flex items-center mt-3 text-indigo-500">
                      Learn More
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

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
            <div className="inline-flex w-16 h-1 bg-indigo-500 rounded-full"></div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-4 -mt-4 -mb-10 sm:-m-4">
          {features?.map((feature, i) => {
            return (
              <div
                className="flex flex-col items-center p-4 mb-6 text-center md:w-1/3 md:mb-0"
                key={i}
              >
                <div className="inline-flex items-center justify-center flex-shrink-0 w-20 h-20 mb-5 text-indigo-500 bg-indigo-100 rounded-full">
                  {getIcon(i, 8)}
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
        <button className="flex px-8 py-2 mx-auto mt-16 text-lg text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600">
          Start Free
        </button>
      </div>
    </section>
  );
};

export default FeatureSection;
