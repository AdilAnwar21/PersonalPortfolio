import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  blogId: mongoose.Types.ObjectId;
  authorName: string;
  content: string;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema: Schema = new Schema({
  blogId: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
  authorName: { type: String, required: true },
  content: { type: String, required: true },
  isApproved: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Comment || mongoose.model<IComment>('Comment', CommentSchema);
