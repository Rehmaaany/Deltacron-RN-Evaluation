import { useEffect, useState } from 'react';
import { toggleFavoriteStatus, isProductFavorited } from '../../utils/storage';

export type Product = {
  id: number;
  title: string;
  description: string;
  images: string[];
};

const useProductDetails = (productId: number) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`);
        const data: Product = await res.json();
        setProduct(data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    isProductFavorited(productId).then(setIsFavorite);
  }, [productId]);

  const toggleFavorite = async () => {
    const updated = await toggleFavoriteStatus(productId);
    setIsFavorite(updated);
  };

  return { product, isFavorite, loading, toggleFavorite };
};

export default useProductDetails;
