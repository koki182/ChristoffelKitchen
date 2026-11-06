
import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';

import {
  router,
  useLocalSearchParams,
} from 'expo-router';

import {
  useMenu,
  MenuItem,
} from '../context/MenuContext';

import CustomButton from '../components/CustomButton';

export default function EditMenuItemScreen() {

  // GET THE ID OF THE DISH BEING EDITED
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  // GET SAVED MENU ITEMS AND UPDATE FUNCTION
  const {
    menuItems,
    updateMenuItem,
    isLoading,
  } = useMenu();

  // FIND THE SELECTED DISH
  const selectedItem = menuItems.find(
    (item) => item.id === id
  );

  // FORM INPUTS
  const [dishName, setDishName] = useState(
    selectedItem?.dishName || ''
  );

  const [description, setDescription] = useState(
    selectedItem?.description || ''
  );

  const [course, setCourse] = useState(
    selectedItem?.course || ''
  );

  const [price, setPrice] = useState(
    selectedItem
      ? selectedItem.price.toString()
      : ''
  );

  // FEEDBACK MESSAGE
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] =
    useState<'success' | 'error'>('success');

  // DISPLAY FEEDBACK
  const showMessage = (
    text: string,
    type: 'success' | 'error'
  ) => {
    setMessage(text);
    setMessageType(type);
  };

  // SAVE UPDATED DISH
  const handleUpdateMenuItem = () => {

    if (!selectedItem) {
      showMessage(
        'This menu item could not be found.',
        'error'
      );
      return;
    }

    // CHECK EMPTY FIELDS
    if (
      !dishName.trim() ||
      !description.trim() ||
      !course ||
      !price.trim()
    ) {
      showMessage(
        'Please complete all fields.',
        'error'
      );
      return;
    }

    // CONVERT PRICE TO NUMBER
    const numericPrice = Number(price);

    // CHECK VALID PRICE
    if (
      !Number.isFinite(numericPrice) ||
      numericPrice <= 0
    ) {
      showMessage(
        'Please enter a valid price greater than zero.',
        'error'
      );
      return;
    }

    // CREATE UPDATED MENU ITEM
    const updatedItem: MenuItem = {
      id: selectedItem.id,
      dishName: dishName.trim(),
      description: description.trim(),
      course: course,
      price: numericPrice,
    };

    // UPDATE THE SHARED MENU
    updateMenuItem(updatedItem);

    // DISPLAY SUCCESS MESSAGE
    showMessage(
      `${updatedItem.dishName} was updated successfully!`,
      'success'
    );

    // SHOW NATIVE ALERT ON ANDROID AND IOS
    if (Platform.OS !== 'web') {
      Alert.alert(
        'Success',
        'Menu item updated successfully!'
      );
    }
  };

  // LOADING SAVED MENU ITEMS
  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.infoText}>
          Loading menu item...
        </Text>
      </View>
    );
  }

  // DISH DOES NOT EXIST
  if (!selectedItem) {
    return (
      <View style={styles.centerContainer}>

        <Text style={styles.errorTitle}>
          Menu Item Not Found
        </Text>

        <Text style={styles.infoText}>
          This dish may have been removed.
        </Text>

        <CustomButton
          title="← BACK TO MENU"
          variant="outline"
          onPress={() =>
            router.replace('/add-menu-item')
          }
        />

      </View>
    );
  }

  // MAIN EDIT SCREEN
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >

      {/* APPLICATION TITLE */}
      <Text style={styles.brand}>
        CHRISTOFFEL'S KITCHEN
      </Text>

      <Text style={styles.title}>
        Edit Menu Item
      </Text>

      <Text style={styles.subtitle}>
        Update the details of your selected dish.
      </Text>

      {/* EDIT FORM */}
      <View style={styles.formCard}>

        <Text style={styles.sectionTitle}>
          Edit Dish Details
        </Text>

        {/* DISH NAME */}
        <Text style={styles.label}>
          Dish Name
        </Text>

        <TextInput
          style={styles.input}
          value={dishName}
          onChangeText={setDishName}
          placeholder="Enter dish name"
          placeholderTextColor="#A08E85"
        />

        {/* DESCRIPTION */}
        <Text style={styles.label}>
          Description
        </Text>

        <TextInput
          style={[
            styles.input,
            styles.descriptionInput,
          ]}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter dish description"
          placeholderTextColor="#A08E85"
          multiline
        />

        {/* COURSE */}
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
              label="Select a course"
              value=""
            />

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

        {/* PRICE */}
        <Text style={styles.label}>
          Price (R)
        </Text>

        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          keyboardType="decimal-pad"
          placeholder="e.g. 150.00"
          placeholderTextColor="#A08E85"
        />

        {/* SUCCESS OR ERROR MESSAGE */}
        {message !== '' && (
          <View
            style={[
              styles.messageBox,
              messageType === 'success'
                ? styles.successBox
                : styles.errorBox,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                messageType === 'success'
                  ? styles.successText
                  : styles.errorText,
              ]}
            >
              {message}
            </Text>
          </View>
        )}

        {/* SAVE CHANGES BUTTON */}
        <CustomButton
          title="SAVE CHANGES"
          variant="primary"
          onPress={handleUpdateMenuItem}
        />

        {/* CANCEL BUTTON */}
        <CustomButton
          title="CANCEL"
          variant="outline"
          onPress={() =>
            router.replace('/add-menu-item')
          }
        />

      </View>

      {/* RETURN TO MENU */}
      <CustomButton
        title="← BACK TO MENU ITEMS"
        variant="secondary"
        onPress={() =>
          router.replace('/add-menu-item')
        }
      />

    </ScrollView>
  );
}

// SCREEN STYLES
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
    fontSize: 12,
    fontWeight: 'bold',
    color: '#E75826',
    letterSpacing: 0.5,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#34251F',
    marginTop: 7,
  },

  subtitle: {
    fontSize: 14,
    color: '#807069',
    marginTop: 7,
    marginBottom: 25,
  },

  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8DFD9',
    padding: 20,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#34251F',
    marginBottom: 5,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#67564D',
    marginTop: 18,
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: '#E3DAD4',
    borderRadius: 10,
    backgroundColor: '#FFFDFC',
    padding: 13,
    fontSize: 14,
    color: '#34251F',
  },

  descriptionInput: {
    height: 90,
    textAlignVertical: 'top',
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: '#E3DAD4',
    borderRadius: 10,
    backgroundColor: '#FFFDFC',
    overflow: 'hidden',
  },

  messageBox: {
    padding: 13,
    borderRadius: 9,
    marginTop: 18,
    marginBottom: 10,
  },

  successBox: {
    backgroundColor: '#E9F7EE',
  },

  errorBox: {
    backgroundColor: '#FDE8E7',
  },

  messageText: {
    fontSize: 13,
    fontWeight: '600',
  },

  successText: {
    color: '#267A43',
  },

  errorText: {
    color: '#C63B32',
  },

  centerContainer: {
    flex: 1,
    backgroundColor: '#FBF7F2',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },

  infoText: {
    fontSize: 14,
    color: '#807069',
    textAlign: 'center',
    marginBottom: 15,
  },

  errorTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#34251F',
    marginBottom: 10,
  },

});
