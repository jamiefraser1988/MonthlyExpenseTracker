import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import ExpenseForm from '../components/ExpenseForm';
import {saveExpense} from '../services/StorageService'; // Assuming you have implemented this function

const AddExpensesScreen = ({navigation}) => {
  const handleSaveExpense = async expenseData => {
    try {
      await saveExpense(expenseData); // Save the expense to your storage (e.g., AsyncStorage or database)
      navigation.goBack(); // Navigate back to the previous screen (typically the home screen)
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to save the expense. Please try again later.',
      );
    }
  };

  const handleCancel = () => {
    navigation.goBack(); // Simply navigate back without saving anything if the user cancels
  };

  return (
    <View style={styles.container}>
      <ExpenseForm onSave={handleSaveExpense} onCancel={handleCancel} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default AddExpensesScreen;
