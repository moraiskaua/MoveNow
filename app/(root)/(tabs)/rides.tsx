import { RideCard } from '@/components/RideCard';
import { images } from '@/contants';
import { useFetch } from '@/lib/fetch';
import { Ride } from '@/types/type';
import { useUser } from '@clerk/clerk-expo';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Rides = () => {
  const { user } = useUser();
  const { data: rides, loading } = useFetch<Ride[]>(`/(api)/ride/${user?.id}`);

  return (
    <SafeAreaView className="flex-1">
      <FlatList
        data={rides}
        renderItem={({ item }) => <RideCard ride={item} />}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center">
            {!loading ? (
              <>
                <Image
                  source={images.noResult}
                  className="w-40 h-40"
                  resizeMode="contain"
                />
                <Text>Você não possui corridas recentes</Text>
              </>
            ) : (
              <ActivityIndicator size="small" color="#000" />
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <>
            <Text className="text-xl font-JakartaBold mt-5 mb-3">
              Todas as Corridas
            </Text>
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default Rides;
