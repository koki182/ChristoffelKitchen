import MenuItemCard from '../components/MenuItemCard';
import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import { useMenu } from '../context/MenuContext';

export default function FilterMenuScreen() {

  // Get the menu items from MenuContext
  const { menuItems } = useMenu();

  // Store the search text
  const [searchText, setSearchText] = useState('');

  // Store the selected course
  const [selectedCourse, setSelectedCourse] =
    useState('All');

  // Search and filter menu items
  const filteredItems = menuItems.filter((item) => {

    // Check whether the dish name matches
    const matchesSearch = item.dishName
      .toLowerCase()
      .includes(searchText.trim().toLowerCase());

    // Check whether the course matches
    const matchesCourse =
      selectedCourse === 'All' ||
      item.course === selectedCourse;

    // Both conditions must be true
    return matchesSearch && matchesCourse;
  });

  // Clear the search and filter
  const handleClear = () => {
    setSearchText('');
    setSelectedCourse('All');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >

      {/* APP TITLE */}
      <Text style={styles.brand}>
        CHRISTOFFEL'S KITCHEN
      </Text>

      <Text style={styles.title}>
        Search & Filter
      </Text>

      <Text style={styles.subtitle}>
        Find your favourite dishes quickly and easily.
      </Text>

      {/* SEARCH INPUT */}
      <Text style={styles.label}>
        Search by Dish Name
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Search for a dish..."
        placeholderTextColor="#9B8C84"
        value={searchText}
        onChangeText={setSearchText}
        autoCapitalize="none"
      />

      {/* COURSE FILTER */}
      <Text style={styles.label}>
        Filter by Course
      </Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCourse}
          onValueChange={(value) =>
            setSelectedCourse(value)
          }
        >
          <Picker.Item
            label="All Courses"
            value="All"
          />

          <Picker.Item
            label="Starters"
            value="Starter"
          />

          <Picker.Item
            label="Main Courses"
            value="Main Course"
          />

          <Picker.Item
            label="Desserts"
            value="Dessert"
          />
        </Picker>
      </View>

      {/* CLEAR BUTTON */}
      <TouchableOpacity
        style={styles.clearButton}
        onPress={handleClear}
      >
        <Text style={styles.clearText}>
          CLEAR SEARCH & FILTER
        </Text>
      </TouchableOpacity>

      {/* RESULTS HEADER */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsTitle}>
          Results
        </Text>

        <View style={styles.countBadge}>
          <Text style={styles.countText}>
            {filteredItems.length} Items Found
          </Text>
        </View>
      </View>

      {/* EMPTY MENU MESSAGE */}
      {menuItems.length === 0 ? (

        <View style={styles.emptyCard}>
          <Text style={styles.emptyIcon}>
            🍽️
          </Text>

          <Text style={styles.emptyTitle}>
            No Menu Items Yet
          </Text>

          <Text style={styles.emptyText}>
            The chef has not added any dishes.
          </Text>
        </View>

      ) : filteredItems.length === 0 ? (

        <View style={styles.emptyCard}>
          <Text style={styles.emptyIcon}>
            🔍
          </Text>

          <Text style={styles.emptyTitle}>
            No Matching Dishes
          </Text>

          <Text style={styles.emptyText}>
            Try another dish name or select
            a different course.
          </Text>
        </View>

      ) : (

        
        // DISPLAY MATCHING DISHES
        filteredItems.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            showCourse={true}
          />
        ))

      )}

      {/* BACK BUTTON */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backText}>
          ← BACK
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

// STYLING
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FBF7F2',
  },

  content: {
    padding: 22,
    paddingTop: 35,
    paddingBottom: 50,
  },

  brand: {
    color: '#E75826',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },

  title: {
    fontSize: 31,
    fontWeight: 'bold',
    color: '#34251F',
    marginTop: 7,
  },

  subtitle: {
    fontSize: 14,
    color: '#807069',
    marginTop: 6,
    marginBottom: 25,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#594A43',
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E3DAD4',
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    color: '#34251F',
    marginBottom: 20,
  },

  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E3DAD4',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
  },

  clearButton: {
    backgroundColor: '#FFF0E9',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 25,
  },

  clearText: {
    color: '#E75826',
    fontSize: 13,
    fontWeight: 'bold',
  },

  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  resultsTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#34251F',
  },

  countBadge: {
    backgroundColor: '#FFF0E9',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
  },

  countText: {
    color: '#E75826',
    fontSize: 12,
    fontWeight: 'bold',
  },

  menuCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8DFD9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  menuDetails: {
    flex: 1,
    paddingRight: 12,
  },

  dishName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#34251F',
  },

  description: {
    fontSize: 13,
    color: '#807069',
    marginTop: 5,
  },

  course: {
    fontSize: 12,
    color: '#A08E85',
    marginTop: 8,
  },

  price: {
    fontSize: 16,
    color: '#E75826',
    fontWeight: 'bold',
  },

  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8DFD9',
  },

  emptyIcon: {
    fontSize: 38,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34251F',
    marginTop: 10,
  },

  emptyText: {
    color: '#807069',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 7,
    lineHeight: 20,
  },

  backButton: {
    borderWidth: 1,
    borderColor: '#E3DAD4',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 25,
  },

  backText: {
    color: '#67564D',
    fontWeight: '600',
  },

});
