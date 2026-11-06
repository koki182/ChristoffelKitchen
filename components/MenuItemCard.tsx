
import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import type { MenuItem } from '../context/MenuContext';

// Information that the component receives
type MenuItemCardProps = {
  item: MenuItem;
  showCourse?: boolean;
  onEdit?: () => void;
  onRemove?: () => void;
};

export default function MenuItemCard({
  item,
  showCourse = true,
  onEdit,
  onRemove,
}: MenuItemCardProps) {

  return (
    <View style={styles.card}>

      <View style={styles.topRow}>

        <View style={styles.dishDetails}>

          <Text style={styles.dishName}>
            {item.dishName}
          </Text>

          <Text style={styles.description}>
            {item.description}
          </Text>

          {showCourse && (
            <Text style={styles.course}>
              {item.course}
            </Text>
          )}

        </View>

        <Text style={styles.price}>
          R{item.price.toFixed(2)}
        </Text>

      </View>

      {/* Only show buttons when functions are provided */}
      {(onEdit || onRemove) && (
        <View style={styles.buttonRow}>

          {onEdit && (
            <TouchableOpacity
              style={styles.editButton}
              onPress={onEdit}
            >
              <Text style={styles.editText}>
                Edit
              </Text>
            </TouchableOpacity>
          )}

          {onRemove && (
            <TouchableOpacity
              style={styles.removeButton}
              onPress={onRemove}
            >
              <Text style={styles.removeText}>
                Remove
              </Text>
            </TouchableOpacity>
          )}

        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8DFD9',
    padding: 16,
    marginBottom: 12,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  dishDetails: {
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
    lineHeight: 19,
  },

  course: {
    fontSize: 12,
    color: '#A08E85',
    marginTop: 8,
  },

  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E75826',
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 15,
    gap: 10,
  },

  editButton: {
    backgroundColor: '#FFF0E9',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },

  editText: {
    color: '#E75826',
    fontSize: 13,
    fontWeight: 'bold',
  },

  removeButton: {
    backgroundColor: '#FDE8E7',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },

  removeText: {
    color: '#C63B32',
    fontSize: 13,
    fontWeight: 'bold',
  },

});
