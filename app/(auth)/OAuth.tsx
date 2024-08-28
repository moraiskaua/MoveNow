import { CustomButton } from '@/components/CustomButton';
import { icons } from '@/contants';
import { googleOAuth } from '@/lib/auth';
import { useOAuth } from '@clerk/clerk-expo';
import { useCallback } from 'react';
import { Image, Text, View } from 'react-native';

const OAuth = () => {
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const handleGoogleSignIn = useCallback(async () => {
    try {
      const result = await googleOAuth(startOAuthFlow);
    } catch {}
  }, []);

  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg">Ou</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>

      <CustomButton
        title="Entrar com google"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="w-5 h-5 mx-2"
          />
        )}
        bgVariant="outline"
        textVariant="primary"
        className="mt-5 w-full shadow-none"
        onPress={handleGoogleSignIn}
      />
    </View>
  );
};

export default OAuth;
