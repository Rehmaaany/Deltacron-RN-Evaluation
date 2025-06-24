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
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from './styles';
import useFavorites, { Product } from './useFavorites';

type RootStackParamList = {
  ProductDetails: { productId: number };
  Favorites: undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Favorites'>;
};

const Favorites: React.FC<Props> = ({ navigation }) => {
  const { favorites, loading, loadMore, hasMore, initializing } = useFavorites();

  const renderItem: ListRenderItem<Product> = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() =>
        navigation.navigate('ProductDetails', { productId: item.id })
      }
    >
      <Image source={{ uri: item.images[0] }} style={styles.productImage} />
      <Text style={styles.productTitle} numberOfLines={2}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  if (initializing) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6200EE" />
      </View>
    );
  }

  if (!favorites.length && !loading) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.emptyText}>No favorites yet.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContent}
      renderItem={renderItem}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        loading && hasMore ? (
          <ActivityIndicator size="small" color="#6200EE" style={{ marginVertical: 16 }} />
        ) : null
      }
    />
  );
};

export default Favorites;
