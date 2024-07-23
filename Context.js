import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the AuthContext with default values
export const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  handleLogin: () => {},
  handleLogout: () => {},
  token: undefined,
  setToken: () => {},
  refreshToken: undefined,
  setRefreshToken: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [token, setToken] = useState(undefined);
  const [refreshToken, setRefreshToken] = useState(undefined);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  //       "@react-native-clipboard/clipboard": "^1.14.1",
  // "@react-native-community/masked-view": "^0.1.11",
  const handleLogout = async () => {
    try {
      const remove = await AsyncStorage.getItem("userToken");
      navigation.navigate("Onboarding");
      console.log(remove);

      setIsLoggedIn(false);
    } catch (e) {
      console.log("error");
    }
  };

  // useEffect(() => {
  //   const checkTokenInAsyncStorage = async () => {
  //     try {
  //       const storedToken = await AsyncStorage.getItem("userToken");
  //       token(storedToken);
  //       // if (storedToken) {
  //       //   token(storedToken);
  //       //   setIsLoggedIn(true);
  //       //   console.log(storedToken)
  //       // }
  //     } catch (error) {
  //       console.log('Error retrieving token from AsyncStorage:', error);
  //     }
  //   };

  //   checkTokenInAsyncStorage();
  // }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        handleLogin,
        setIsLoggedIn,
        handleLogout,
        token,
        setToken,
        refreshToken,
        setRefreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
