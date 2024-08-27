import { CustomButton } from '@/components/CustomButton';
import { InputField } from '@/components/InputField';
import { icons, images } from '@/contants';
import { routes } from '@/contants/routes';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSignUp = async () => {};

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Crie sua conta
          </Text>
        </View>

        <View className="p-5">
          <InputField
            label="Nome"
            placeholder="Digite seu nome"
            icon={icons.person}
            value={form.name}
            onChangeText={(name: string) => setForm({ ...form, name })}
          />
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
            title="Criar conta"
            onPress={handleSignUp}
            className="mt-6"
          />

          {/* OAUTH */}

          <Link
            href={routes.auth['sign-in']}
            className="text-lg text-center text-general-200 mt-5"
          >
            <Text>Já possui uma conta? </Text>
            <Text className="text-primary-500">Acessar</Text>
          </Link>
        </View>

        {/* Verification Modal */}
      </View>
    </ScrollView>
  );
};

export default Signup;
