const express = require('express');
const router = express.Router();
const Stripe = require('stripe');

// নিশ্চিত করো যে তোমার .env ফাইলে STRIPE_SECRET_KEY দেওয়া আছে
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount) {
            return res.status(400).json({ error: "Amount is required" });
        }

        // Stripe PaymentIntent তৈরি করা হচ্ছে
        // 'automatic_payment_methods: { enabled: true }' দিলে কার্ড এবং UPI/GPay স্বয়ংক্রিয়ভাবে চলে আসবে
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // সেন্ট/পয়সায় রূপান্তর
            currency: 'inr', 
            automatic_payment_methods: { 
                enabled: true 
            },
        });

        res.status(200).json({ 
            clientSecret: paymentIntent.client_secret 
        });
    } catch (error) {
        console.error("Stripe Error:", error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;