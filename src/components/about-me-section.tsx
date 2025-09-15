import Image from 'next/image'

export default function AboutMeSection() {
  return (
    <section className="space-y-8 border-b border-gray-200 pb-8 dark:border-zinc-700">
      <Image
        src="/assets/m2na_profile.png"
        alt="profile"
        width={120}
        height={120}
        className="rounded-full object-cover"
      />

      <div className="space-y-6 text-[15px] leading-relaxed">
        <p>Frontend Engineer 강민하입니다. 👋 </p>
        <div className="space-y-1">
          <p>
            무엇을 만들든 ‘왜’를 먼저 고민하며, 더 나은 방법을 찾아가는 과정을
            즐깁니다.
          </p>
          <p>
            지식과 경험을 나누며 동료와 함께 지속적으로 성장하고, 서로의
            인사이트를 주고받는 과정을 중시해요.
          </p>
        </div>

        <p className="mb-1">
          다양한 오픈소스에 기여하며 커뮤니티와 함께 성장하고 있어요.
        </p>
        <ul className="ml-4 space-y-1">
          <li>
            • TanStack (
            <a
              href="https://github.com/TanStack/query/pulls?q=author%3Am2na7+is%3Aclosed"
              target="_blank"
              rel="noopener noreferrer"
            >
              query
            </a>
            ,{' '}
            <a
              href="https://github.com/TanStack/form/pulls?q=author%3Am2na7+is%3Aclosed"
              target="_blank"
              rel="noopener noreferrer"
            >
              form
            </a>
            )
          </li>
          <li>
            • toss (
            <a
              href="https://github.com/toss/suspensive/pulls?q=author%3Am2na7+is%3Aclosed"
              target="_blank"
              rel="noopener noreferrer"
            >
              suspensive
            </a>
            ,{' '}
            <a
              href="https://github.com/toss/react-simplikit/pulls?q=author%3Am2na7+is%3Aclosed"
              target="_blank"
              rel="noopener noreferrer"
            >
              react-simplikit
            </a>
            )
          </li>
          <li>
            •{' '}
            <a
              href="https://github.com/react-hook-form/react-hook-form/pulls?q=author%3Am2na7+is%3Aclosed"
              target="_blank"
              rel="noopener noreferrer"
            >
              react-hook-form
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}
