import Link from 'next/link';

const HeroSection = (): JSX.Element => {
	return (
		<section className="text-gray-700 body-font">
			<div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
				<div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
					<h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
						The best software
						<br className="hidden lg:inline-block" />
						in the world
					</h1>
					<p className="mb-8 leading-relaxed">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat.
					</p>
					<div className="flex justify-center">
						<button className="inline-flex text-white bg-mariner-500 border-0 py-2 px-6 focus:outline-none hover:bg-mariner-600 rounded text-lg">
							Button
						</button>
						<button className="ml-4 inline-flex text-gray-700 bg-gray-200 border-0 py-2 px-6 focus:outline-none hover:bg-gray-300 rounded text-lg">
							Button
						</button>
					</div>
				</div>
				<div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
					<img
						className="object-cover object-center rounded"
						alt="hero"
						src="https://dummyimage.com/720x600"
					/>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
