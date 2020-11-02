interface Props {
  version: number;
  title: string;
  description: string;
  image: string;
}

const HeroSection: React.FC<Props> = ({
  version,
  title,
  description,
  image,
}): JSX.Element => {
  // Version with hero image on the left
  if (version === 2) {
    return (
      <section className="text-gray-700 body-font">
        <div className="container flex flex-col items-center px-5 py-24 mx-auto md:flex-row">
          <div className="w-5/6 mb-10 lg:max-w-lg lg:w-full md:w-1/2 md:mb-0">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={image}
              loading="lazy"
            />
          </div>
          <div className="flex flex-col items-center text-center lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 md:items-start md:text-left">
            <h1 className="mb-4 text-3xl font-medium text-gray-900 title-font sm:text-4xl">
              {title}
            </h1>
            <p className="mb-8 leading-relaxed">{description}</p>
            <div className="flex justify-center">
              <button className="inline-flex px-6 py-2 text-lg text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600">
                Button
              </button>
              <button className="inline-flex px-6 py-2 ml-4 text-lg text-gray-700 bg-gray-200 border-0 rounded focus:outline-none hover:bg-gray-300">
                Button
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Hero image in the middle
  if (version === 3) {
    return (
      <section className="text-gray-700 body-font">
        <div className="container flex flex-col items-center justify-center px-5 py-24 mx-auto">
          <img
            className="object-cover object-center w-5/6 mb-10 rounded lg:w-2/6 md:w-3/6"
            alt="hero"
            src={image}
            loading="lazy"
          />
          <div className="w-full text-center lg:w-2/3">
            <h1 className="mb-4 text-3xl font-medium text-gray-900 title-font sm:text-4xl">
              {title}
            </h1>
            <p className="mb-8 leading-relaxed">{description}</p>
            <div className="flex justify-center">
              <button className="inline-flex px-6 py-2 text-lg text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600">
                Button
              </button>
              <button className="inline-flex px-6 py-2 ml-4 text-lg text-gray-700 bg-gray-200 border-0 rounded focus:outline-none hover:bg-gray-300">
                Button
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Default return version 1, with hero image on the right
  return (
    <section className="text-gray-700 body-font">
      <div className="container flex flex-col items-center px-5 py-24 mx-auto md:flex-row">
        <div className="flex flex-col items-center mb-16 text-center lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 md:items-start md:text-left md:mb-0">
          <h1 className="mb-4 text-3xl font-bold text-gray-900 title-font sm:text-4xl">
            {title}
          </h1>
          <p className="mb-8 leading-relaxed">{description}</p>
          <div className="flex justify-center">
            <button className="inline-flex px-6 py-2 text-lg text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600">
              Login
            </button>

            <button className="inline-flex px-6 py-2 ml-4 text-lg text-gray-700 bg-gray-200 border-0 rounded focus:outline-none hover:bg-gray-300">
              Sign Up
            </button>
          </div>
        </div>
        <div className="w-5/6 lg:max-w-lg lg:w-full md:w-1/2">
          <img
            className="object-cover object-center rounded"
            alt="hero"
            src={image}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
