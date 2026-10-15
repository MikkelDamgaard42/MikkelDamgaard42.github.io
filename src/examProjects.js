import cases from './examCases.json'

const assets = import.meta.glob('./assets/exam/*/*', { eager: true, query: '?url&no-inline', import: 'default' })
export const examImage = (file) => assets[`./assets/exam/${file}`]
const covers = {
  mellemrum: 'mellemrum/tilmelding-lokal-succes.png',
  vuuh: 'vuuh/onboarding-progression.png',
  larchive: 'larchive/visuel-identitet.png',
}

export function examProjects(language) {
  return Object.entries(cases).map(([slug, content], index) => {
    const study = content[language]
    const indexTitle = slug === 'larchive' ? 'L’ARCHIVE' : study.title
    return {
      slug,
      name: study.title,
      indexTitle,
      indexByline: slug === 'larchive' ? 'BY LA ROUGE' : null,
      indexLayout: indexTitle.length > 8 ? 'wide' : 'split',
      number: String(index + 3).padStart(3, '0'),
      indexType: `Case ${index + 1} · ${study.tags.split(' · ')[0]}`,
      indexDescription: study.subtitle,
      type: study.tags,
      description: study.subtitle,
      tags: study.tags.split(' · '),
      cover: examImage(covers[slug]),
      coverAlt: study.sections.flatMap((section) => section.blocks)
        .filter((block) => block.type === 'images')
        .flatMap((block) => block.images)
        .find((image) => image.file === covers[slug])?.alt ?? study.title,
    }
  })
}

export { cases }
