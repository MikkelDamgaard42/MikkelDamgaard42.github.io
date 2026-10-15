# Exam cases — local integration, 15 October 2026

Implemented on `portfolio-exam-cases` in the portfolio repository, not the separate Mellemrum app.

## Content and routes

- `/projects/mellemrum`: Case 1, supplied design distinguished from technical improvements; three evidence images.
- `/projects/vuuh`: Case 2, group work and individual reflection distinguished; three design images.
- `/projects/larchive`: Case 3, concept rather than production webshop; six images, grouped as identity, two seller screens and three buyer screens.

All pages have Danish/English content, project links, alt text, captions and links to full-size images. English is a translation of the supplied Danish text; text inside the original screenshots remains unchanged. The two existing LYNK and BLUNT projects remain in the index and existing homepage composition. Exam projects use separate cards below that composition. The former incomplete Mellemrum page and its obsolete translation entries are replaced by the shared case renderer.

`src/examCases.json` contains the case copy. `src/examProjects.js` maps covers and imported assets. Images belong to this repository, while Mellemrum itself remains an external application. SVG assets are deliberately not inlined so that their larger-image links work as actual file URLs.

## Verification

- `npm run lint` and `npm run build` passed.
- All six language/page combinations rendered using React server rendering with the real Vite module graph. Image counts: 3, 3, 6 in each language. All 24 image references returned successful local HTTP responses. No undefined image sources or local filesystem paths in the public rendered content.
- Local HTTP requests for home, project index, all three exam routes and LYNK/BLUNT returned success. This check alone is not browser verification.
- Native Chrome: project index showed all five projects. Clicks from the index opened Mellemrum and L’Archive. Back navigation from Vuuh and L’Archive returned to the index. LYNK and BLUNT were opened through the index and displayed their existing headings/sections.
- Native Chrome: direct route/reload checks for Mellemrum, Vuuh and L’Archive displayed the relevant page content. Mellemrum EN was checked after reload; Vuuh EN and DA and L’Archive EN and DA section headings were observed. Language state persisted on reload.
- Desktop screenshots and responsive 400px screenshots were inspected for the new pages. Vuuh text/images and the two-column L’Archive seller group were inspected. CSS stacks the seller/buyer groups below 800px. No complete device matrix, automated overflow measurement, screen reader audit or production-host refresh verification was performed.
- The Figma links remain the supplied design-file links; anonymous prototype access is not asserted. No external integration or payment was executed during portfolio testing.

## Text length

Danish rendered main content: Mellemrum 4,033; Vuuh 3,209; L’Archive 3,275 characters including spaces, total **10,517**. Includes case/section numbers, headings, link labels, captions and both back links; excludes global header/footer, alt text and text embedded in images. This is approximately 4.38 pages only if the applicable definition is 2,400 characters/page; the norm definition is not established by the supplied brief. Extra shared interface copy and text embedded in images should be considered under the institution’s own counting rules.

## Preserved work and limits

Existing changes in package.json, package-lock.json, src/components/SelectedProjects.jsx and src/index.css were checked against the pre-task diff and remain byte-for-byte unchanged by this task. They are excluded from this commit. Validation was performed in the current checkout with those existing local changes present. No dependencies were installed or updated by this task. The integration is not a verification of an isolated clean checkout without those pre-existing changes.

No merge, push or deployment. The separate Mellemrum app repository/database/server was not modified or started. Source packages were read/copied without modification.
