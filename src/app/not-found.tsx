import Link from 'next/link'

import Title from '@/components/title'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="space-y-8 text-center">
        <div className="space-y-4">
          <div className="text-8xl font-bold text-gray-200">404</div>
          <Title size="lg" align="center">
            페이지를 찾을 수 없어요.
          </Title>
          <p className="mx-auto max-w-md text-gray-600 dark:text-gray-300">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있어요.
          </p>
        </div>

        <Link
          href="/"
          className="rounded-lg bg-gray-900 px-6 py-3 text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  )
}
