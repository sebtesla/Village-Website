# Database Setup Guide - PostgreSQL with Prisma

This guide will help you set up PostgreSQL database for The Village Merch Store using Prisma ORM.

## 📋 Table of Contents

1. [Database Options](#database-options)
2. [Local PostgreSQL Setup](#local-postgresql-setup)
3. [Cloud Database Setup (Recommended)](#cloud-database-setup)
4. [Prisma Configuration](#prisma-configuration)
5. [Running Migrations](#running-migrations)
6. [Seeding Data](#seeding-data)
7. [Troubleshooting](#troubleshooting)

## Database Options

You have several options for hosting your PostgreSQL database:

### 1. **Supabase** (Recommended for beginners)
- Free tier available
- Generous limits
- Easy setup
- Built-in auth and storage

### 2. **Railway**
- Free $5 monthly credit
- Simple deployment
- One-click PostgreSQL

### 3. **Neon**
- Serverless PostgreSQL
- Free tier available
- Excellent for production

### 4. **Local PostgreSQL**
- Best for development
- Full control
- No internet required

## Cloud Database Setup (Recommended)

### Option A: Supabase (Easiest)

1. **Create Account**
   - Go to [Supabase.com](https://supabase.com)
   - Sign up for free account

2. **Create New Project**
   - Click "New Project"
   - Name: "village-merch-store"
   - Database Password: (save this!)
   - Region: Choose closest to you
   - Click "Create new project"

3. **Get Database URL**
   - Go to Project Settings → Database
   - Find "Connection string" section
   - Choose "URI" format
   - Copy the connection string
   - It looks like: `postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres`

4. **Update Environment Variables**
   ```env
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@[YOUR-HOST]:5432/postgres"
   ```

### Option B: Railway

1. **Create Account**
   - Go to [Railway.app](https://railway.app)
   - Sign up (GitHub recommended)

2. **Create PostgreSQL Database**
   - Click "New Project"
   - Select "Provision PostgreSQL"
   - Wait for provisioning

3. **Get Connection String**
   - Click on PostgreSQL service
   - Go to "Connect" tab
   - Copy "Postgres Connection URL"

4. **Update Environment Variables**
   ```env
   DATABASE_URL="postgresql://postgres:password@hostname:port/railway"
   ```

### Option C: Neon

1. **Create Account**
   - Go to [Neon.tech](https://neon.tech)
   - Sign up for free

2. **Create Project**
   - Click "Create Project"
   - Name: "village-merch"
   - Region: Choose closest

3. **Get Connection String**
   - Copy the connection string from dashboard
   - Format: `postgresql://user:password@host/database`

4. **Update Environment Variables**
   ```env
   DATABASE_URL="postgresql://..."
   ```

## Local PostgreSQL Setup

### macOS

```bash
# Install PostgreSQL
brew install postgresql@15

# Start PostgreSQL
brew services start postgresql@15

# Create database
createdb village_merch

# Connection string
DATABASE_URL="postgresql://localhost:5432/village_merch"
```

### Ubuntu/Linux

```bash
# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start service
sudo systemctl start postgresql

# Create database
sudo -u postgres createdb village_merch

# Create user
sudo -u postgres psql
CREATE USER myuser WITH PASSWORD 'mypassword';
GRANT ALL PRIVILEGES ON DATABASE village_merch TO myuser;

# Connection string
DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/village_merch"
```

### Windows

1. Download PostgreSQL from [postgresql.org](https://www.postgresql.org/download/windows/)
2. Run installer (remember your password!)
3. Use pgAdmin to create database "village_merch"
4. Connection string:
   ```env
   DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/village_merch"
   ```

## Prisma Configuration

1. **Update `.env.local`**
   ```env
   DATABASE_URL="your_connection_string_here"
   ```

2. **Verify Schema**
   - File: `prisma/schema.prisma`
   - Should already be configured with all models

3. **Generate Prisma Client**
   ```bash
   bunx prisma generate
   ```

## Running Migrations

### First Time Setup

1. **Create Migration**
   ```bash
   bunx prisma migrate dev --name init
   ```

   This will:
   - Create database tables
   - Generate Prisma Client
   - Apply schema to database

2. **Verify Migration**
   ```bash
   bunx prisma studio
   ```
   - Opens Prisma Studio (database viewer)
   - Check that all tables exist

### Future Migrations

When you modify `schema.prisma`:

```bash
# Create and apply migration
bunx prisma migrate dev --name your_change_description

# Example
bunx prisma migrate dev --name add_user_roles
```

## Seeding Data

Load initial products and blog posts into your database:

1. **Run Seed Script**
   ```bash
   bunx prisma db seed
   ```

2. **Verify Data**
   ```bash
   bunx prisma studio
   ```
   - Check Products table (should have 5+ products)
   - Check BlogPost table (should have 2+ posts)

3. **Custom Seed**
   - Edit `prisma/seed.ts` to add more data
   - Run seed again to add new items

## Database Models

Your database includes these tables:

### User
- Stores Discord authenticated users
- Links to orders and comments

### Product
- All merchandise items
- Categories, images, pricing
- Size/color variants

### BlogPost
- Blog articles and content
- Categories and tags
- Featured posts

### BlogComment
- User comments on blog posts
- Linked to users and posts

### Order
- Customer orders
- Order status tracking
- Stripe integration

### OrderItem
- Individual items in orders
- Product snapshot at purchase time

## Prisma Studio

Visual database browser included with Prisma:

```bash
# Open Prisma Studio
bunx prisma studio
```

Features:
- Browse all tables
- Edit data directly
- Filter and search
- Add/delete records

Access at: `http://localhost:5555`

## Common Commands

```bash
# Generate Prisma Client
bunx prisma generate

# Create migration
bunx prisma migrate dev

# Reset database (WARNING: deletes all data)
bunx prisma migrate reset

# Push schema without migration
bunx prisma db push

# Open Prisma Studio
bunx prisma studio

# Seed database
bunx prisma db seed

# Format schema file
bunx prisma format
```

## Troubleshooting

### "Can't reach database server"
- Check DATABASE_URL is correct
- Verify database is running
- Test connection with `bunx prisma db pull`

### "Authentication failed"
- Verify username and password
- Check special characters are URL-encoded
- For Supabase, use the connection pooler URL

### "Database does not exist"
- Create database manually
- For Supabase, it's created automatically
- Check database name in connection string

### Migration Failed
- Try: `bunx prisma migrate reset` (WARNING: deletes data)
- Or manually fix and run `bunx prisma migrate dev`

### Seed Script Errors
- Check `prisma/seed.ts` for errors
- Verify all required fields are present
- Run with `--preview-feature` if needed

## Production Deployment

### Environment Variables

Set in your hosting platform:

```env
DATABASE_URL="postgresql://production-url-here"
```

### Run Migrations

```bash
# Deploy migrations to production
bunx prisma migrate deploy
```

### Connection Pooling

For serverless deployments (Vercel, Netlify):

1. **Supabase**: Use connection pooler URL
   ```
   postgresql://postgres:password@pooler.supabase.com:6543/postgres
   ```

2. **Neon**: Built-in connection pooling
   ```
   postgresql://user:password@neon.tech/database
   ```

3. **PgBouncer**: Set up connection pooler
   ```
   DATABASE_URL="postgresql://pooler-url"
   DIRECT_URL="postgresql://direct-url"
   ```

## Security Best Practices

1. **Never commit DATABASE_URL**
   - Already in `.gitignore`
   - Use environment variables

2. **Use strong passwords**
   - Generate with: `openssl rand -base64 32`

3. **Limit database access**
   - Whitelist IP addresses
   - Use SSL connections

4. **Regular backups**
   - Supabase: Automatic backups
   - Railway: Manual backups available
   - Local: Use `pg_dump`

## Next Steps

1. ✅ Set up database (cloud or local)
2. ✅ Update DATABASE_URL in `.env.local`
3. ✅ Run migrations: `bunx prisma migrate dev`
4. ✅ Seed data: `bunx prisma db seed`
5. ✅ Verify with Prisma Studio
6. ✅ Restart development server

## Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Railway Docs](https://docs.railway.app)
- [PostgreSQL Tutorial](https://www.postgresql.org/docs/)

---

**Need Help?** Check the troubleshooting section or visit the Prisma Discord community.
