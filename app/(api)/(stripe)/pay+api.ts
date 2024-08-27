import { env } from '@/contants/env';
import { Stripe } from 'stripe';

const stripe = new Stripe(env.SECRET_STRIPE_KEY!);

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { payment_method_id, payment_intent_id, customer_id } = body;

    if (!payment_method_id || !payment_intent_id || !customer_id) {
      return new Response(
        JSON.stringify({
          error: 'Missing required payment informations!',
          status: 400,
        }),
      );
    }

    const paymentMethod = await stripe.paymentMethods.attach(
      payment_method_id,
      {
        customer: customer_id,
      },
    );

    const result = await stripe.paymentIntents.confirm(payment_intent_id, {
      payment_method: payment_method_id,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Payment confirmed successfully!',
        result,
      }),
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error,
        status: 500,
      }),
    );
  }
};
