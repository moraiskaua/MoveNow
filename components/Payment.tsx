import { CustomButton } from './CustomButton';
import { useState } from 'react';
import { useStripe } from '@stripe/stripe-react-native';
import { useAuth } from '@clerk/clerk-expo';
import { useLocationStore } from '@/store/locationStore';
import { PaymentProps } from '@/types/type';
import { fetchAPI } from '@/lib/fetch';
import ReactNativeModal from 'react-native-modal';
import { Image, Text, View } from 'react-native';
import { images } from '@/contants';
import { router } from 'expo-router';
import { routes } from '@/contants/routes';

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
    await initPaymentSheet({
      merchantDisplayName: 'MoveNow',
      intentConfiguration: {
        mode: {
          amount: parseInt(amount) * 100,
          currencyCode: 'BRL',
        },
        confirmHandler: async (paymentMethod, _, intentCreationCallback) => {
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
                amount: parseInt(amount) * 100,
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
                client_secret: paymentIntent.client_secret,
              }),
            });

            if (result.client_secret) {
              await fetchAPI('/(api)/ride/create', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  origin_address: userAddress,
                  destination_address: destinationAddress,
                  origin_latitude: userLatitude,
                  origin_longitude: userLongitude,
                  destination_latitude: destinationLatitude,
                  destination_longitude: destinationLongitude,
                  ride_time: rideTime.toFixed(0),
                  fare_price: parseInt(amount) * 100,
                  payment_status: 'paid',
                  driver_id: driverId,
                  user_id: userId,
                }),
              });

              intentCreationCallback({
                clientSecret: result.client_secret,
              });
            }
          }
        },
      },
      returnURL: 'MoveNow://book-ride',
    });
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

      <ReactNativeModal
        isVisible={success}
        onBackdropPress={() => setSuccess(false)}
      >
        <View className="flex flex-col items-center justify-center bg-white p-7 rounded-2xl">
          <Image source={images.check} className="w-28 h-28 mt-5" />

          <Text className="text-2xl text-center font-JakartaBold mt-5">
            Corrida confirmada!
          </Text>

          <Text className="text-base text-general-200 font-JakartaMedium text-center mt-3">
            Porfavor, aguarde no local de partida.
          </Text>

          <CustomButton
            title="Voltar ao início"
            onPress={() => {
              setSuccess(false);
              router.push(routes.root.tabs.home);
            }}
            className="mt-5"
          />
        </View>
      </ReactNativeModal>
    </>
  );
};
