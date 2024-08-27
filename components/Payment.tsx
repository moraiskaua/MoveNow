import { CustomButton } from './CustomButton';
import { useState } from 'react';
import { useStripe } from '@stripe/stripe-react-native';
import { useAuth } from '@clerk/clerk-expo';
import { useLocationStore } from '@/store/locationStore';
import { PaymentProps } from '@/types/type';
import { fetchAPI } from '@/lib/fetch';

export const Payment = ({
  fullName,
  email,
  amount,
  driverId,
  rideTime,
}: PaymentProps) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const {
    userAddress,
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationAddress,
    destinationLongitude,
  } = useLocationStore();
  const { userId } = useAuth();
  const [success, setSuccess] = useState(false);

  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: 'MoveNow',
      intentConfiguration: {
        mode: {
          amount: 1099,
          currencyCode: 'BRL',
        },
        confirmHandler: () => {},
      },
    });
  };

  const confirmHandler = async ({
    paymentMethod,
    _,
    intentCreationCallback,
  }) => {
    const { paymentIntent, customer } = await fetchAPI(
      '/(api)/(stripe)/create',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: fullName || email.split('@')[0],
          email,
          amount,
          paymentMethodId: paymentMethod.id,
        }),
      },
    );

    if (paymentIntent.client_secret) {
      const { result } = await fetchAPI('/(api)/(stripe)/pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payment_method_id: paymentMethod.id,
          payment_intent_id: paymentIntent.id,
          customer_id: customer,
        }),
      });

      if (result.client_secret) {
        //
      }
    }
  };

  const openPaymentSheet = async () => {
    await initializePaymentSheet();
    const { error } = await presentPaymentSheet();

    if (!error) {
      setSuccess(true);
    }
  };

  return (
    <>
      <CustomButton
        title="Confirmar Corrida"
        className="my-5"
        onPress={openPaymentSheet}
      />
    </>
  );
};
