import mongoose, { Schema, Document } from 'mongoose';

export interface ISocialLink {
  platform: string;
  url: string;
  icon?: string;
}

export interface ISettings extends Document {
  heroTitle: string;
  heroSubtitle?: string;
  aboutText: string;
  contactEmail: string;
  socialLinks: ISocialLink[];
  resumePdfUrl?: string;
  profilePhotoUrl?: string;
  skills?: string[];
  availableForWork?: boolean;
}

const SettingsSchema: Schema = new Schema({
  heroTitle: { type: String, required: true },
  heroSubtitle: { type: String },
  aboutText: { type: String, required: true },
  contactEmail: { type: String, required: true },
  socialLinks: [{
    platform: { type: String },
    url: { type: String },
    icon: { type: String }
  }],
  resumePdfUrl: { type: String },
  profilePhotoUrl: { type: String },
  skills: [{ type: String }],
  availableForWork: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);
