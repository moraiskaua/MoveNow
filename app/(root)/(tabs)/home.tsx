import { SignedIn, useUser } from '@clerk/clerk-expo';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const { user } = useUser();

  return (
    <SafeAreaView className="flex-1">
      <SignedIn>
        <Text className="text-black">
          Hello {user?.emailAddresses[0].emailAddress}
        </Text>
      </SignedIn>
    </SafeAreaView>
  );
};

export default Home;
