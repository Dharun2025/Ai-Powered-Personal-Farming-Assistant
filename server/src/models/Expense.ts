import { Schema, model } from 'mongoose';

const ExpenseSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true, enum: ['Seeds', 'Fertilizer', 'Labor', 'Machinery', 'Transportation'] },
  amount: { type: Number, required: true },
  date: { type: Date, required: true, default: Date.now },
  desc: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now }
});

export const Expense = model('Expense', ExpenseSchema);
export default Expense;
