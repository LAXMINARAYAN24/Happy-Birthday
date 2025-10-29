# Quick Start: Making Your Changes Appear on the Live Site

## The Short Answer

Your code changes will reflect on the live site **when you push them to the `main` branch**. It takes 1-2 minutes for GitHub Actions to automatically deploy.

## Step-by-Step

```bash
# 1. Make your code changes
# Edit files in happy-birthday-animation/

# 2. Test locally
# Open happy-birthday-animation/index.html in your browser

# 3. Check what changed
git status
git diff

# 4. Commit your changes
git add .
git commit -m "Describe your changes"

# 5. If you're on a feature branch, switch to main
git checkout main
git merge your-feature-branch

# 6. Push to main
git push origin main

# 7. Wait 1-2 minutes, then visit:
# https://laxminarayan24.github.io/Happy-Birthday/
```

## Why Aren't My Changes Showing?

✅ **Check if you're on the `main` branch:**
```bash
git branch
# The * should be next to 'main'
```

✅ **Check if GitHub Actions ran successfully:**
- Go to: https://github.com/LAXMINARAYAN24/Happy-Birthday/actions
- Look for a green checkmark on the latest workflow run

✅ **Clear your browser cache:**
- Press `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)

## Key Points

- ⚠️ **Only changes on `main` branch trigger deployment**
- ⏱️ **Deployment takes 1-2 minutes after pushing**
- 🔄 **GitHub Actions handles everything automatically**
- 🌐 **Live site:** https://laxminarayan24.github.io/Happy-Birthday/

## More Help

For detailed deployment information, see [DEPLOYMENT.md](DEPLOYMENT.md)
