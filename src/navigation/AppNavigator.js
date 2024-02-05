import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen'; // Make sure this import is correct
import RecurringExpensesScreen from '../screens/RecurringExpensesScreen';
import ExpenseDetailScreen from '../screens/ExpenseDetailScreen'; // If you have a screen for viewing expense details

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Expenses Overview'}}
        />
        <Stack.Screen
          name="AddExpense"
          component={AddExpenseScreen}
          options={{title: 'Add New Expense'}}
        />
        <Stack.Screen
          name="RecurringExpenses"
          component={RecurringExpensesScreen}
          options={{title: 'Recurring Expenses'}}
        />
        {/* If you have a detail screen for viewing individual expenses */}
        <Stack.Screen
          name="ExpenseDetail"
          component={ExpenseDetailScreen}
          options={{title: 'Expense Details'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
