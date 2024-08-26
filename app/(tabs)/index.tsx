import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Text className="text-red-300">Teste</Text>
    </SafeAreaView>
  );
}
