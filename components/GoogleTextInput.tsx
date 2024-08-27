import { GoogleInputProps } from '@/types/type';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Image, Text, View } from 'react-native';
import { icons } from '@/contants';

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
    <GooglePlacesAutocomplete
      fetchDetails
      placeholder=""
      debounce={200}
      styles={{
        textInputContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 20,
          marginHorizontal: 20,
          position: 'relative',
          shadowColor: '#D4D4D4',
        },
        textInput: {
          backgroundColor: textInputBackgroundColor || 'white',
          fontSize: 16,
          fontWeight: '600',
          marginTop: 5,
          width: '100%',
          borderRadius: 200,
        },
        listView: {
          backgroundColor: textInputBackgroundColor || 'white',
          position: 'relative',
          top: 0,
          width: '100%',
          borderRadius: 10,
          shadowColor: '#D4D4D4',
          zIndex: 99,
        },
      }}
      onPress={(data, details = null) =>
        handlePress({
          latitude: details?.geometry.location.lat!,
          longitude: details?.geometry.location.lng!,
          address: data.description,
        })
      }
      query={{
        key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
        language: 'pt-BR',
      }}
      renderLeftButton={() => (
        <View className="justify-center items-center w-6 h-6">
          <Image
            source={icon ? icon : icons.search}
            className="w-6 h-6 "
            resizeMode="contain"
          />
        </View>
      )}
      textInputProps={{
        placeholderTextColor: 'gray',
        placeholder: initialLocation ?? 'Para onde gostaria de ir?',
      }}
    />
  </View>
);
