import { GoogleTextInput } from '@/components/GoogleTextInput';
import { Map } from '@/components/Map';
import { RideCard } from '@/components/RideCard';
import { icons, images } from '@/contants';
import { recentRides } from '@/contants/recentRides';
import { useUser } from '@clerk/clerk-expo';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const { user } = useUser();
  const loading = true;

  const handleSignOut = () => {};

  const handleDestinationPress = () => {};

  return (
    <SafeAreaView className="flex-1">
      <FlatList
        data={recentRides.slice(0, 3)}
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
            <View className="flex flex-row items-center justify-between my-5">
              <Text className="text-xl font-JakartaExtraBold">
                Bem-vindo,{' '}
                {user?.firstName ||
                  user?.emailAddresses[0].emailAddress.split('@')[0]}{' '}
                👋
              </Text>
              <TouchableOpacity
                onPress={handleSignOut}
                className="justify-center items-center w-10 h-10"
              >
                <Image source={icons.out} className="w-5 h-5" />
              </TouchableOpacity>
            </View>

            <GoogleTextInput
              icon={icons.search}
              containerStyle="bg-white shadow-md shadow-neutral-300"
              handlePress={handleDestinationPress}
            />

            <>
              <Text className="text-xl font-JakartaBold mt-5 mb-3">
                Sua localização
              </Text>
              <View className="flex flex-row items-center bg-transparent h-[300px]">
                <Map />
              </View>
            </>

            <Text className="text-xl font-JakartaBold mt-5 mb-3">
              Corridas Recentes
            </Text>
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
