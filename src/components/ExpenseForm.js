import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Switch,
  Button,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const ExpenseForm = ({onSave, onCancel}) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [isRecurring, setIsRecurring] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = () => {
    // Convert amount to a number and validate inputs
    const expenseData = {
      name,
      amount: parseFloat(amount),
      dueDate: formatDate(dueDate), // Format YYYY-MM-DD
      isRecurring,
    };
    onSave(expenseData);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dueDate;
    setShowDatePicker(Platform.OS === 'ios');
    setDueDate(currentDate);
  };

  const formatDate = date => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Creditor or Bill Name"
      />

      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        placeholder="Amount Owed"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Due Date</Text>
      <View>
        <Button
          title={`Choose Date: ${formatDate(dueDate)}`}
          onPress={() => setShowDatePicker(true)}
        />
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dueDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Recurring Payment</Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isRecurring ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={setIsRecurring}
          value={isRecurring}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={handleSave} />
        <Button title="Cancel" onPress={onCancel} color="#ff6347" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
  },
  input: {
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default ExpenseForm;
