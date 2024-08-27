import { CustomButton } from '@/components/CustomButton';
import { InputField } from '@/components/InputField';
import { icons, images } from '@/contants';
import { routes } from '@/contants/routes';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import OAuth from './OAuth';
import { useSignUp } from '@clerk/clerk-expo';
import ReactNativeModal from 'react-native-modal';
import { fetchAPI } from '@/lib/fetch';

const Signup = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [verification, setVerification] = useState({
    state: 'default',
    error: '',
    code: '',
  });
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSignUp = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      setVerification({ ...verification, state: 'pending' });
    } catch (err: any) {
      setError(err.errors[0].longMessage);
    }
  };

  const handleVerify = async () => {
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === 'complete') {
        await fetchAPI('/(api)/user', {
          method: 'POST',
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: completeSignUp.createdUserId,
          }),
        });
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({ ...verification, state: 'success' });
      } else {
        setVerification({
          ...verification,
          error: 'A verificação falhou',
          state: 'failed',
        });
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: 'failed',
      });
    }
  };

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
          {error && <Text className="text-sm text-red-500">{error}</Text>}

          <CustomButton
            title="Criar conta"
            onPress={handleSignUp}
            className="mt-6"
          />

          <OAuth />

          <Link
            href={routes.auth['sign-in']}
            className="text-lg text-center text-general-200 mt-5"
          >
            <Text>Já possui uma conta? </Text>
            <Text className="text-primary-500">Acessar</Text>
          </Link>
        </View>

        <ReactNativeModal
          isVisible={verification.state === 'pending'}
          onModalHide={() =>
            verification.state === 'success' && setShowSuccessModal(true)
          }
        >
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="text-2xl font-JakartaExtraBold mb-2">
              Verificação
            </Text>
            <Text className="font-Jakarta mb-5">
              Enviamos um código de verificação para {form.email}
            </Text>

            <InputField
              label="Código"
              icon={icons.lock}
              placeholder="12345"
              value={verification.code}
              onChangeText={code => setVerification({ ...verification, code })}
              keyboardType="numeric"
            />

            {verification.error && (
              <Text className="text-red-500">{verification.error}</Text>
            )}

            <CustomButton
              title="Verificar Email"
              onPress={handleVerify}
              className="mt-5 bg-success-500"
            />
          </View>
        </ReactNativeModal>

        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className="w-[110px] h-[110px] mx-auto my-5"
            />

            <Text className="text-3xl font-JakartaBold text-center">
              Verificado!
            </Text>
            <Text className="text-base text-gray-400 font-JakartaRegular text-center mt-2">
              Conta verificada com succeso.
            </Text>

            <CustomButton
              title="Começar"
              onPress={() => {
                setShowSuccessModal(false);
                router.push(routes.root.home);
              }}
              className="mt-5"
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default Signup;
