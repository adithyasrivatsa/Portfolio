# Adithya's Portfolio Guide

This guide explains how to manage your content via Markdown files and how to deploy your website to the public internet using a custom domain.

## 1. Writing Articles & Projects

Your site is powered by a "Markdown Engine". You don't need to dive into React code to add a new project, blog post, or vision update. All you do is create a `.md` file in the correct folder!

### Folder Structure
Your content lives in the `src/content/` folder. It is divided by category:
- `src/content/philosophy/` -> Shows up on the Thinking/Philosophy pages
- `src/content/blog/` -> Shows up on the Blog/Journal pages
- `src/content/projects/` -> Shows up on the Projects/Endeavors pages
- `src/content/vision/` -> Shows up on the Vision/Teleology pages

### The Markdown Format

Every file you create **must** have "frontmatter" at the top. This is data wrapped in `---` dashes that tells the website the title, date, and description of your post. Keep the date format as `YYYY-MM-DD` so it sorts perfectly.

Here is an example structure:

```markdown
---
title: "Building the Big-DAwG Pipeline Engine"
date: "2026-03-27"
description: "Architecting a modular, DAGverse-inspired document graph engine."
tags: ["ai", "architecture", "docker"]
---

### System Architecture
This is where you write your actual article using standard Markdown!

- You can do **bold** text.
- You can add code blocks.
- Because we use `rehype-raw`, you can even drop raw `<div style="color: red">HTML</div>` directly into these files!
- To link your github, just use standard markdown links: [My Github Repo](https://github.com/Hundred-Trillion/project-link)
```

The system will automatically find this file, list it on the appropriate page, and slot it into the "Top 3 Recent" list on the homepage if it's new enough!

## 2. Deploying Your Website

You can host this website completely for free using platforms like **Vercel** or **Netlify**. They are built specifically for Vite/React applications.

### Step 1: Upload to GitHub
1. Create a new repository on your [Hundred-Trillion](https://github.com/Hundred-Trillion) GitHub account.
2. Push your `adithya's-ai-portfolio` folder to that repository. Everything except `node_modules` (which is ignored automatically) will go up.

### Step 2: Connect to Vercel (Recommended)
1. Go to [Vercel.com](https://vercel.com/) and create a free account.
2. Click **Add New Project**.
3. Import your new GitHub repository.
4. Vercel will automatically detect that you are using Vite and React. The build settings should say:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**. Within 2 minutes, your site will be live on a `.vercel.app` domain.

## 3. Connecting Your GoDaddy Domain

Once your site is hosted on Vercel, you'll want to connect it to the custom domain you bought on GoDaddy.

1. **In Vercel:** Go to your project's dashboard.
2. Click on **Settings** -> **Domains**.
3. Type in your GoDaddy domain (e.g., `adithyasrivatsa.com`) and click **Add**.
4. Vercel will give you a set of **DNS Records** to copy. It will usually be an `A Record` requiring an IP address (like `76.76.21.21`) or a `CNAME` targeting `cname.vercel-dns.com`.
5. **In GoDaddy:** Log into your GoDaddy account and go to the **DNS Management** page for your domain.
6. Add the records that Vercel told you to add. You might need to edit the existing `A` record (the one with the `@` symbol) to point to Vercel's IP address.
7. Save the changes on GoDaddy.

*Note: DNS propagation can take anywhere from 10 minutes to a few hours. Vercel will verify the domain connection in its interface once it detects the changes!*
