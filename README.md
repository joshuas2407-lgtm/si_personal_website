# Personal Website

A static personal site with an animated geometric backdrop, a top taskbar, and swipe navigation. No build step and no dependencies: plain HTML, CSS and JavaScript.

## Pages

| # | Page | Route |
|---|------|-------|
| 1 | Home (landing) | `#/home` |
| 2 | About | `#/about` |
| 3 | Experience | `#/experience` |
| 4 | Projects | `#/projects` |
|   | ↳ Software | `#/projects/software` |
|   | ↳ Hardware | `#/projects/hardware` |
| 5 | Stack | `#/stack` |
| 6 | Certificates | `#/certificates` |
| 7 | Contact | `#/contact` |
| 8 | Resume | `#/resume` |

To move between pages, use the taskbar, swipe left or right (touch or trackpad), use the ← → arrow keys, or click the dots at the bottom.

## Editing content

**Everything lives in [`data/content.js`](data/content.js).** Open it, edit the text, save, and refresh.

- **Add a project:** copy one `{ ... }` block inside `projects.software` or `projects.hardware` and change the fields. To show an image, put it in `assets/images/` and set `image: "assets/images/my-project.jpg"`.
- **Add experience:** add a block to `experience`. Put the newest one first.
- **Add a certificate or stack item:** add to `certificates` or `stack`.
- **Update contacts:** edit `contact.links`.
- **Upload a resume:** drop the PDF into `assets/resume/` and set `resume.file: "assets/resume/resume.pdf"`. To replace it later, overwrite the file.
- **Profile photo:** put it in `assets/images/` and set `about.photo`.

## Customising the look

- **Colours:** change the variables at the top of [`css/styles.css`](css/styles.css) and the `CONFIG.colors` list in [`js/background.js`](js/background.js).
- **Backdrop:** `CONFIG` in `js/background.js` controls the triangle size, brightness and line width.
- **Add a new page:** add an entry to the `PAGES` list in [`js/app.js`](js/app.js) and write a `render` function for it.

## Running locally

Open `index.html` in a browser. Or serve the folder, for example:

```bash
npx serve .
```

## Deploying

This is a static site, so any static host works:

- **GitHub Pages:** push to GitHub, then go to Settings → Pages and deploy from the `main` branch, root folder.
- **Netlify / Vercel / Cloudflare Pages:** import the repo. Leave the build command empty and set the output/publish directory to `/`.
