// Example of an Expense model in /models/Expense.js
class Expense {
  constructor(id, name, amount, dueDate, isRecurring, isPaid) {
    this.id = id;
    this.name = name;
    this.amount = amount;
    this.dueDate = dueDate;
    this.isRecurring = isRecurring;
    this.isPaid = isPaid;
  }
}

export default Expense;
