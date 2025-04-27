import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;

export default function BooksScreen() {
  const [searchText, setSearchText] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Replace this with your actual backend call
  const fetchBooks = async () => {
    try {
      const response = await fetch('https://your-backend.com/api/books'); // 👈 replace URL
      const data = await response.json();
      setBooks(data);
    } catch (err) {
      console.error('Failed to fetch books:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/philcst-logo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>BookNest</Text>
      </View>

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Title, Author, ISBN"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Section header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Criminology Books</Text>
        <Text style={styles.sectionCount}>total books: {filteredBooks.length}</Text>
      </View>

      {/* Book list or loader */}
      {loading ? (
        <ActivityIndicator size="large" color="#7b3aed" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={filteredBooks}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardImage} />
              <View style={styles.cardInfo}>
                <Text style={styles.bookTitle}>Title: {item.title}</Text>
                <Text style={styles.bookAuthor}>by: {item.author}</Text>
                <Text style={styles.bookISBN}>ISBN: {item.isbn}</Text>
                <Text
                  style={[
                    styles.availability,
                    { color: item.available ? 'green' : 'red' },
                  ]}
                >
                  {item.available ? 'Available' : 'Not Available'}
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7b3aed',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 16,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
  },
  sectionHeader: {
    backgroundColor: '#7b3aed',
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: '#fff',
    fontWeight: '600',
  },
  sectionCount: {
    color: '#fff',
    fontSize: 12,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  cardImage: {
    width: 60,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderColor: '#ddd',
    borderWidth: 1,
    marginRight: 10,
  },
  cardInfo: {
    flex: 1,
  },
  bookTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
    color: '#333',
  },
  bookISBN: {
    fontSize: 12,
    color: '#555',
  },
  availability: {
    marginTop: 4,
    fontWeight: '600',
  },
});
