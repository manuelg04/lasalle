/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function parseEquation(equation) {
    const elements = [];
  
    // Expresión regular para parsear la ecuación
    const regex = /^(\d*)(A)(\^\d+)?([+\-])(\d+)\/((A)(\^\d+)?)?$/;
  
    const match = equation.match(regex);
  
    if (match) {
      const coefficient = match[1] || '1';
      const variable = match[2];
      const exponent = match[3] || '';
      const operator = match[4];
      const numerator = match[5];
      const denominator = match[7] || '1';
      const denominatorExponent = match[8] || '';
  
      // Generar los elementos de la ecuación
      if (coefficient !== '1') {
        elements.push({ type: 'coefficient', value: coefficient });
      }
      elements.push({ type: 'variable', value: variable });
      if (exponent) {
        elements.push({ type: 'exponent', value: exponent.slice(1) });
      }
      elements.push({ type: 'operator', value: operator });
      elements.push({ type: 'fraction', numerator, denominator: denominator + denominatorExponent });
    }
  
    return elements;
  }

  function MathRenderer({ equation }) {
    const parsedEquation = parseEquation(equation);
  
    return (
      <View style={styles.container}>
        {parsedEquation.map((elem, index) => {
          switch (elem.type) {
            case 'coefficient':
              return <Text key={index} style={styles.coefficient}>{elem.value}</Text>;
            case 'variable':
              return <Text key={index} style={styles.variable}>{elem.value}</Text>;
            case 'exponent':
              return <Text key={index} style={styles.exponent}>{elem.value}</Text>;
            case 'operator':
              return <Text key={index} style={styles.operator}>{elem.value}</Text>;
            case 'fraction':
              return (
                <View key={index} style={styles.fractionContainer}>
                  <Text style={styles.numerator}>{elem.numerator}</Text>
                  <View style={styles.line} />
                  <View style={styles.denominatorContainer}>
                  <Text style={styles.denominator}>{elem.denominator.split('^')[0]}</Text>
                  {elem.denominator.includes('^') && (
                    <Text style={styles.denominatorExponent}>
                      {elem.denominator.split('^')[1]}
                    </Text>
                    )}
                  </View>
                </View>
              );
            default:
              return null;
          }
        })}
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fractionContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  line: {
    height: 1,
    width: 20,
    backgroundColor: 'black',
    marginVertical: 2,
  },
  coefficient: {
    fontSize: 16,
  },
  variable: {
    fontSize: 16,
  },
  exponent: {
    fontSize: 12,
    lineHeight: 14,
  },
  operator: {
    marginHorizontal: 5,
  },
  numerator: {
    fontSize: 12,
  },
  denominatorContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  denominator: {
    fontSize: 12,
  },
  denominatorExponent: {
    fontSize: 10,
    lineHeight: 12,
  },
});

export default MathRenderer;
