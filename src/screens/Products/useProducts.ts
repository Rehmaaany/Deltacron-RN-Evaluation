import { useEffect, useState } from 'react';

export type Product = {
  id: number;
  title: string;
  images: string[];
};

const useProducts = (categoryId: number) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`https://api.escuelajs.co/api/v1/categories/${categoryId}/products?offset=0&limit=10`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return { products, loading };
};

export default useProducts;
