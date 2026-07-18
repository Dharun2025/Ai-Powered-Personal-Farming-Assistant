import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['farmer', 'admin'], default: 'farmer' },
  createdAt: { type: Date, default: Date.now }
});

export const User = model('User', UserSchema);
export default User;
