import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  categoryCard: {
    backgroundColor: '#fff',
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginVertical: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  categoryText: {
    fontSize: 17,
    color: '#2c3e50',
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  favoriteNavButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginHorizontal: 16,
    marginBottom: 12,
    marginTop: 20,
    backgroundColor: '#ffe6ed',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#f8bbd0',
    borderWidth: 1,
  },
  favoriteNavText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#d81b60',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  
});

export default styles;
