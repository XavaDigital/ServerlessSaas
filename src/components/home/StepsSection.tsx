import { getIcon } from 'utils/getIcon';

interface Props {
  version: number;
  image: string;
  steps: Array<{
    name: string;
    description: string;
  }>;
}

const StepsSection: React.FC<Props> = ({ image, steps, version }) => {
  if (version === 2) {
    return (
      <section className="text-gray-700 body-font">
        <div className="container flex flex-wrap px-5 py-24 mx-auto">
          {steps?.map((step, i) => {
            return (
              <div className="relative flex pt-10 pb-20 mx-auto sm:items-center md:w-2/3">
                <div className="absolute inset-0 flex items-center justify-center w-6 h-full">
                  <div className="w-1 h-full bg-gray-200 pointer-events-none"></div>
                </div>
                <div className="relative z-10 inline-flex items-center justify-center flex-shrink-0 w-6 h-6 mt-10 text-sm font-medium text-white bg-indigo-500 rounded-full sm:mt-0 title-font">
                  {i + 1}
                </div>
                <div className="flex flex-col items-start flex-grow pl-6 md:pl-8 sm:items-center sm:flex-row">
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-24 h-24 text-indigo-500 bg-indigo-100 rounded-full">
                    {getIcon(i, 12)}
                  </div>
                  <div className="flex-grow mt-6 sm:pl-6 sm:mt-0">
                    <h2 className="mb-1 text-xl font-medium text-gray-900 title-font">
                      {step.name}
                    </h2>
                    <p className="leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  if (version === 3) {
    return (
      <section className="text-gray-700 body-font">
        <div className="container flex flex-col flex-wrap px-5 py-24 mx-auto">
          <div className="flex flex-wrap mx-auto mb-20">
            {steps?.map((step, i) => {
              return (
                <a
                  className={`inline-flex items-center justify-center w-1/2 py-3 font-medium leading-none tracking-wider border-b-2  rounded-t sm:px-6 sm:w-auto sm:justify-start title-font ${
                    i > 0
                      ? 'border-gray-200 hover:text-gray-900'
                      : 'text-indigo-500 bg-gray-100 border-indigo-500'
                  }`}
                >
                  {getIcon(i, 5)} {`STEP ${i + 1}`}
                </a>
              );
            })}
          </div>
          <img
            className="block object-cover object-center w-2/3 mx-auto mb-10 rounded xl:w-1/4 lg:w-1/3 md:w-1/2"
            src={image}
            alt="step"
            loading="lazy"
          />
          <div className="flex flex-col w-full text-center">
            <h1 className="mb-4 text-xl font-medium text-gray-900 title-font">
              {steps[0].name}
            </h1>
            <p className="mx-auto text-base leading-relaxed lg:w-2/3">
              {steps[0].description}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="text-gray-700 body-font">
      <div className="container flex flex-wrap px-5 py-24 mx-auto">
        <div className="flex flex-wrap w-full">
          <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
            {steps?.map((step, i) => {
              return (
                <div className="relative flex pb-12" key={i}>
                  <div className="absolute inset-0 flex items-center justify-center w-10 h-full">
                    {i !== steps.length - 1 && (
                      <div className="w-1 h-full bg-gray-200 pointer-events-none"></div>
                    )}
                  </div>
                  <div className="relative z-10 inline-flex items-center justify-center flex-shrink-0 w-10 h-10 text-white bg-indigo-500 rounded-full">
                    {getIcon(i)}
                  </div>
                  <div className="flex-grow pl-4">
                    <h2 className="mb-1 text-sm font-bold tracking-wider text-gray-900 title-font">
                      {step.name}
                    </h2>
                    <p className="leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <img
            className="object-cover object-center mt-12 rounded-lg lg:w-3/5 md:w-1/2 md:mt-0"
            src={image}
            alt="step"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
