import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';

import { router } from 'expo-router';

import { useMenu } from '../context/MenuContext';

export default function AddMenuItemScreen() {
  const {
    menuItems,
    addMenuItem,
    removeMenuItem,
  } = useMenu();

  const [dishName, setDishName] = useState('');
  const [description, setDescription] =
    useState('');

  const [course, setCourse] =
    useState('Starter');

  const [price, setPrice] = useState('');

  const handleAddItem = () => {
    if (dishName.trim() === '') {
      Alert.alert(
        'Missing Information',
        'Please enter the dish name.'
      );

      return;
    }

    if (description.trim() === '') {
      Alert.alert(
        'Missing Information',
        'Please enter a description.'
      );

      return;
    }

    if (price.trim() === '') {
      Alert.alert(
        'Missing Information',
        'Please enter the price.'
      );

      return;
    }

    const numericPrice = Number(price);

    if (
      isNaN(numericPrice) ||
      numericPrice <= 0
    ) {
      Alert.alert(
        'Invalid Price',
        'Please enter a valid price greater than zero.'
      );

      return;
    }

    const newItem = {
      id: Date.now().toString(),

      dishName: dishName.trim(),

      description: description.trim(),

      course: course,

      price: numericPrice,
    };

    addMenuItem(newItem);

    Alert.alert(
      'Success',
      `${dishName} has been successfully added to the menu.`
    );

    setDishName('');
    setDescription('');
    setCourse('Starter');
    setPrice('');
  };

  const confirmRemove = (
    id: string,
    name: string
  ) => {
    Alert.alert(
      'Remove Menu Item',
      `Are you sure you want to remove ${name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },

        {
          text: 'Remove',
          style: 'destructive',

          onPress: () =>
            removeMenuItem(id),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.brand}>
          CHRISTOFFEL'S KITCHEN
        </Text>

        <Text style={styles.title}>
          Add Menu Item
        </Text>

        <Text style={styles.label}>
          Dish Name
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter dish name..."
          value={dishName}
          onChangeText={setDishName}
        />

        <Text style={styles.label}>
          Description
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter description..."
          value={description}
          onChangeText={setDescription}
        />

        <View style={styles.twoColumns}>
          <View style={styles.column}>
            <Text style={styles.label}>
              Course
            </Text>

            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={course}
                onValueChange={(value) =>
                  setCourse(value)
                }
              >
                <Picker.Item
                  label="Starter"
                  value="Starter"
                />

                <Picker.Item
                  label="Main Course"
                  value="Main Course"
                />

                <Picker.Item
                  label="Dessert"
                  value="Dessert"
                />
              </Picker>
            </View>
          </View>

          <View style={styles.column}>
            <Text style={styles.label}>
              Price
            </Text>

            <TextInput
              style={styles.input}
              placeholder="R 45"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddItem}
        >
          <Text style={styles.addButtonText}>
            ADD ITEM
          </Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <Text style={styles.previewTitle}>
          Current Menu Preview
        </Text>

        {menuItems.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>
              No menu items added
            </Text>

            <Text style={styles.emptyText}>
              Add your first dish using the form above.
            </Text>
          </View>
        ) : (
          menuItems.map((item) => (
            <View
              key={item.id}
              style={styles.itemCard}
            >
              <View>
                <Text style={styles.itemName}>
                  {item.dishName}
                </Text>

                <Text style={styles.itemInfo}>
                  R{item.price.toFixed(0)} • {item.course}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.removeButton}
                onPress={() =>
                  confirmRemove(
                    item.id,
                    item.dishName
                  )
                }
              >
                <Text style={styles.removeText}>
                  🗑 Remove
                </Text>
              </TouchableOpacity>
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
    fontSize: 11,
    fontWeight: 'bold',
    color: '#E75826',
    marginTop: 5,
  },

  title: {
    fontSize: 31,
    fontWeight: 'bold',
    color: '#35261F',
    marginTop: 5,
    marginBottom: 20,
  },

  label: {
    color: '#67564E',
    fontSize: 13,
    marginBottom: 7,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5DED9',
    borderRadius: 9,
    padding: 13,
    marginBottom: 15,
  },

  twoColumns: {
    flexDirection: 'row',
    gap: 10,
  },

  column: {
    flex: 1,
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: '#E5DED9',
    borderRadius: 9,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    marginBottom: 15,
  },

  addButton: {
    backgroundColor: '#E75826',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },

  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#E9DFD9',
    marginVertical: 22,
  },

  previewTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#36281F',
    marginBottom: 12,
  },

  itemCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7DFD9',
    borderRadius: 10,
    padding: 13,
    marginBottom: 9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  itemName: {
    fontWeight: 'bold',
    color: '#382A24',
  },

  itemInfo: {
    color: '#807068',
    fontSize: 11,
    marginTop: 3,
  },

  removeButton: {
    backgroundColor: '#FFF0EB',
    paddingVertical: 8,
    paddingHorizontal: 11,
    borderRadius: 8,
  },

  removeText: {
    color: '#E75826',
    fontSize: 11,
    fontWeight: 'bold',
  },

  backButton: {
    borderWidth: 1,
    borderColor: '#E9DFD8',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 15,
  },

  backText: {
    color: '#6C5A51',
  },

  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 25,
    alignItems: 'center',
  },

  emptyTitle: {
    color: '#382A24',
    fontWeight: 'bold',
    fontSize: 17,
  },

  emptyText: {
    color: '#817068',
    marginTop: 6,
    textAlign: 'center',
  },
});