import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  authorName: string;
  authorTitle?: string;
  company?: string;
  content: string;
  avatarUrl?: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

const TestimonialSchema: Schema = new Schema({
  authorName: { type: String, required: true },
  authorTitle: { type: String },
  company: { type: String },
  content: { type: String, required: true },
  avatarUrl: { type: String },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
}, { timestamps: true });

export default mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
