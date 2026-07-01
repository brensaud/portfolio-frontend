/**
 * BlogPage — writing index at /writing.
 *
 * 7 sections positioning the writing hub as an engineering notes collection:
 *   §1  WritingHero         — positioning headline and topic strip
 *   §2  FeaturedArticle     — promoted "In progress" lead article
 *   §3  ArticleGrid         — filterable grid of all planned articles
 *   §4  WritingCategories   — 8 topic area descriptions (via WritingInfo)
 *   §5  WhyIWrite           — 5 reasons writing is part of engineering
 *   §6  LearningRoadmap     — upcoming writing themes (via WritingInfo)
 *   §7  WritingCta          — View Projects / Engineering / Contact
 */
import { usePageTitle } from '@/hooks/use-page-title'
import { WritingHero } from '@/features/writing/writing-hero'
import { FeaturedArticle } from '@/features/writing/featured-article'
import { ArticleGrid } from '@/features/writing/article-grid'
import { WritingInfo } from '@/features/writing/writing-info'
import { WritingCta } from '@/features/writing/writing-cta'

export function BlogPage() {
  usePageTitle('Writing')
  return (
    <main>
      <WritingHero />
      <FeaturedArticle />
      <ArticleGrid />
      <WritingInfo />
      <WritingCta />
    </main>
  )
}
