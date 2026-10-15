# Final portfolio check — 15 October 2026

Repository: MikkelDamgaard42/MikkelDamgaard42.github.io. Working branch: portfolio-exam-cases.

All pending portfolio changes were reviewed, including the existing Motion dependency, workbench entrance/switch/pointer interactions and CSS, together with the exam previews, bilingual L’ARCHIVE concept, original pitch image, shared typography and project numbering. Existing work is retained. The separate case1 repository was not modified.

## Danish text length

Rendered main content, including case/section numbers, headings, tags, project-link labels, captions and both back links; excluding global header/footer, image alt text and text embedded in images. HTML tags are separated with spaces and whitespace is collapsed before counting.

| Case | Characters including spaces |
| --- | ---: |
| Mellemrum | 4,033 |
| Vuuh | 3,209 |
| L’ARCHIVE by LA ROUGE | 4,075 |
| **Total** | **11,317** |

No assignment-specific standard-page definition was found in the repository. At an assumed 2,400 characters including spaces per page, this is 4.7154 standard pages (4.72 rounded). Five pages allow 12,000 characters, leaving 683 characters. Text embedded in evidence images is not transcribed into this calculation. This supersedes the older text count in exam-cases-verification.md.

## Local checks

- `git diff --check`, `npm run lint` and `npm run build` passed.
- All six case/language combinations rendered through the actual Vite/React module graph.
- Image counts are 3 / 3 / 7 per language. All 13 unique image files exist; rendered image paths are defined.
- Case back links retain `/projects`. Existing external destinations are unchanged.
- Project identifiers are 01 LYNK, 02 BLUNT, 03 Mellemrum, 04 Vuuh, 05 L’ARCHIVE. Content section numbering is independent.

## External links before release

- Mellemrum public app: HTTP 200.
- Mellemrum repository and docs/replay: HTTP 200.
- Vuuh Figma design URL: HTTP 200, with login-related UI in the response.
- L’ARCHIVE Figma design URL: HTTP 403 to an anonymous HTTP request. This is an access restriction, not evidence of a missing/404 file. The original design file was subsequently opened successfully in the existing native Chrome/Figma session (La Rouge - Design Fil, with seller/buyer prototype pages). Anonymous design access is not established; the supplied destination is preserved.

## Publication and handoff

The existing `.github/workflows` process builds with `npm ci` and Vite on push to `main`, copies index.html to 404.html for SPA routing, and deploys the dist artifact to GitHub Pages. `origin/main` is an ancestor of the working branch; a normal fast-forward push can publish without rewriting history.

`output/pdf/Mikkel-Damgaard-Nielsen-aflevering.pdf` contains the student's name and three independently numbered submission cases, each with its direct public link. The one-page PDF was rendered and visually inspected; all three PDF link annotations were checked. Nothing was submitted to an exam system.

Post-publication results are reported separately after checking the actual release.
