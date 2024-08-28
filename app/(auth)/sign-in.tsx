import { CustomButton } from '@/components/CustomButton';
import { InputField } from '@/components/InputField';
import { Image, ScrollView, Text, View } from 'react-native';
import OAuth from './OAuth';
import { Link, useRouter } from 'expo-router';
import { routes } from '@/contants/routes';
import { icons, images } from '@/contants';
import { useCallback, useState } from 'react';
import { useSignIn } from '@clerk/clerk-expo';

const Signin = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [error, setError] = useState('');
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleSignIn = useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/');
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      setError(err.errors[0].longMessage);
    }
  }, [isLoaded, form.email, form.password, router, signIn, setActive]);

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[150px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[150px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-3 left-3">
            Crie sua conta
          </Text>
        </View>

        <View className="p-5">
          <InputField
            label="Email"
            placeholder="Digite seu email"
            icon={icons.email}
            value={form.email}
            onChangeText={(email: string) => setForm({ ...form, email })}
          />
          <InputField
            label="Senha"
            placeholder="Digite sua senha"
            icon={icons.lock}
            value={form.password}
            onChangeText={(password: string) => setForm({ ...form, password })}
            secureTextEntry
          />
          {error && <Text className="text-sm text-red-500">{error}</Text>}

          <CustomButton
            title="Entrar"
            onPress={handleSignIn}
            className="mt-6"
          />

          <OAuth />

          <Link
            href={routes.auth['sign-up']}
            className="text-lg text-center text-general-200 mt-5"
          >
            <Text>Ainda não tem conta? </Text>
            <Text className="text-primary-500">Crie agora</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default Signin;
