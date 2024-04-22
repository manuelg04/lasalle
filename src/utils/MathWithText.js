import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function FractionRenderer({ numerator, denominator, numeratorExponent, denominatorExponent }) {
  return (
    <View style={styles.container}>
      <View style={styles.numerator}>
        <Text style={styles.text}>{numerator}</Text>
        {numeratorExponent && (
          <Text style={styles.exponent}>{numeratorExponent}</Text>
        )}
      </View>
      <View style={styles.divider} />
      <View style={styles.denominator}>
        <Text style={styles.text}>{denominator}</Text>
        {denominatorExponent && (
          <Text style={styles.exponent}>{denominatorExponent}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  numerator: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  denominator: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: '100%',
    marginVertical: 2,
  },
  text: {
    fontSize: 18,
  },
  exponent: {
    fontSize: 12,
    lineHeight: 12,
  },
});

export default FractionRenderer;