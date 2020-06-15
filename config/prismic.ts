import PrismicLib from 'prismic-javascript';

export const prismicConfig = {
	apiEndpoint: process.env.apiEndpoint,
	accessToken: process.env.accessToken,
	repoName: process.env.repoName,
	repoLocale: process.env.repoLocale,
};

let frontClient;

export const Client = (req = null) => {
	if (!req && frontClient) return frontClient;
	//prevent generate new instance for client side since we don't need the refreshed request object.
	else {
		const options = Object.assign(
			{},
			req ? { req } : {},
			prismicConfig.accessToken
				? { accessToken: prismicConfig.accessToken }
				: {}
		);

		return PrismicLib.client(prismicConfig.apiEndpoint, options);
	}
};

export const Prismic = PrismicLib;
