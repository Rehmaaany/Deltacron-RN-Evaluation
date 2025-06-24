import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import useProductDetails from './useProductDetails';
import styles from './styles';

type RootStackParamList = {
  Home: undefined;
  Products: { categoryId: number };
  ProductDetails: { productId: number };
};

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetails'>;

const ProductDetails: React.FC<Props> = ({ route }) => {
  const { productId } = route.params;
  const { product, isFavorite, loading, toggleFavorite } = useProductDetails(productId);

  if (loading || !product) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6200EE" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{product.title}</Text>
      <Image source={{ uri: product.images[0] }} style={styles.image} />
      <Text style={styles.description}>{product.description}</Text>
      <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
        <Text style={styles.favoriteText}>
          {isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProductDetails;
