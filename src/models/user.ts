import bcrypt from 'bcrypt';
import mongoose, { Document, Schema } from 'mongoose';

// Define the User interface
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  correctPassword(candidatePassword: string, userPassword: string): Promise<boolean>;
}

// Define the User schema
const userSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
 
  createdAt: { type: Date, default: Date.now },
});

// Pre-Save Hook to Hash Password
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;
    next();
  } catch (error:any) {
    return next(error);
  }
});

// Method to Compare Passwords
userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Create the User model
// const UserModel = mongoose.model<IUser>('User', UserSchema);

// export default UserModel;

export default  mongoose.models.User || mongoose.model('User', userSchema);
