import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const ExpenseItem = ({expense, onTogglePaid, onDelete}) => {
  const navigation = useNavigation(); // Hook to get navigation object

  const {id, name, amount, dueDate, isPaid} = expense;

  // Navigate to ExpenseDetailScreen with the expense's id as a parameter
  const handlePress = () => {
    navigation.navigate('ExpenseDetail', {expenseId: id});
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.amount}>£{amount.toFixed(2)}</Text>
        <Text style={styles.dueDate}>Due: {dueDate}</Text>
      </View>
      <Menu>
        <MenuTrigger>
          <Text style={styles.menuTrigger}>⋮</Text>
        </MenuTrigger>
        <MenuOptions>
          <MenuOption
            onSelect={() => onTogglePaid(id)}
            text={isPaid ? 'Mark as Unpaid' : 'Mark as Paid'}
          />
          <MenuOption onSelect={() => onDelete(id)} text="Delete" />
        </MenuOptions>
      </Menu>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 14,
    color: '#4CAF50',
  },
  dueDate: {
    fontSize: 14,
    color: '#FF9800',
  },
  menuTrigger: {
    fontSize: 24,
    color: '#000',
    padding: 10,
  },
  // Add more styles as needed
});

export default ExpenseItem;
