import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';
import ExpenseItem from '../components/ExpenseITem';
import {
  getExpenses,
  saveExpense,
  deleteExpense,
} from '../services/StorageService'; // Assuming you have these functions implemented
import {useFocusEffect} from '@react-navigation/native';

const HomeScreen = ({navigation}) => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    const loadedExpenses = await getExpenses();
    console.log(expenses);
    setExpenses(loadedExpenses);
  };

  useFocusEffect(
    React.useCallback(() => {
      loadExpenses();
    }, []),
  );

  const handleAddExpense = () => {
    navigation.navigate('AddExpense');
  };

  const handleTogglePaid = async id => {
    const updatedExpenses = expenses.map(expense => {
      if (expense.id === id) {
        return {...expense, isPaid: !expense.isPaid};
      }
      return expense;
    });
    setExpenses(updatedExpenses);
    await saveExpense(updatedExpenses); // Assuming this updates the expense in persistent storage
    loadExpenses(); // Reload expenses to reflect changes
  };

  const handleDeleteExpense = id => {
    // Filter out the expense to delete
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);
    deleteExpense(id);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={expenses}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <ExpenseItem
            expense={item}
            onTogglePaid={() => handleTogglePaid(item.id)}
            onDelete={() => handleDeleteExpense(item.id)} // Pass the delete handler
          />
        )}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddExpense')} // Adjust this line according to your navigation setup
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#03A9F4',
    borderRadius: 28,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
  },
  fabIcon: {
    fontSize: 24,
    color: 'white',
  },
});

export default HomeScreen;
