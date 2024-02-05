import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, Button, Alert} from 'react-native';
import ExpenseItem from '../components/ExpenseITem';
import {getRecurringExpenses, deleteExpense} from '../services/StorageService'; // Placeholder for your actual storage handling functions

const RecurringExpensesScreen = ({navigation}) => {
  const [recurringExpenses, setRecurringExpenses] = useState([]);

  useEffect(() => {
    loadRecurringExpenses();
  }, []);

  const loadRecurringExpenses = async () => {
    const expenses = await getRecurringExpenses(); // Fetch recurring expenses from storage
    setRecurringExpenses(expenses);
  };

  const handleDeleteExpense = async id => {
    await deleteExpense(id); // Delete the expense from storage
    loadRecurringExpenses(); // Refresh the list of recurring expenses
  };

  const handleEditExpense = expense => {
    // Navigate to an 'EditExpenseScreen' with the expense data
    // This assumes you have a separate screen for editing expenses
    navigation.navigate('EditExpenseScreen', {expense});
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={recurringExpenses}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.expenseItem}>
            <ExpenseItem
              expense={item}
              onTogglePaid={() => {} /* Implement if needed */}
            />
            <View style={styles.buttonsContainer}>
              <Button title="Edit" onPress={() => handleEditExpense(item)} />
              <Button
                title="Delete"
                color="#ff6347"
                onPress={() => handleDeleteExpense(item.id)}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  expenseItem: {
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});

export default RecurringExpensesScreen;
