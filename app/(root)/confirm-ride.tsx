import { CustomButton } from '@/components/CustomButton';
import { DriverCard } from '@/components/DriverCard';
import { RideLayout } from '@/components/RideLayout';
import { routes } from '@/contants/routes';
import { useDriverStore } from '@/store/locationStore';
import { router } from 'expo-router';
import { FlatList, View } from 'react-native';

const ConfirmRide = () => {
  const { drivers, selectedDriver, setSelectedDriver } = useDriverStore();

  return (
    <RideLayout title="Motoristas" snapPoints={['65%', '85%']}>
      <FlatList
        data={drivers}
        renderItem={({ item }) => (
          <DriverCard
            item={item}
            selected={selectedDriver!}
            setSelected={() => setSelectedDriver(Number(item.id))}
          />
        )}
        ListFooterComponent={() => (
          <View className="mx-5 mt-5">
            <CustomButton
              title="Escolher"
              onPress={() => router.push(routes.root['book-ride'])}
              disabled={!selectedDriver}
            />
          </View>
        )}
      />
    </RideLayout>
  );
};

export default ConfirmRide;
