import { GoogleInputProps } from '@/types/type';
import { Text, View } from 'react-native';

export const GoogleTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) => (
  <View
    className={`flex flex-row items-center justify-center relative z-50 rounded-xl mb-5 ${containerStyle}`}
  >
    <Text>Procurar</Text>
  </View>
);
