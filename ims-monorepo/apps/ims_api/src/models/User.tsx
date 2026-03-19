import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

// Prevent model re-compilation in hot-reload (Next.js / dev mode)
const User = models.User || model('User', userSchema);

export default User;