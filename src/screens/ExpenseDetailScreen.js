import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import {getExpenseById, deleteExpense} from '../services/StorageService'; // Assume these functions are implemented

const ExpenseDetailScreen = ({route, navigation}) => {
  const {expenseId} = route.params;
  const [expense, setExpense] = useState(null);

  useEffect(() => {
    const loadExpenseDetails = async () => {
      const loadedExpense = await getExpenseById(expenseId);
      if (loadedExpense) {
        setExpense(loadedExpense);
      } else {
        Alert.alert('Error', 'Expense not found');
        navigation.goBack();
      }
    };

    loadExpenseDetails();
  }, [expenseId, navigation]); // Add dependencies here

  const handleDelete = async () => {
    await deleteExpense(expenseId);
    Alert.alert('Success', 'Expense deleted');
    navigation.goBack(); // Navigate back to the previous screen after deletion
  };

  if (!expense) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name: {expense.name}</Text>
      <Text style={styles.label}>Amount: ${expense.amount.toFixed(2)}</Text>
      <Text style={styles.label}>Due Date: {expense.dueDate}</Text>
      <Text style={styles.label}>
        Recurring: {expense.isRecurring ? 'Yes' : 'No'}
      </Text>
      <Button title="Delete Expense" onPress={handleDelete} color="#FF6347" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ExpenseDetailScreen;
