const configureStripe = require('stripe');

const STRIPE_SECRET_KEY = process.env.NODE_ENV === 'production'
    ? 'sk_test_RURjUKmpZ3wVDmLRhYeY3ALy'
    : 'sk_test_RURjUKmpZ3wVDmLRhYeY3ALy';

const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;