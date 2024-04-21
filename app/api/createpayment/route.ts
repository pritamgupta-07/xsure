import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


export const POST = async (req: Request) => {
    const body = await req.json();
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 100,
            currency: "usd",
            automatic_payment_methods: {
                enabled: true,
            },
        });
        return new NextResponse(JSON.stringify({ clientSecret: paymentIntent.client_secret }));
    } catch (error) {
        return new NextResponse(`An error occurred :- ${error}`)
    }
};