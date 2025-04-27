import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const ITEM_WIDTH = (windowWidth - 48) / 3;

const DUMMY_SECTIONS = [
  'Criminology',
  'Hospital Management',
  'Education',
  'Hospitality'
];

export default function BooksScreen() {
  const [searchText, setSearchText] = useState('');

  return (
    <ScrollView style={styles.container}>
      {/* Header with logo and title */}
      <View style={styles.headerContainer}>
        <Image
          source={require('../../assets/images/philcst-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.logoText}>BookNest</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search books..."
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>

      {/* Book Sections */}
      {DUMMY_SECTIONS.map((sectionName) => (
        <View key={sectionName} style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{sectionName} Books</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>see all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.grid}>
            {[1, 2, 3].map((item) => (
              <View key={item} style={styles.bookCard} />
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECECED',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7b3aed',
  },
  searchContainer: {
    marginBottom: 24,
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  seeAll: {
    fontSize: 14,
    color: '#007AFF',
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bookCard: {
    width: ITEM_WIDTH,
    height: 130,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    borderColor: 'black',
    borderWidth: 1,
  },
});
