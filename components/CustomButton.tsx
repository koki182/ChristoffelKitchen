
import React from 'react';

import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';

// PROPERTIES FOR OUR REUSABLE BUTTON
type CustomButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function CustomButton({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
}: CustomButtonProps) {

  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[variant],
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      <Text
        style={[
          styles.buttonText,
          variant === 'primary' && styles.whiteText,
          variant === 'secondary' && styles.orangeText,
          variant === 'outline' && styles.brownText,
          variant === 'danger' && styles.redText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  button: {
    paddingVertical: 15,
    paddingHorizontal: 18,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
    minHeight: 48,
  },

  primary: {
    backgroundColor: '#E75826',
  },

  secondary: {
    backgroundColor: '#FFF0E9',
  },

  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E3DAD4',
  },

  danger: {
    backgroundColor: '#FDE8E7',
  },

  disabled: {
    opacity: 0.5,
  },

  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  whiteText: {
    color: '#FFFFFF',
  },

  orangeText: {
    color: '#E75826',
  },

  brownText: {
    color: '#67564D',
  },

  redText: {
    color: '#C63B32',
  },

});
