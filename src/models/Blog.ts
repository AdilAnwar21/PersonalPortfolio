import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  summary: string;
  content: string; // Markdown content
  coverImage?: string;
  tags: string[];
  published: boolean;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  summary: { type: String, required: true },
  content: { type: String, required: true },
  coverImage: { type: String },
  tags: [{ type: String }],
  published: { type: Boolean, default: false },
  likes: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);
