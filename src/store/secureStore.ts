import * as SecureStore from 'expo-secure-store';

export const saveToken = async (key: string, value: string) => {
  await SecureStore.setItemAsync(key, value);
};

export const getToken = async (key: string) => {
  const token = SecureStore.getItemAsync(key);

  return token;
};

export const deleteToken = async (key: string) => {
  await SecureStore.deleteItemAsync(key);
};
