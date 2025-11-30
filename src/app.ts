import express, { type Request, type Response } from 'express';
import cors from 'cors';

// Import routes
import authRoutes from './app/modules/auth/auth.routes.js';
import adminRoutes from './app/modules/admin/admin.routes.js';
import publicRoutes from './app/modules/public/public.routes.js';

const app = express();

// Middleware - CORS must be first!
// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://nexa-tech-client.vercel.app',
  'https://www.nexa-tech-client.vercel.app',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, Postman, etc.) in development
    if (!origin && process.env.NODE_ENV === 'development') {
      callback(null, true);
      return;
    }
    
    // Allow all origins in development
    if (process.env.NODE_ENV === 'development') {
      callback(null, true);
      return;
    }
    
    // In production, check against allowed list
    if (origin && allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // Log for debugging
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Authorization'],
  optionsSuccessStatus: 200,
  preflightContinue: false,
}));

// Log CORS for debugging
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    console.log('OPTIONS request received from:', req.headers.origin);
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", async(req: Request, res: Response)=>{
    res.status(200).json({
        message: "Welcome to NexaTech Server App",
        version: "1.0.0",
        endpoints: {
            public: "/api/public",
            auth: "/api/auth",
            admin: "/api/admin"
        }
    })
})

// API Routes
app.use('/api/public', publicRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
    // Set CORS headers for 404 responses
    const origin = req.headers.origin;
    if (origin && allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Credentials', 'true');
    }
    res.status(404).json({ message: 'Route not found' });
});

// Error handler - must be after routes
app.use((err: Error, req: Request, res: Response, next: express.NextFunction) => {
    // Don't block CORS headers on errors
    console.error('Error:', err);
    
    // Ensure CORS headers are set even on errors
    const origin = req.headers.origin;
    if (origin && allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Credentials', 'true');
    }
    
    // Handle CORS errors specifically
    if (err.message === 'Not allowed by CORS') {
        res.status(403).json({ 
            message: 'CORS error: Origin not allowed',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
        return;
    }
    
    res.status(500).json({ 
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

export default app;