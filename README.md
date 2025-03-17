# Next.js Raven Ecommerce App

Raven Leather Store is an ecommerce store for buying leather products like Jackets, Wallets, Belts, built using the Next.js, and some of the modern web development technologies.

**Live Demo**: https://ravenleather.vercel.app

## Technologies Used:
- **Next.js with TypeScript** – Full-stack Framework
- **shadcn/ui** – UI Component Library
- **Ant Design** – UI Component Library
- **Tailwind CSS**: CSS Framework
- **Prisma with PostgreSQL** - Database ORM and Storage
- **Auth.js V5** - Authentication Solution
- **Cloudinary** - Cloud Image Management
- **Mailjet** – Email Service Provider
- **cron-job.org** – Scheduled Database Tasks

## Features:
- Sleek and Modern UI Design
- Responsive Design: Ensure the store is optimized for mobile, tablet, and desktop viewing.
- High Performance: Enhanced by Next.js and Vercel optimization.
- Comprehensive Admin Panel
- Robust Authentication: Secure login for every use case. All authentication scenarios are handled.
- Advanced Search Functionality: Live search results along with filters for categories, colors, and price ranges.
- Email Notifications: Send automated emails for order confirmations, shipping updates, and promotions.


## Setup Instructions:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/saadtariq57/raven-leather.git
   ```

2. **Install dependencies:**
   Navigate to the project directory and run:
   ```bash
   npm install
   ```

3. **Create `.env` file in the directory:**
   Inside the directory folder, create a `.env` file and add the following environment variables:
   ```bash
   NEXT_PUBLIC_API_URL= <Your app domain or localhost URL>
   AUTH_SECRET= <Your Auth.js secret key, generate it using `npx auth secret`>
   AUTH_GOOGLE_ID= <Your Google OAuth ID from Google Developer Console>
   AUTH_GOOGLE_SECRET= <Your Google OAuth secret from Google Developer Console>
   DATABASE_URL= <Your database connection URL>
   MAILJET_API_KEY= <Your API key from Mailjet account>
   MAILJET_API_SECRET= <Your secret key from Mailjet account>
   CLOUDINARY_CLOUD_NAME= <Your Cloudinary cloud name>
   CLOUDINARY_API_KEY= <Your Cloudinary API key>
   CLOUDINARY_API_SECRET= <Your Cloudinary API secret>
   ADMIN_USERNAME= <Username for Admin Panel>
   ADMIN_PASSWORD= <Password for Admin Panel>
   ```

4. **Run the application:**
   - For Development Environment:
     ```bash
     npm run dev
     ```
   - For Production Environment:
     ```bash
     npm run build
     npm start
     ```
