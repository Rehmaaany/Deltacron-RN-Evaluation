import AsyncStorage from '@react-native-async-storage/async-storage';

export const toggleFavoriteStatus = async (id: number): Promise<boolean> => {
  const key = `fav-${id}`;
  const current = await AsyncStorage.getItem(key);
  const newValue = current !== 'true';
  await AsyncStorage.setItem(key, newValue.toString());
  return newValue;
};

export const isProductFavorited = async (id: number): Promise<boolean> => {
  const value = await AsyncStorage.getItem(`fav-${id}`);
  return value === 'true';
};
