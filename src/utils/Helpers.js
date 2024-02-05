export const formatDate = date => {
  const options = {year: 'numeric', month: 'long', day: 'numeric'};
  return date.toLocaleDateString('en-US', options);
};

export const formatAmount = amount => {
  return `$${amount.toFixed(2)}`;
};

export const validateExpense = ({name, amount, dueDate}) => {
  const errors = {};
  if (!name) {
    errors.name = 'Name cannot be empty.';
  }
  if (!amount || isNaN(amount) || amount <= 0) {
    errors.amount = 'Enter a valid amount.';
  }
  if (!dueDate || new Date(dueDate) < new Date()) {
    errors.dueDate = 'Due date cannot be in the past.';
  }
  return errors;
};

export const generateUUID = () => {
  // A simple utility function to generate a UUID (not RFC compliant)
  return 'xxxx-xxxx-4xxx-yxxx-xxxx-xxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 || 0;
    const v = c === 'x' ? r : r & 0x3 || 0x8;
    return v.toString(16);
  });
};
