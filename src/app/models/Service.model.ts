import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  id: string;
  icon: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  longDescription: string;
  color: string;
  gradient: string;
  features: string[];
  benefits: string[];
  useCases: string[];
  technologies: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    fullDescription: {
      type: String,
      required: true,
    },
    longDescription: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    gradient: {
      type: String,
      required: true,
    },
    features: {
      type: [String],
      default: [],
    },
    benefits: {
      type: [String],
      default: [],
    },
    useCases: {
      type: [String],
      default: [],
    },
    technologies: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const Service = mongoose.model<IService>('Service', ServiceSchema);

