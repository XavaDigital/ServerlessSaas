module.exports = {
	env: {
		// Firebase
		apiKey: process.env.FIREBASE_API_KEY,
		authDomain: process.env.FIREBASE_AUTH_DOMAIN,
		databaseURL: process.env.FIREBASE_DATABASE_URL,
		projectId: process.env.FIREBASE_PROJECT_ID,
		storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
		messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
		appId: process.env.FIREBASE_APP_ID,
		measurementId: process.env.FIREBASE_MEASUREMENT_ID,

		// Prismic
		apiEndpoint: process.env.PRISMIC_API_ENDPOINT,
		accessToken: process.env.PRISMIC_ACCESS_TOKEN,
		repoName: process.env.PRISMIC_REPOSITORY_NAME,
		repoLocale: process.env.PRISMIC_REPOSITORY_LOCALE,
	},
};
