import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ListRenderItem,
} from 'react-native';
import styles from './styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import useProducts, { Product } from './useProducts';

type RootStackParamList = {
  Home: undefined;
  Products: { categoryId: number };
  ProductDetails: { productId: number };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Products'>;

const Products: React.FC<Props> = ({ route, navigation }) => {
  const { categoryId } = route.params;
  const { products, loading } = useProducts(categoryId);

  const renderItem: ListRenderItem<Product> = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
    >
      <Image source={{ uri: item.images[0] }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6200EE" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Products;
