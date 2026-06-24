import mongoose, { Schema, Document } from 'mongoose';

export interface IExperience extends Document {
  role: string;
  company: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description: string[];
  technologies: string[];
  order: number;
}

const ExperienceSchema: Schema = new Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  current: { type: Boolean, default: false },
  description: [{ type: String }],
  technologies: [{ type: String }],
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Experience || mongoose.model<IExperience>('Experience', ExperienceSchema);
