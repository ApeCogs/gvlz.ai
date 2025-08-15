# GitHub and Vercel Setup Instructions

## Step 1: Create GitHub Repository

### Manual Setup via GitHub Web Interface

1. **Go to GitHub**: https://github.com/new
2. **Create New Repository**:
   - Repository name: `gvlz-website`
   - Description: "Personal blog at gvlz.ai - Built with Astro"
   - Public repository: ✅
   - Initialize with README: ❌ (important - leave unchecked)
   - Add .gitignore: ❌ (we already have one)
   - Choose license: MIT (optional)

3. **After Creating, GitHub Will Show Commands**. Use these:

```bash
# Add GitHub as remote origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/ApeCogs/gvlz.ai.git

# Push your code to GitHub
git branch -M main
git push -u origin main
```

## Step 2: Setup Vercel Deployment

### Connect Vercel to GitHub

1. **Go to Vercel**: https://vercel.com/new
2. **Import Git Repository**:
   - Click "Import from GitHub"
   - Authorize Vercel to access your GitHub account
   - Select the `gvlz-website` repository

3. **Configure Project**:
   - Framework Preset: **Astro** (should auto-detect)
   - Root Directory: `./` (leave as default)
   - Build Settings:
     - Build Command: `npm run build` (default)
     - Output Directory: `dist` (default)
     - Install Command: `npm install` (default)
   - Environment Variables: None needed currently

4. **Deploy**:
   - Click "Deploy"
   - Wait for initial deployment (usually 1-2 minutes)
   - You'll get a preview URL like: `gvlz-website-xxx.vercel.app`

### Configure Custom Domain (gvlz.ai)

1. **In Vercel Dashboard**:
   - Go to your project settings
   - Navigate to "Domains"
   - Add `gvlz.ai` as custom domain

2. **Update DNS Records** (at your domain registrar):
   - Add an A record pointing to Vercel's IP (usually `76.76.21.21`)
   - Or add a CNAME record pointing to `cname.vercel-dns.com`
   - Vercel will show exact instructions for your domain

## Step 3: Setup Automatic Deployments

### GitHub Integration Features

Once connected, Vercel will automatically:
- Deploy every push to `main` branch to production
- Create preview deployments for all pull requests
- Provide deployment URLs for testing
- Show deployment status in GitHub

### Recommended Workflow

1. **For Bug Fixes** (like the date issue):
   ```bash
   # Create feature branch
   git checkout -b fix/date-timezone-issues
   
   # Make changes
   # ... edit files ...
   
   # Commit changes
   git add .
   git commit -m "Fix: Remove redundant date adjustment causing timezone issues"
   
   # Push to GitHub
   git push origin fix/date-timezone-issues
   ```

2. **Create Pull Request**:
   - Go to GitHub repository
   - Click "Compare & pull request"
   - Review changes
   - Vercel will automatically create preview deployment
   - Test the preview URL
   - If everything works, merge to main

3. **Production Deployment**:
   - After merging PR, Vercel auto-deploys to production
   - Changes live at gvlz.ai within minutes

## Alternative: Using GitHub CLI (if you install it later)

If you want to install GitHub CLI for easier management:

```bash
# macOS with Homebrew (if you install Homebrew)
brew install gh

# Or download from: https://cli.github.com/

# Then authenticate
gh auth login

# Create repo from command line
gh repo create gvlz-website --public --source=. --remote=origin --push
```

## Quick Commands Reference

```bash
# Check current remotes
git remote -v

# Add GitHub remote (replace with your URL)
git remote add origin https://github.com/YOUR_USERNAME/gvlz-website.git

# Push to GitHub
git push -u origin main

# Create and switch to new branch
git checkout -b branch-name

# Push new branch to GitHub
git push origin branch-name

# Check deployment status
# Visit: https://vercel.com/YOUR_USERNAME/gvlz-website
```

## Troubleshooting

### If Push Fails
```bash
# If you get authentication errors, you may need a personal access token
# Go to: https://github.com/settings/tokens
# Generate new token with 'repo' scope
# Use token as password when prompted
```

### If Vercel Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Verify Node version compatibility
- Check for missing environment variables

## Next Steps

After setup is complete:
1. ✅ Repository will be on GitHub
2. ✅ Vercel will auto-deploy from main branch
3. ✅ You can create branches for features/fixes
4. ✅ Pull requests get preview deployments
5. 🚀 Ready to fix the date timezone issue!

---

*Created: 2025-01-12*
*Purpose: Guide for setting up GitHub repository and Vercel deployment for gvlz-website*