import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Product = {
  id: number;
  title: string;
  images: string[];
};

const useFavorites = () => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const favKeys = keys.filter(k => k.startsWith('fav-'));

        const favIds: string[] = [];
        for (let key of favKeys) {
          const val = await AsyncStorage.getItem(key);
          if (val === 'true') {
            favIds.push(key.replace('fav-', ''));
          }
        }

        const products = await Promise.all(
          favIds.map(id =>
            fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
              .then(res => res.json())
              .catch(() => null)
          )
        );

        const validProducts: Product[] = products.filter(
          (p): p is Product => p?.id !== undefined
        );

        setFavorites(validProducts);
      } catch (error) {
        console.error('Failed to load favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  return { favorites, loading };
};

export default useFavorites;
