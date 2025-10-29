# Terminal Commands to Deploy Your Changes

## Quick Answer

Your changes will **automatically deploy** when you push to the `main` branch. GitHub Actions will handle everything - you don't need to manually deploy!

## Step-by-Step Terminal Commands

### Option 1: If you want to merge your current branch to main

```bash
# 1. Check your current branch and status
git status
git branch

# 2. Make sure all your changes are committed
git add .
git commit -m "Your description of changes"

# 3. Switch to main branch (or create it if it doesn't exist)
git checkout main

# If main doesn't exist locally, create it from your current branch:
# git checkout -b main

# 4. Merge your feature branch into main
git merge your-feature-branch  # Replace with your actual branch name

# 5. Push to main (this triggers automatic deployment)
git push origin main

# 6. Wait 1-2 minutes for GitHub Actions to deploy
# Then visit: https://laxminarayan24.github.io/Happy-Birthday/
```

### Option 2: If you want to push directly from your current branch to main

```bash
# 1. Make sure all changes are committed
git status
git add .
git commit -m "Your description of changes"

# 2. Push your current branch directly to main on remote
git push origin your-feature-branch:main  # Replace your-feature-branch with your actual branch name

# 3. Wait 1-2 minutes for automatic deployment
# Then visit: https://laxminarayan24.github.io/Happy-Birthday/
```

### Option 3: Using Pull Request (Recommended for review)

```bash
# 1. Push your current branch to GitHub
git push origin your-feature-branch  # Replace with your actual branch name

# 2. Go to GitHub in your browser:
#    https://github.com/LAXMINARAYAN24/Happy-Birthday

# 3. Create a Pull Request from your-feature-branch to main

# 4. Review the changes and merge the PR on GitHub

# 5. Changes automatically deploy in 1-2 minutes after merge
```

## Do You Need to Deploy Again?

**NO!** You do NOT need to manually deploy. Here's why:

1. **Automatic Deployment**: Your repository has GitHub Actions configured (`.github/workflows/deploy.yml`)
2. **Trigger**: Deployment happens automatically when you push to `main` branch
3. **Process**: GitHub Actions builds and deploys to GitHub Pages in 1-2 minutes
4. **Live Site**: Changes appear at https://laxminarayan24.github.io/Happy-Birthday/

## When Will Changes Reflect on the Live Site?

Changes will reflect ONLY when:
- ✅ You push to the `main` branch (not feature branches)
- ✅ GitHub Actions workflow completes successfully (1-2 minutes)
- ✅ You clear your browser cache (Ctrl+Shift+R or Cmd+Shift+R)

Changes will NOT reflect if:
- ❌ You only commit locally without pushing
- ❌ You push to a feature branch (not main)
- ❌ GitHub Actions workflow fails

## Verify Deployment

```bash
# Check if your changes are on main branch
git checkout main
git log --oneline -5

# Check GitHub Actions status (or visit Actions tab on GitHub)
# https://github.com/LAXMINARAYAN24/Happy-Birthday/actions

# Visit the live site
# https://laxminarayan24.github.io/Happy-Birthday/
```

## Troubleshooting

### "I pushed to main but don't see changes"

```bash
# 1. Verify you pushed to main
git branch -a
git log origin/main --oneline -3

# 2. Check GitHub Actions
# Visit: https://github.com/LAXMINARAYAN24/Happy-Birthday/actions
# Look for green checkmark ✓

# 3. Clear browser cache
# Press Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)

# 4. Wait a few minutes - CDN caching can cause delay
```

### "How do I know if deployment succeeded?"

```bash
# Check GitHub Actions from terminal
gh run list --branch main --limit 5

# Or visit GitHub Actions tab in browser:
# https://github.com/LAXMINARAYAN24/Happy-Birthday/actions
```

## Summary

1. **Commit your changes**: `git add . && git commit -m "message"`
2. **Push to main**: `git push origin main` (or merge to main first)
3. **Wait 1-2 minutes**: GitHub Actions automatically deploys
4. **Visit site**: https://laxminarayan24.github.io/Happy-Birthday/

**No manual deployment needed - it's all automatic!** 🚀
