/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FeedbackCard = ({ question, userAnswer, correctAnswer, isCorrect }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{question.title}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.prompt}>{question.prompt}</Text>
        <Text style={styles.answer}>Your answer: {userAnswer}</Text>
        <Text style={styles.correctAnswer}>Correct answer: {correctAnswer}</Text>
        <Text style={isCorrect ? styles.correct : styles.incorrect}>
          {isCorrect ? 'Correct!' : 'Incorrect!'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
  },
  header: {
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    marginTop: 8,
  },
  prompt: {
    fontSize: 16,
    marginBottom: 4,
  },
  answer: {
    color: '#333',
  },
  correctAnswer: {
    color: 'green',
    marginBottom: 4,
  },
  correct: {
    color: 'green',
  },
  incorrect: {
    color: 'red',
  },
});

export default FeedbackCard;
