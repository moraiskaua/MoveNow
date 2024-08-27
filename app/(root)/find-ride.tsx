import { CustomButton } from '@/components/CustomButton';
import { GoogleTextInput } from '@/components/GoogleTextInput';
import { RideLayout } from '@/components/RideLayout';
import { icons } from '@/contants';
import { routes } from '@/contants/routes';
import { useLocationStore } from '@/store/locationStore';
import { router } from 'expo-router';
import { Text, View } from 'react-native';

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();

  return (
    <RideLayout title="Local" snapPoints={['85%']}>
      <View className="">
        <Text className="text-lg font-JakartaSemiBold mb-3">De</Text>
        <GoogleTextInput
          icon={icons.target}
          initialLocation={userAddress!}
          containerStyle="bg-neutral-100"
          textInputBackgroundColor="#F5F5F5"
          handlePress={location => setUserLocation(location)}
        />
      </View>
      <View className="">
        <Text className="text-lg font-JakartaSemiBold mb-3">Para</Text>
        <GoogleTextInput
          icon={icons.target}
          initialLocation={destinationAddress!}
          containerStyle="bg-neutral-100"
          textInputBackgroundColor="transparent"
          handlePress={location => setDestinationLocation(location)}
        />
      </View>

      <CustomButton
        title="Buscar motorista"
        onPress={() => router.push(routes.root['confirm-ride'])}
        className="mt-5"
      />
    </RideLayout>
  );
};

export default FindRide;
