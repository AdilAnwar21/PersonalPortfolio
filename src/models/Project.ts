import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  category: 'Freelance' | 'Personal';
  tags: string[];
  mainImage: string;
  galleryImages: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
  order: number;
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  category: { type: String, enum: ['Freelance', 'Personal'], required: true },
  tags: [{ type: String }],
  mainImage: { type: String, required: true },
  galleryImages: [{ type: String }],
  liveUrl: { type: String },
  repoUrl: { type: String },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
