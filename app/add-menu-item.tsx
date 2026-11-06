import CustomButton from '../components/CustomButton';
import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';

import {
  useMenu,
  MenuItem,
} from '../context/MenuContext';

import MenuItemCard from '../components/MenuItemCard';

export default function AddMenuItemScreen() {

  // GET MENU DATA AND FUNCTIONS FROM CONTEXT
  const {
    menuItems,
    addMenuItem,
    removeMenuItem,
    isLoading,
  } = useMenu();

  // FORM INPUTS
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');

  // FEEDBACK MESSAGE
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] =
    useState<'success' | 'error'>('success');

  // SHOW SUCCESS OR ERROR MESSAGE
  const showMessage = (
    text: string,
    type: 'success' | 'error'
  ) => {
    setMessage(text);
    setMessageType(type);
  };

  // CLEAR FORM AFTER ADDING A DISH
  const clearForm = () => {
    setDishName('');
    setDescription('');
    setCourse('');
    setPrice('');
  };

  // ADD NEW MENU ITEM
  const handleAddMenuItem = () => {

    // CHECK FOR EMPTY FIELDS
    if (
      !dishName.trim() ||
      !description.trim() ||
      !course ||
      !price.trim()
    ) {
      showMessage(
        'Please complete all fields before adding a dish.',
        'error'
      );
      return;
    }

    // CONVERT PRICE TO A NUMBER
    const numericPrice = Number(price);

    // VALIDATE PRICE
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

    // CREATE A NEW MENU ITEM
    const newItem: MenuItem = {
      id:
        Date.now().toString() +
        Math.random().toString(36).slice(2),
      dishName: dishName.trim(),
      description: description.trim(),
      course: course,
      price: numericPrice,
    };

    // ADD ITEM TO CONTEXT
    addMenuItem(newItem);

    // CLEAR INPUT FIELDS
    clearForm();

    // DISPLAY SUCCESS MESSAGE
    showMessage(
      `${newItem.dishName} was added successfully!`,
      'success'
    );
  };

  // REMOVE A MENU ITEM
  const handleRemoveItem = (
    id: string,
    name: string
  ) => {

    const confirmRemoval = () => {
      removeMenuItem(id);

      showMessage(
        `${name} was removed successfully!`,
        'success'
      );
    };

    // WEB BROWSER CONFIRMATION
    if (Platform.OS === 'web') {

      const confirmed = window.confirm(
        `Are you sure you want to remove ${name}?`
      );

      if (confirmed) {
        confirmRemoval();
      }

    } else {

      // ANDROID AND IOS CONFIRMATION
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
            onPress: confirmRemoval,
          },
        ]
      );

    }
  };

  // DISPLAY EACH MENU ITEM USING REUSABLE COMPONENT
  const renderMenuItem = (item: MenuItem) => {
    return (
      <MenuItemCard
        key={item.id}
        item={item}
        showCourse={true}
        onEdit={() =>
          router.push({
            pathname: '/edit-menu-item',
            params: { id: item.id },
          })
        }
        onRemove={() =>
          handleRemoveItem(
            item.id,
            item.dishName
          )
        }
      />
    );
  };

  // MAIN SCREEN
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >

      {/* APP HEADING */}
      <Text style={styles.brand}>
        CHRISTOFFEL'S KITCHEN
      </Text>

      <Text style={styles.title}>
        Add Menu Item
      </Text>

      <Text style={styles.subtitle}>
        Create and manage dishes for your menu.
      </Text>

      {/* ADD MENU ITEM FORM */}
      <View style={styles.formCard}>

        <Text style={styles.sectionTitle}>
          New Dish Details
        </Text>

        {/* DISH NAME */}
        <Text style={styles.label}>
          Dish Name
        </Text>

        <TextInput
          style={styles.input}
          placeholder="e.g. Grilled Chicken"
          placeholderTextColor="#A08E85"
          value={dishName}
          onChangeText={setDishName}
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
          placeholder="Describe the dish"
          placeholderTextColor="#A08E85"
          value={description}
          onChangeText={setDescription}
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
            style={styles.picker}
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
          placeholder="e.g. 150.00"
          placeholderTextColor="#A08E85"
          keyboardType="decimal-pad"
          value={price}
          onChangeText={setPrice}
        />

        {/* FEEDBACK MESSAGE */}
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

        {/* ADD BUTTON */}
       <CustomButton
  title="+ ADD MENU ITEM"
  onPress={handleAddMenuItem}
/>

{/* NAVIGATION BUTTONS */}

<CustomButton
  title="View Today's Menu"
  variant="primary"
  onPress={() => router.push('/todays-menu')}
/>

<CustomButton
  title="Search & Filter Menu"
  variant="secondary"
  onPress={() => router.push('/filter-menu')}
/>

<CustomButton
  title="← BACK TO HOME"
  variant="outline"
  onPress={() => router.push('/home')}
/>

      </View>

      {/* CURRENT MENU ITEMS */}
      <View style={styles.menuSection}>

        <View style={styles.menuHeading}>

          <Text style={styles.sectionTitle}>
            Current Menu Items
          </Text>

          <Text style={styles.itemCount}>
            {menuItems.length} Items
          </Text>

        </View>

        {isLoading ? (

          <Text style={styles.emptyText}>
            Loading saved menu items...
          </Text>

        ) : menuItems.length === 0 ? (

          <View style={styles.emptyCard}>

            <Text style={styles.emptyIcon}>
              🍽️
            </Text>

            <Text style={styles.emptyTitle}>
              No Menu Items Yet
            </Text>

            <Text style={styles.emptyText}>
              Add your first dish using the form above.
            </Text>

          </View>

        ) : (

          menuItems.map((item) =>
            renderMenuItem(item)
          )

        )}

      </View>

      {/* NAVIGATION BUTTONS */}
      <TouchableOpacity
        style={styles.viewMenuButton}
        onPress={() =>
          router.push('/todays-menu')
        }
      >
        <Text style={styles.viewMenuText}>
          View Today's Menu
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.filterButton}
        onPress={() =>
          router.push('/filter-menu')
        }
      >
        <Text style={styles.filterText}>
          Search & Filter Menu
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push('/home')}
      >
        <Text style={styles.backText}>
          ← BACK TO HOME
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

// STYLES
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
    marginBottom: 28,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#34251F',
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

  picker: {
    color: '#34251F',
  },

  messageBox: {
    padding: 13,
    borderRadius: 9,
    marginTop: 18,
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

  addButton: {
    backgroundColor: '#E75826',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginTop: 22,
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },

  menuSection: {
    marginBottom: 20,
  },

  menuHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  itemCount: {
    fontSize: 13,
    color: '#E75826',
    fontWeight: 'bold',
  },

  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8DFD9',
  },

  emptyIcon: {
    fontSize: 40,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34251F',
    marginTop: 10,
  },

  emptyText: {
    fontSize: 13,
    color: '#807069',
    textAlign: 'center',
    marginTop: 8,
  },

  viewMenuButton: {
    backgroundColor: '#E75826',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },

  viewMenuText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },

  filterButton: {
    backgroundColor: '#FFF0E9',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },

  filterText: {
    color: '#E75826',
    fontWeight: 'bold',
    fontSize: 14,
  },

  backButton: {
    borderWidth: 1,
    borderColor: '#E3DAD4',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },

  backText: {
    color: '#67564D',
    fontWeight: '600',
    fontSize: 13,
  },

});
