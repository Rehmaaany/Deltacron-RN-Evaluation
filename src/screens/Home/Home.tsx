import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ListRenderItem,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from './styles';
import useHome, { Category } from './useHome';

type RootStackParamList = {
  Home: undefined;
  Products: { categoryId: number };
  Favorites: undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const Home: React.FC<Props> = ({ navigation }) => {
  const { categories, loading } = useHome();

  const renderItem: ListRenderItem<Category> = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => navigation.navigate('Products', { categoryId: item.id })}
    >
      <Text style={styles.categoryText}>{item.name}</Text>
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
      <Text style={styles.heading}>Mini-Marketplace</Text>

      <TouchableOpacity
        style={styles.favoriteNavButton}
        onPress={() => navigation.navigate('Favorites')}
      >
        <Text style={styles.favoriteNavText}>❤️ View Favorites</Text>
      </TouchableOpacity>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default Home;
