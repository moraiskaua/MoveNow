import { useLocationStore } from '@/store/locationStore';
import { Text, View } from 'react-native';

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();

  return (
    <View>
      <Text className="text-2xl">Você está aqui: {userAddress}</Text>
      <Text className="text-2xl">Você vai para: {destinationAddress}</Text>
    </View>
  );
};

export default FindRide;
