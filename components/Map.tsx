import { Text, View } from 'react-native';
import MapView, { PROVIDER_DEFAULT } from 'react-native-maps';

export const Map = () => {
  // const region = {}

  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      className="w-full h-full rounded-2xl"
      tintColor="black"
      mapType="mutedStandard"
      showsPointsOfInterest={false}
      // initialRegion={region}
      userInterfaceStyle="light"
      showsUserLocation
    >
      <Text>Map</Text>
    </MapView>
  );
};
