import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';

import { router } from 'expo-router';

import { useMenu } from '../context/MenuContext';

export default function FilterMenuScreen() {
  const { menuItems } = useMenu();

  const [selectedCourse, setSelectedCourse] =
    useState('Main Course');

  const filteredItems = menuItems.filter(
    (item) =>
      item.course === selectedCourse
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.brand}>
          CHRISTOFFEL'S KITCHEN
        </Text>

        <Text style={styles.title}>
          Filter Menu
        </Text>

        <Text style={styles.label}>
          Choose Course
        </Text>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCourse}
            onValueChange={(value) =>
              setSelectedCourse(value)
            }
          >
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

        <View style={styles.divider} />

        <View style={styles.resultHeading}>
          <Text style={styles.resultsTitle}>
            Results
          </Text>

          <View style={styles.resultBadge}>
            <Text style={styles.resultBadgeText}>
              {filteredItems.length} Items Found
            </Text>
          </View>
        </View>

        {filteredItems.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>
              🍽️
            </Text>

            <Text style={styles.emptyTitle}>
              No dishes found
            </Text>

            <Text style={styles.emptyText}>
              There are currently no dishes in this course.
            </Text>
          </View>
        ) : (
          filteredItems.map((item) => (
            <View
              key={item.id}
              style={styles.menuCard}
            >
              <View style={styles.foodIcon}>
                <Text>🍽️</Text>
              </View>

              <View style={styles.menuInfo}>
                <Text style={styles.dishName}>
                  {item.dishName}
                </Text>

                <Text style={styles.description}>
                  {item.description}
                </Text>
              </View>

              <Text style={styles.price}>
                R{item.price.toFixed(0)}
              </Text>
            </View>
          ))
        )}

        <TouchableOpacity
          style={styles.backButton}
          onPress={() =>
            router.back()
          }
        >
          <Text style={styles.backText}>
            ← BACK
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF7F2',
  },

  content: {
    padding: 22,
    paddingBottom: 40,
  },

  brand: {
    color: '#E75826',
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 5,
  },

  title: {
    color: '#35261F',
    fontSize: 31,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 20,
  },

  label: {
    color: '#66564F',
    marginBottom: 7,
    fontSize: 13,
  },

  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E75826',
    borderRadius: 11,
    overflow: 'hidden',
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#E9DFD9',
    marginVertical: 18,
  },

  resultHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },

  resultsTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#36281F',
  },

  resultBadge: {
    backgroundColor: '#FFF0E9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },

  resultBadgeText: {
    color: '#E75826',
    fontSize: 11,
  },

  menuCard: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ECE3DD',
  },

  foodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF0E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  menuInfo: {
    flex: 1,
  },

  dishName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#382A24',
  },

  description: {
    color: '#827068',
    fontSize: 12,
    marginTop: 4,
  },

  price: {
    color: '#E75826',
    fontSize: 17,
    fontWeight: 'bold',
  },

  backButton: {
    borderWidth: 1,
    borderColor: '#E9DFD8',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },

  backText: {
    color: '#67564E',
  },

  emptyCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 30,
    borderRadius: 14,
  },

  emptyIcon: {
    fontSize: 40,
  },

  emptyTitle: {
    color: '#382A24',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },

  emptyText: {
    color: '#817068',
    marginTop: 6,
    textAlign: 'center',
  },
});