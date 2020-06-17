import PrismicLib from 'prismic-javascript';
import { DefaultClient } from 'prismic-javascript/types/client';

export const prismicConfig = {
  apiEndpoint: process.env.NEXT_PUBLIC_PRISMIC_API_ENDPOINT,
  accessToken: process.env.NEXT_PUBLIC_PRISMIC_ACCESS_TOKEN,
  repoName: process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME,
  repoLocale: process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY_LOCALE,
};

let frontClient;

export const Client = (req = null): DefaultClient => {
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
