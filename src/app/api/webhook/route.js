import { Order } from '@/app/models/order';
import mongoose from 'mongoose';

const stripe = require('stripe')(process.env.STRIPE_SK);


export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL);
    const sig = req.headers.get('stripe-signature');
    let event;

    try {
        const reqBuffer = await req.text();
        const signSecret = process.env.STRIPE_SIGN_SECRET;
        event = stripe.webhooks.constructEvent(reqBuffer, sig, signSecret);
    } catch (err) {
        console.log('STRIPE ERROR');
        return Response.json(e, { status: 400 });
    }

    // console.log(event);

    if (event.type === 'checkout.session.completed') {
        // console.log(event);
        const orderId = event?.data?.object?.metadata?.orderId;
        const isPaid = event?.data?.object?.payment_status === 'paid';

        if (isPaid) {
            await Order.updateOne({ _id: orderId }, { paid: true })
        }

        console.log({ 'orderId': orderId });
    }

    return Response.json('ok', { status: 200 });
}