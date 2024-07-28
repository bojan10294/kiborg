import { Schema, model, Document, Types } from 'mongoose';

interface IRefreshToken extends Document {
  userId: Types.ObjectId;
  token: string;
  expires: Date;
}

const refreshTokenSchema = new Schema<IRefreshToken>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  token: { type: String, required: true },
  expires: { type: Date, required: true },
});

const RefreshToken = model<IRefreshToken>('RefreshToken', refreshTokenSchema);

export default RefreshToken;
