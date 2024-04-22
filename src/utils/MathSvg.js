/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function parseEquation(equation) {
  const elements = [];

  

  // Verificar si la ecuación tiene la forma "xt2-xt1t2-t1" o "t2-t1xt2-xt1" o "vt2-vt1t2-t1"
  const coefficientMatch = equation.match(/^([a-zA-Z]+)([a-zA-Z\d]+)-([a-zA-Z]+)([a-zA-Z\d]+)([a-zA-Z\d]+)-([a-zA-Z\d]+)$/);
  if (coefficientMatch) {
    elements.push({ type: 'coefficient', value: coefficientMatch[1], subscript: coefficientMatch[2] });
    elements.push({ type: 'operator', value: '-' });
    elements.push({ type: 'coefficient', value: coefficientMatch[3], subscript: coefficientMatch[4] });
    elements.push({ type: 'coefficient', value: coefficientMatch[5], subscript: '' });
    elements.push({ type: 'operator', value: '-' });
    elements.push({ type: 'coefficient', value: coefficientMatch[6], subscript: '' });
    return elements;
  }

  const fractionAndExponentMatch = equation.match(/([a-zA-Z]+)\/([a-zA-Z]+)=([a-zA-Z\d]+)(\^\d+)?/);
  if (fractionAndExponentMatch) {
    elements.push({
      type: 'fraction',
      numerator: fractionAndExponentMatch[1],
      denominator: fractionAndExponentMatch[2],
    });
    elements.push({ type: 'text', value: '=' });
    // Verificar si hay un exponente
    const base = fractionAndExponentMatch[3];
    const exponent = fractionAndExponentMatch[4];
    if (exponent) {
      elements.push({ type: 'exponent', base, power: exponent.slice(1) });
    } else {
      elements.push({ type: 'text', value: base });
    }
    return elements;
  }

  // Retener la estructura actual si no coinciden con las expresiones con fracciones/exponentes
  elements.push({ type: 'text', value: equation });
  return elements;
}
function EquationRenderer({ equation }) {
  const parsedEquation = parseEquation(equation);

  return (
    <View style={styles.container}>
      {parsedEquation.map((elem, index) => {
        switch (elem.type) {
          case 'coefficient':
            return (
              <View key={index} style={styles.coefficientContainer}>
                <Text style={styles.coefficient}>{elem.value}</Text>
                {elem.subscript && <Text style={styles.subscript}>{elem.subscript}</Text>}
              </View>
            );
          case 'operator':
            return <Text key={index} style={styles.operator}>{elem.value}</Text>;
          case 'fraction':
            return (
              <View key={index} style={styles.fractionContainer}>
                <Text style={styles.numerator}>{elem.numerator}</Text>
                <View style={styles.line} />
                <Text style={styles.denominator}>{elem.denominator}</Text>
              </View>
            );
          case 'exponent':
            return (
              <View key={index} style={styles.exponentContainer}>
                <Text>{elem.base}</Text>
                <Text style={styles.superscript}>{elem.power}</Text>
              </View>
            );
          case 'text':
          default:
            return <Text key={index} style={styles.text}>{elem.value}</Text>;
        }
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  fractionContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 2
  },
  line: {
    height: 1,
    width: 20,
    backgroundColor: 'black',
    marginVertical: 2,
  },
  exponentContainer: {
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  superscript: {
    fontSize: 12,
    lineHeight: 14,
    marginBottom: 12 // Adjust this as needed to line up the exponent appropriately
  },
  text: {
    fontSize: 16
  },
  operator: {
    marginHorizontal: 5,
  },
  coefficient: {
    fontSize: 16,
  },
  subscript: {
    fontSize: 12,
    lineHeight: 14,
  },
});

export default EquationRenderer;
