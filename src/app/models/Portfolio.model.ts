import mongoose, { Schema, Document } from 'mongoose';

export interface IPortfolio extends Document {
  id: string;
  title: string;
  tagline: string;
  category: string;
  image: string;
  color: string;
  icon?: string; // Optional now
  description: string;
  fullDescription: string;
  technologies: string[];
  features: string[];
  results: string[];
  client: string;
  duration: string;
  status: string;
  liveLink?: string; // New field for project live link
  createdAt: Date;
  updatedAt: Date;
}

const PortfolioSchema = new Schema<IPortfolio>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    tagline: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: false,
    },
    liveLink: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    fullDescription: {
      type: String,
      required: true,
    },
    technologies: {
      type: [String],
      default: [],
    },
    features: {
      type: [String],
      default: [],
    },
    results: {
      type: [String],
      default: [],
    },
    client: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Portfolio = mongoose.model<IPortfolio>('Portfolio', PortfolioSchema);

