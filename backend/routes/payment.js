const express = require('express');
const router = express.Router();
const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount) {
            return res.status(400).json({ error: "Amount is required" });
        }

        // Make sure to convert the amount to the smallest currency unit (e.g., cents for USD, paise for INR)
        // Automatic payment methods enabled for a smoother checkout experience
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100),// Convert to smallest currency unit
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