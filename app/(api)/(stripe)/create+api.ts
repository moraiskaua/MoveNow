import { env } from '@/contants/env';
import { Stripe } from 'stripe';

const stripe = new Stripe(env.SECRET_STRIPE_KEY!);

export const POST = async (request: Request) => {
  const body = await request.json();
  const { name, email, amount } = body;

  if (!name || !email || !amount) {
    return new Response(
      JSON.stringify({ error: 'Something went wrong!', status: 400 }),
    );
  }

  let customer;

  const customerAlreadyExists = await stripe.customers.list({ email });

  if (customerAlreadyExists.data.length > 0) {
    customer = customerAlreadyExists.data[0];
  } else {
    const newCustomer = await stripe.customers.create({
      name,
      email,
    });

    customer = newCustomer;
  }

  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: '2020-08-27' },
  );

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'BRL',
    customer: customer.id,
    automatic_payment_methods: {
      enabled: true,
      allow_redirects: 'never',
    },
  });

  return new Response(
    JSON.stringify({
      paymentIntent,
      ephemeralKey,
      customer: customer.id,
    }),
  );
};
