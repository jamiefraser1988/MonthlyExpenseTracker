import AsyncStorage from '@react-native-async-storage/async-storage';

const EXPENSES_STORAGE_KEY = 'EXPENSES_STORAGE_KEY';

const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // Error clearing data
    console.error(e);
  }
};

const saveExpense = async expense => {
  try {
    // Get the current list of expenses
    expense.id = generateId();
    const existingExpenses = await getExpenses();
    // Add the new expense
    const updatedExpenses = [...existingExpenses, expense];
    // Save the updated list back to storage
    const jsonValue = JSON.stringify(updatedExpenses);
    await AsyncStorage.setItem(EXPENSES_STORAGE_KEY, jsonValue);
  } catch (e) {
    // Saving error
    console.error('Error saving the expense', e);
  }
};

const getExpenseById = async id => {
  try {
    const allExpenses = await AsyncStorage.getItem('expenses');
    if (allExpenses !== null) {
      // Parse the stored expenses
      const expenses = JSON.parse(allExpenses);
      // Find and return the expense with the matching ID
      const expense = expenses.find(expense => expense.id === id);
      return expense;
    }
  } catch (error) {
    // Error retrieving the expense
    console.error('Error retrieving expense by ID:', error);
  }
  return null; // Return null if the expense wasn't found or if there was an error
};

const getExpenses = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(EXPENSES_STORAGE_KEY);
    console.log(jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    // Error reading value
    console.error('Error reading the expenses', e);
    return [];
  }
};

const getRecurringExpenses = async () => {
  try {
    const allExpenses = await getExpenses();
    // Filter the expenses to only return those that are recurring
    return allExpenses.filter(expense => expense.isRecurring);
  } catch (e) {
    // Error reading value
    console.error('Error reading the recurring expenses', e);
    return [];
  }
};

const deleteExpense = async id => {
  try {
    const existingExpenses = await getExpenses();
    // Filter out the expense with the given id
    const updatedExpenses = existingExpenses.filter(
      expense => expense.id !== id,
    );
    // Save the updated list back to storage
    const jsonValue = JSON.stringify(updatedExpenses);
    await AsyncStorage.setItem(EXPENSES_STORAGE_KEY, jsonValue);
  } catch (e) {
    // Deletion error
    console.error('Error deleting the expense', e);
  }
};

// A utility function to assign unique IDs to our expenses.
const generateId = () => {
  return new Date().getTime().toString();
};

export {
  saveExpense,
  getExpenses,
  getRecurringExpenses,
  deleteExpense,
  generateId,
  getExpenseById,
};
