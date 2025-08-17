# Deployment Guide - New England Kits

This guide will help you deploy your website to GitHub and set up hosting.

## 🚀 Step 1: Initialize Git Repository

### If you haven't initialized Git yet:
```bash
# Navigate to your website folder
cd /path/to/your/website

# Initialize Git repository
git init

# Add all files
git add .

# Make initial commit
git commit -m "Initial commit - New England Kits website"
```

## 🚀 Step 2: Create GitHub Repository

1. **Go to GitHub.com** and sign in
2. **Click "New repository"** (green button)
3. **Repository name**: `new-england-kits`
4. **Description**: `New England Kits - Soccer Jersey Store Website`
5. **Make it Public** (for free hosting)
6. **Don't initialize** with README (you already have one)
7. **Click "Create repository"**

## 🚀 Step 3: Push to GitHub

```bash
# Add GitHub as remote origin (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/new-england-kits.git

# Push to GitHub
git push -u origin main
```

## 🚀 Step 4: Set Up GitHub Pages (Free Hosting)

1. **Go to your repository** on GitHub
2. **Click "Settings"** tab
3. **Scroll down to "Pages"** section
4. **Source**: Select "Deploy from a branch"
5. **Branch**: Select "main"
6. **Folder**: Select "/ (root)"
7. **Click "Save"**

Your site will be available at: `https://YOUR_USERNAME.github.io/new-england-kits`

## 🚀 Step 5: Alternative Hosting Options

### Netlify (Recommended - Free)
1. **Go to netlify.com** and sign up
2. **Click "New site from Git"**
3. **Connect to GitHub** and select your repository
4. **Deploy settings**:
   - Build command: (leave empty)
   - Publish directory: (leave empty - root)
5. **Click "Deploy site"**

### Vercel (Free)
1. **Go to vercel.com** and sign up
2. **Click "New Project"**
3. **Import Git repository** and select your repo
4. **Deploy settings**:
   - Framework Preset: Other
   - Root Directory: ./
5. **Click "Deploy"**

## 🚀 Step 6: Custom Domain (Optional)

### For GitHub Pages:
1. **Go to repository Settings > Pages**
2. **Custom domain**: Enter your domain
3. **Save**
4. **Add CNAME record** at your domain provider

### For Netlify/Vercel:
1. **Go to site settings**
2. **Add custom domain**
3. **Follow DNS instructions**

## 🚀 Step 7: Update Inventory

After deployment, you can update your inventory by:

1. **Edit `jerseys.csv`** locally
2. **Commit and push**:
   ```bash
   git add jerseys.csv
   git commit -m "Update inventory"
   git push
   ```
3. **Changes will auto-deploy** (GitHub Pages takes a few minutes)

## 🚀 Step 8: Analytics & SEO

### Google Analytics
1. **Create Google Analytics account**
2. **Add tracking code** to `index.html` head section
3. **Deploy changes**

### Search Console
1. **Submit your site** to Google Search Console
2. **Verify ownership** (usually via HTML tag)
3. **Monitor performance**

## 🚀 Troubleshooting

### Common Issues:

**CORS Errors**: 
- Use the local server (`python server.py`) for development
- Deployed sites won't have CORS issues

**Images Not Loading**:
- Check image paths in `jerseys.csv`
- Ensure images are in the `img/` folder
- Use relative paths (e.g., `img/jersey.jpg`)

**CSV Not Loading**:
- Check browser console for errors
- Ensure CSV file is in the root directory
- Verify CSV format (no extra spaces, proper commas)

**Site Not Updating**:
- GitHub Pages can take 5-10 minutes to update
- Check repository for successful deployment
- Clear browser cache

## 🚀 Maintenance

### Regular Updates:
1. **Update inventory** via CSV
2. **Add new images** to `img/` folder
3. **Commit and push** changes
4. **Monitor site performance**

### Backup:
- Your code is safely stored on GitHub
- Consider backing up images separately
- Keep local copy of CSV for offline editing

---

**Your website is now live and ready for customers! 🎉**
