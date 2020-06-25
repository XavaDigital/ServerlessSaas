This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Firebase

### Create a Firebase project

Go to [https://firebase.google.com/](https://firebase.google.com/), click the "Get started" button and follow the instructions to create your project.

Once your poject is created, you should register your app inside the Firebase console. From the project overview page, click the web icon to add Firebase to your web application. Once created, you will receive your firebase config, wich should look something like this:

```jsx
var firebaseConfig = {
  apiKey: 'xxxx',
  authDomain: 'your-project-name.firebaseapp.com',
  databaseURL: 'https://your-project-name.firebaseio.com',
  projectId: 'your-project-name',
  storageBucket: 'your-project-name.appspot.com',
  messagingSenderId: 'xxx',
  appId: 'xxx',
  measurementId: 'G-xxx',
};
```

We should now activate the sign up methods that we would like to add to our app. Navigate to "Authentication" and start by activating the "Email/password" method.

**Add Firestore**
If you want to save additional information during sign up, like an username or full name, you need to setup a database to save that data. [Cloud Firestore](https://firebase.google.com/docs/firestore) is a flexible, scalable database from Firebase. It offers seamless integration with Firebase and other Google Cloud Platform products, like Cloud Functions. And just like Firebase, it starts compeletly free. Only when your application really starts to scale, you might exceed the free plan, but even then you only pay for what you use. A very interesting price model if you don't want to spend a lot (or any) money when you are just starting out.

If you want to setup Firestore then navigate to "Database" and click the first "Create database" button to add Cloud Firestore to your project. Select the option to start in testmode.

We need the save our Firebase configuration to some [environment variables](https://nextjs.org/docs/basic-features/environment-variables).

Next.js comes with built-in support for environment variables, which allows you to [use `.env.local` to load environment variables](https://nextjs.org/docs/basic-features/environment-variables#loading-environment-variables) and [expose environment variables to the browser](https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser).

Go to your `.env.local` file (or create it if it's not there yet). Then, past in the example below and change the dummy data with your own Firebase credentials.

```jsx
NEXT_PUBLIC_FIREBASE_API_KEY = 'yourapikey';
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = 'yourappname.firebaseapp.com';
NEXT_PUBLIC_FIREBASE_DATABASE_URL = 'https://yourappname.firebaseio.com';
NEXT_PUBLIC_FIREBASE_PROJECT_ID = 'yourappname';
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = 'yourappname.appspot.com';
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = 'yoursenderid';
NEXT_PUBLIC_FIREBASE_APP_ID = 'yourappid';
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID = 'yourmeasurementid';
```

K
eep in mind that when you deploy your application, you first need to set your production environment variables. When deploying on [Vercel](https://vercel.com) you can configure secrets in the [Environment Variables](https://vercel.com/docs/v2/build-step#environment-variables) section of the project in the Vercel dashboard.

## Prismic

@NOTE This feature is only partly done! It's only implemented for blog posts.

To setup prismic, follow these instructions:

Step 1. Create an account and a repository on Prismic
First, create an account on Prismic.

After creating an account, create a repository from the dashboard and assign to it any name of your liking.

Step 2. Create an author type
From the repository page, create a new custom type:

The name should be author.
Next, add these fields (you don't have to modify the settings):

name - Key Text field
picture - Image field
Alternatively, you can copy the JSON in types/author.json, then click on JSON editor and paste it there.

Save the type and continue.

Step 3. Create a post type
From the repository page, create a new custom type:

The name should be post.
Next, add these fields (you don't have to modify the settings unless specified):

title - Key Text field
subtitle - Key Text field (optional)
content - Rich Text field
summary - Key Text field
image - Image field
date - Date field
author - Content relationship field, you may also add author to the Constraint to custom type option to only accept documents from the author type.
slug - UID field.
Alternatively, you can copy the JSON in types/post.json, then click on JSON editor and paste it there.

Save the type and continue.

Step 4. Populate Content
Go to the Content page, it's in the menu at the top left, then click on Create new and select the author type:

You just need 1 author document.
Use dummy data for the text.
For the image, you can download one from Unsplash.
Next, select Post and create a new document.

We recommend creating at least 2 or 3 Post documents.
Use dummy data for the text.
You can write markdown for the content field.
For images, you can download them from Unsplash.
Pick the author you created earlier.
Important: For each document, you need to click Publish after saving. If not, the document will be in the draft state.

Step 5. Set up environment variables
To generate a token, follow these steps on Prismic:

Go to your repository's Settings / API & Security
At the bottom find the section called "Generate an Access Token"
Add an application name. This doesn't matter much, you can add something like "My Website"
Click the "Add this application" button

Next, set each variable on .env.local:

PRISMIC_API_TOKEN should be the Permanent access token you just created
PRISMIC_REPOSITORY_NAME is the name of your repository (the one in the URL)
PRISMIC_REPOSITORY_LOCALE is the locale of your repository. Defaults to en-us

Your .env.local file should look like this:

NEXT_PUBLIC_PRISMIC_API_ENDPOINT=...
NEXT_PUBLIC_PRISMIC_ACCESS_TOKEN=...
NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME=...
NEXT_PUBLIC_PRISMIC_REPOSITORY_LOCALE=...

Make sure the locale matches your settings in the Prismic dashboard.
