# Deployment Guide

This guide explains how to deploy the Happy Birthday animation to GitHub Pages.

## Automatic Deployment

The repository is configured with GitHub Actions to automatically deploy to GitHub Pages. Here's what happens:

1. When code is pushed to the `main` branch, the GitHub Actions workflow triggers
2. The workflow builds and deploys the `happy-birthday-animation` directory to GitHub Pages
3. The site becomes available at: `https://LAXMINARAYAN24.github.io/Happy-Birthday/`

## Setting Up GitHub Pages (One-Time Setup)

**Important:** The repository owner needs to enable GitHub Pages for the first deployment to work.

### Steps:

1. Go to your repository on GitHub: `https://github.com/LAXMINARAYAN24/Happy-Birthday`
2. Click on **Settings** (in the repository menu)
3. In the left sidebar, click on **Pages** (under "Code and automation")
4. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
5. Save the settings

That's it! The workflow will automatically deploy the site when you merge this PR to the `main` branch.

## After Setup

Once GitHub Pages is enabled:
- The site will be available at: **https://laxminarayan24.github.io/Happy-Birthday/**
- Any push to the `main` branch will trigger an automatic redeployment
- You can manually trigger a deployment by going to Actions tab → "Deploy to GitHub Pages" → "Run workflow"

## Sharing the Link

Simply share this URL with your friends:
```
https://laxminarayan24.github.io/Happy-Birthday/
```

## Customization

To personalize the greeting card:
1. Edit `happy-birthday-animation/index.html`
2. Find the line with `<greeting-card name="Geetu" message="HAPPY BIRTHDAY"></greeting-card>`
3. Change the `name` attribute to your friend's name
4. Commit and push to `main` branch
5. The site will automatically redeploy with your changes!

## Troubleshooting

### Site not loading after deployment
- Wait a few minutes after the first deployment
- Check the Actions tab to see if the workflow completed successfully
- Verify GitHub Pages is enabled in repository settings

### 404 Error
- Make sure the workflow has completed successfully
- Verify the `main` branch has the latest changes
- Check that GitHub Pages source is set to "GitHub Actions"

### Changes not appearing
- Check the Actions tab to see if deployment completed
- Clear your browser cache and refresh
- Wait 1-2 minutes for GitHub's CDN to update
