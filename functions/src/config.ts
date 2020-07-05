// Initialize app as admin
import * as admin from 'firebase-admin';
admin.initializeApp();

// Export Firestore database and add custom settings
export const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

// Set environment variables
import * as functions from 'firebase-functions';
export const stripeTestKey = functions.config().stripe.test_key;
export const stripeSecretKey = stripeTestKey; // TODO Replace test key with production key
export const stripePublishableKey = functions.config().stripe.publishable_key;
export const stripeWebhookSecret = functions.config().stripe.webhook_secret;

// Define Stripe product ids. Used to in subscriptionStatus helper function to set isPro or isHobby on user document
export const hobbyProductId = functions.config().stripe.hobby_product_id;
export const proProductId = functions.config().stripe.pro_product_id;

// Initialize Stripe
import Stripe from 'stripe';
export const stripe = new Stripe(stripeSecretKey, { apiVersion: '2020-03-02' });
