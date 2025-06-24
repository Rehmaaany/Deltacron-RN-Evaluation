import { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Product = {
  id: number;
  title: string;
  images: string[];
};

const PAGE_SIZE = 10;

const useFavorites = () => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [allFavoriteIds, setAllFavoriteIds] = useState<string[]>([]);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const fetchFavoriteIds = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const favKeys = keys.filter(k => k.startsWith('fav-'));
        const values = await AsyncStorage.multiGet(favKeys);

        const ids = values
          .filter(([, value]) => value === 'true')
          .map(([key]) => key.replace('fav-', ''));

        setAllFavoriteIds(ids);
        setHasMore(ids.length > 0);
      } catch (err) {
        console.error('Error loading favorite IDs:', err);
      } finally {
        setInitializing(false);
      }
    };

    fetchFavoriteIds();
  }, []);

  useEffect(() => {
    if (!allFavoriteIds.length || !hasMore) return;
  
    const fetchFavoritesPage = async () => {
      setLoading(true);
  
      const start = (page - 1) * PAGE_SIZE;
      const end = page * PAGE_SIZE;
      const idsToFetch = allFavoriteIds.slice(start, end);
  
      const results = await Promise.all(
        idsToFetch.map(id =>
          fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
            .then(res => res.ok ? res.json() : null)
            .catch(() => null)
        )
      );
  
      const valid = results.filter((p): p is Product => p && p.id);
      setFavorites(prev => [...prev, ...valid]);
  
      if (end >= allFavoriteIds.length) {
        setHasMore(false);
      }
  
      setLoading(false);
    };
  
    fetchFavoritesPage();
  }, [page, allFavoriteIds, hasMore]);
  

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  }, [loading, hasMore]);

  return { favorites, loading, loadMore, hasMore, initializing };
};

export default useFavorites;
