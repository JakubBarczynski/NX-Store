const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

// Create checkout session
router.post("/", async (req, res) => {
    const { cartItems, customerEmail } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            customer_email: customerEmail,
            line_items: cartItems.map(item => ({
                price_data: {
                    currency: "gbp",
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: Math.round(item.price * 100),
                },
                quantity: item.quantity,
            })),
            mode: "payment",
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cart",
            metadata: {
                cartItems: JSON.stringify(cartItems)
            }
        });

        res.json({ url: session.url });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
});

// Stripe webhook - listens for successful payments
router.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error("Webhook error:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const customerEmail = session.customer_email;
        const cartItems = JSON.parse(session.metadata.cartItems);
        const total = (session.amount_total / 100).toFixed(2);

        const itemList = cartItems.map(item => 
            `${item.name} x${item.quantity} — £${(item.price * item.quantity).toFixed(2)}`
        ).join("\n");

        // Email to customer
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: customerEmail,
            subject: "Your NX Gift Box Order Confirmation",
            text: `Thank you for your order!\n\n${itemList}\n\nTotal: £${total}\n\nWe'll be in touch shortly.`
        });

        // Email to owner
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: process.env.OWNER_EMAIL,
            subject: "New Order Received!",
            text: `A new order has been placed!\n\nCustomer: ${customerEmail}\n\n${itemList}\n\nTotal: £${total}`
        });
    }

    res.json({ received: true });
});

module.exports = router;