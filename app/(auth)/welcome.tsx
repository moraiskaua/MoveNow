import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Welcome = () => {
  return (
    <SafeAreaView className="flex-1">
      <Text className="text-black">Welcome Page</Text>
    </SafeAreaView>
  );
};

export default Welcome;
