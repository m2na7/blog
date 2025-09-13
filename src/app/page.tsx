import AboutMeSection from '@/components/about-me-section'
import RecentPostSection from '@/components/recent-post-section'
import { getAllPosts } from '@/lib/posts'

export default function HomePage() {
  const allPosts = getAllPosts()
  const recentPosts = allPosts.slice(0, 3)

  return (
    <div className="space-y-12 max-sm:space-y-8">
      <AboutMeSection />
      {recentPosts.length > 0 && (
        <RecentPostSection recentPosts={recentPosts} />
      )}
    </div>
  )
}
