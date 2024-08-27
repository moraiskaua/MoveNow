import { CustomButton } from '@/components/CustomButton';
import { InputField } from '@/components/InputField';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OAuth from './OAuth';
import { Link } from 'expo-router';
import { routes } from '@/contants/routes';
import { icons, images } from '@/contants';
import { useState } from 'react';

const Signin = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleSignIn = async () => {};

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

        {/* Verification Modal */}
      </View>
    </ScrollView>
  );
};

export default Signin;
