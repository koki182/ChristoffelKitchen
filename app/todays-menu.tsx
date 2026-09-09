import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import { router } from 'expo-router';

import { useMenu } from '../context/MenuContext';

export default function TodaysMenuScreen() {
  const { menuItems } = useMenu();

  const starters = menuItems.filter(
    (item) => item.course === 'Starter'
  );

  const mains = menuItems.filter(
    (item) => item.course === 'Main Course'
  );

  const desserts = menuItems.filter(
    (item) => item.course === 'Dessert'
  );

  const calculateAverage = (items: typeof menuItems) => {
    if (items.length === 0) {
      return 0;
    }

    const total = items.reduce(
      (sum, item) => sum + item.price,
      0
    );

    return total / items.length;
  };

  const displayCourse = (
    title: string,
    items: typeof menuItems,
    icon: string
  ) => {
    return (
      <View style={styles.courseSection}>
        <Text style={styles.courseTitle}>
          {icon} {title}
        </Text>

        {items.map((item) => (
          <View
            key={item.id}
            style={styles.menuItem}
          >
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
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.brand}>
          CHRISTOFFEL'S KITCHEN
        </Text>

        <Text style={styles.title}>
          Today's Menu
        </Text>

        {menuItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>
              🍽️
            </Text>

            <Text style={styles.emptyTitle}>
              No Menu Items
            </Text>

            <Text style={styles.emptyText}>
              There are currently no dishes available.
            </Text>
          </View>
        ) : (
          <>
            {displayCourse(
              'STARTERS',
              starters,
              '🥗'
            )}

            {displayCourse(
              'MAIN COURSES',
              mains,
              '🍽️'
            )}

            {displayCourse(
              'DESSERTS',
              desserts,
              '🍰'
            )}

            <View style={styles.insightCard}>
              <Text style={styles.insightTitle}>
                ◷ Menu Insights
              </Text>

              <View style={styles.statRow}>
                <Text style={styles.statLabel}>
                  Total Menu Items
                </Text>

                <Text style={styles.statValue}>
                  {menuItems.length}
                </Text>
              </View>

              <View style={styles.statRow}>
                <Text style={styles.statLabel}>
                  Average Starter Price
                </Text>

                <Text style={styles.statValue}>
                  R{calculateAverage(starters).toFixed(2)}
                </Text>
              </View>

              <View style={styles.statRow}>
                <Text style={styles.statLabel}>
                  Average Main Price
                </Text>

                <Text style={styles.statValue}>
                  R{calculateAverage(mains).toFixed(2)}
                </Text>
              </View>

              <View style={styles.statRow}>
                <Text style={styles.statLabel}>
                  Average Dessert Price
                </Text>

                <Text style={styles.statValue}>
                  R{calculateAverage(desserts).toFixed(2)}
                </Text>
              </View>
            </View>
          </>
        )}

        <View style={styles.buttonRow}>
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
            <Text style={styles.filterText}>
              ⚙ Filter Menu
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => router.push('/home')}
        >
          <Text style={styles.homeText}>
            ← Home
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#34251F',
    marginTop: 5,
    marginBottom: 18,
  },

  courseSection: {
    marginBottom: 20,
  },

  courseTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#5E4B42',
    marginBottom: 8,
  },

  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ECE4DE',
  },

  menuInfo: {
    flex: 1,
  },

  dishName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3B2B24',
  },

  description: {
    color: '#87776F',
    fontSize: 12,
    marginTop: 4,
  },

  price: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#E75826',
  },

  insightCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7DDD6',
    borderRadius: 15,
    padding: 16,
    marginTop: 5,
  },

  insightTitle: {
    fontWeight: 'bold',
    color: '#382A24',
    marginBottom: 12,
  },

  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },

  statLabel: {
    color: '#7B6B63',
    fontSize: 13,
  },

  statValue: {
    fontWeight: 'bold',
    color: '#3C2E27',
  },

  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },

  addButton: {
    flex: 1,
    backgroundColor: '#E75826',
    padding: 15,
    borderRadius: 11,
    alignItems: 'center',
  },

  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },

  filterButton: {
    flex: 1,
    backgroundColor: '#F8E9E1',
    padding: 15,
    borderRadius: 11,
    alignItems: 'center',
  },

  filterText: {
    color: '#E75826',
    fontWeight: 'bold',
    fontSize: 13,
  },

  homeButton: {
    alignItems: 'center',
    padding: 15,
  },

  homeText: {
    color: '#6B5950',
  },

  emptyContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 35,
    borderRadius: 15,
  },

  emptyIcon: {
    fontSize: 45,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#34251F',
    marginTop: 10,
  },

  emptyText: {
    textAlign: 'center',
    color: '#7B6B63',
    marginTop: 8,
  },
});