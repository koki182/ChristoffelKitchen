import MenuItemCard from '../components/MenuItemCard';
import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { router } from 'expo-router';
import { useMenu } from '../context/MenuContext';
import type { MenuItem } from '../context/MenuContext';

export default function TodaysMenuScreen() {

  // GET ALL MENU ITEMS FROM MENU CONTEXT
  const { menuItems } = useMenu();

  // TOTAL NUMBER OF MENU ITEMS
  const totalItems = menuItems.length;

  // CALCULATE THE OVERALL AVERAGE PRICE
  const totalPrice = menuItems.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const overallAverage =
    totalItems > 0
      ? totalPrice / totalItems
      : 0;

  // SEPARATE DISHES INTO COURSES
  const starters = menuItems.filter(
    (item) => item.course === 'Starter'
  );

  const mains = menuItems.filter(
    (item) => item.course === 'Main Course'
  );

  const desserts = menuItems.filter(
    (item) => item.course === 'Dessert'
  );

  // COUNT DISHES IN EACH COURSE
  const starterCount = starters.length;
  const mainCount = mains.length;
  const dessertCount = desserts.length;

  // REUSABLE FUNCTION TO CALCULATE AVERAGE PRICE
  const calculateAverage = (items: MenuItem[]) => {

    if (items.length === 0) {
      return 0;
    }

    const sum = items.reduce(
      (total, item) => total + item.price,
      0
    );

    return sum / items.length;
  };

  // AVERAGE PRICE FOR EACH COURSE
  const starterAverage = calculateAverage(starters);
  const mainAverage = calculateAverage(mains);
  const dessertAverage = calculateAverage(desserts);

  // REUSABLE COMPONENT TO DISPLAY A DISH
  
const renderDish = (item: MenuItem) => {
  return (
    <MenuItemCard
      key={item.id}
      item={item}
      showCourse={false}
    />
  );
};

  // REUSABLE COMPONENT TO DISPLAY A COURSE
  const renderCourse = (
    title: string,
    items: MenuItem[]
  ) => {
    return (
      <View style={styles.courseSection}>

        <View style={styles.courseHeading}>
          <Text style={styles.courseTitle}>
            {title}
          </Text>

          <Text style={styles.courseCount}>
            {items.length} Items
          </Text>
        </View>

        {items.length === 0 ? (
          <Text style={styles.noCourseItems}>
            No dishes available in this course.
          </Text>
        ) : (
          items.map((item) => renderDish(item))
        )}

      </View>
    );
  };

  // REUSABLE COMPONENT TO DISPLAY STATISTICS
  const renderStat = (
    label: string,
    value: string | number
  ) => {
    return (
      <View style={styles.statRow}>

        <Text style={styles.statLabel}>
          {label}
        </Text>

        <Text style={styles.statValue}>
          {value}
        </Text>

      </View>
    );
  };

  // MAIN SCREEN DESIGN
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
        Today's Menu
      </Text>

      <Text style={styles.subtitle}>
        Discover our freshly prepared dishes,
        made with care for every dining experience.
      </Text>

      {/* MENU ITEMS */}
      {totalItems === 0 ? (

        <View style={styles.emptyCard}>

          <Text style={styles.emptyIcon}>
            🍽️
          </Text>

          <Text style={styles.emptyTitle}>
            No Menu Items Yet
          </Text>

          <Text style={styles.emptyText}>
            The chef has not added any dishes.
            Start by adding your first menu item.
          </Text>

        </View>

      ) : (

        <View>

          {renderCourse('STARTERS', starters)}

          {renderCourse('MAIN COURSES', mains)}

          {renderCourse('DESSERTS', desserts)}

        </View>

      )}

      {/* MENU STATISTICS */}
      <View style={styles.statisticsCard}>

        <Text style={styles.statisticsTitle}>
          ◷ Menu Insights
        </Text>

        <View style={styles.divider} />

        {/* TOTAL NUMBER OF DISHES */}
        {renderStat(
          'Total Menu Items',
          totalItems
        )}

        {/* OVERALL AVERAGE PRICE */}
        {renderStat(
          'Overall Average Price',
          `R${overallAverage.toFixed(2)}`
        )}

        <View style={styles.smallDivider} />

        {/* NUMBER OF ITEMS IN EACH COURSE */}
        <Text style={styles.statisticsSubtitle}>
          Items per Course
        </Text>

        {renderStat(
          'Number of Starters',
          starterCount
        )}

        {renderStat(
          'Number of Main Courses',
          mainCount
        )}

        {renderStat(
          'Number of Desserts',
          dessertCount
        )}

        <View style={styles.smallDivider} />

        {/* AVERAGE PRICE PER COURSE */}
        <Text style={styles.statisticsSubtitle}>
          Average Price per Course
        </Text>

        {renderStat(
          'Average Starter Price',
          `R${starterAverage.toFixed(2)}`
        )}

        {renderStat(
          'Average Main Price',
          `R${mainAverage.toFixed(2)}`
        )}

        {renderStat(
          'Average Dessert Price',
          `R${dessertAverage.toFixed(2)}`
        )}

      </View>

      {/* NAVIGATION BUTTONS */}
      <View style={styles.buttonContainer}>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            router.push('/add-menu-item')
          }
        >
          <Text style={styles.addButtonText}>
            + Add Menu Item
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() =>
            router.push('/filter-menu')
          }
        >
          <Text style={styles.filterButtonText}>
            ☷ Filter Menu
          </Text>
        </TouchableOpacity>

      </View>

      {/* BACK TO HOME */}
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

// ALL SCREEN STYLES
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#34251F',
    marginTop: 7,
  },

  subtitle: {
    color: '#807069',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 7,
    marginBottom: 25,
  },

  courseSection: {
    marginBottom: 22,
  },

  courseHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  courseTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#67564D',
    letterSpacing: 0.5,
  },

  courseCount: {
    fontSize: 12,
    color: '#E75826',
    fontWeight: '600',
  },

  dishCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8DFD9',
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  dishInformation: {
    flex: 1,
    paddingRight: 12,
  },

  dishName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34251F',
  },

  dishDescription: {
    fontSize: 13,
    color: '#807069',
    marginTop: 5,
  },

  dishPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E75826',
  },

  noCourseItems: {
    color: '#A08E85',
    fontSize: 13,
    fontStyle: 'italic',
    paddingVertical: 10,
  },

  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8DFD9',
    borderRadius: 14,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
  },

  emptyIcon: {
    fontSize: 42,
  },

  emptyTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#34251F',
    marginTop: 12,
  },

  emptyText: {
    fontSize: 13,
    color: '#807069',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },

  statisticsCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8DFD9',
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
    marginBottom: 25,
  },

  statisticsTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#34251F',
  },

  statisticsSubtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#34251F',
    marginBottom: 12,
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEE5DE',
    marginVertical: 15,
  },

  smallDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0E8E2',
    marginVertical: 14,
  },

  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },

  statLabel: {
    fontSize: 13,
    color: '#807069',
    flex: 1,
    paddingRight: 10,
  },

  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#34251F',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },

  addButton: {
    backgroundColor: '#E75826',
    padding: 16,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },

  filterButton: {
    backgroundColor: '#FFF0E9',
    padding: 16,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
  },

  filterButtonText: {
    color: '#E75826',
    fontSize: 13,
    fontWeight: 'bold',
  },

  backButton: {
    borderWidth: 1,
    borderColor: '#E3DAD4',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 15,
  },

  backText: {
    color: '#67564D',
    fontWeight: '600',
    fontSize: 13,
  },

});
