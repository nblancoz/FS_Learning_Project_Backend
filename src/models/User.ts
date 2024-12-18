import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  password: string
  role?: string
  tokens: string[]
  toJSON(): object
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Please insert your name'],
    },
    email: {
      type: String,
      match: [/.+@.+\..+/, 'Email not valid'],
      unique: true,
      required: [true, 'Please insert your email'],
    },
    password: {
      type: String,
      required: [true, 'Please insert your password'],
    },
    role: String,
    tokens: [],
  },
  { timestamps: true },
)

UserSchema.methods.toJSON = function () {
  const user = this._doc
  delete user.tokens
  delete user.password
  return user
}

export const User = mongoose.model<IUser>('User', UserSchema)
