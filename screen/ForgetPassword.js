import React, { useState } from 'react'
import { View, Text } from 'react-native';


import AppTextInput from '../component/AppInput';
import AppButton from '../component/AppButton';
import AppInput from '../component/AppInput';

const searchEmail=() => {
  console.log('Searching email')
}

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  return (
    <View>
      <AppInput
        keyboardType="email-address"
        autoCapitalize="none"
        textContentType="emailAddress"
        handleTextChange={(text) => setEmail(text)}
        icon="email"
        placeholder="Your email"
        value={email}
        id={email}
      />

      <AppButton label='Search email' onPress={searchEmail}/>
    </View>
  );
}
