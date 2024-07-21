import React from 'react'
import { cn } from '~/shared/utils'

/**
 * @see https://tanstack.com/query/v5/docs/framework/react/devtools
 */
const ReactQueryDevtoolsProduction = React.lazy(() =>
  import('@tanstack/react-query-devtools/build/modern/production.js').then(
    (d) => ({
      default: d.ReactQueryDevtools,
    }),
  ),
)

// 로드 완료를 감지하는 커스텀 훅
function useComponentLoaded() {
  const [loaded, setLoaded] = React.useState(false)

  React.useEffect(() => {
    setLoaded(true)
  }, [])

  return loaded
}

function LazyComponentWrapper({ onLoad }: { onLoad: () => void }) {
  const loaded = useComponentLoaded()

  React.useEffect(() => {
    if (loaded) {
      onLoad()
    }
  }, [loaded, onLoad])

  return null
}

function ClosedWrapper({
  onClosed,
  isOpen,
}: {
  onClosed: () => void
  isOpen: boolean
}) {
  React.useLayoutEffect(() => {
    const btn = document.querySelector(
      '[aria-label="Close tanstack query devtools"]',
    ) as HTMLButtonElement
    btn?.addEventListener('click', () => {
      onClosed()
    })
  }, [isOpen])

  return null
}

export function TanstackQueryLabel() {
  const [isDevtoolsLoaded, setIsDevtoolsLoaded] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const onOpen = () => {
    ;(
      document.querySelector(
        '[aria-label="Open Tanstack query devtools"]',
      ) as HTMLButtonElement
    ).click()
    setIsOpen(true)
  }
  const onClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <div className="[--tsrd-font-size:16px]">
        <button
          type="button"
          onClick={onOpen}
          className={cn(
            'fixed z-[99999] inline-flex w-auto cursor-pointer appearance-none items-center gap-2 rounded-[calc(var(--tsrd-font-size)*0.375)] border border-[#667085] bg-white p-[calc(var(--tsrd-font-size)*0.25)] px-[calc(var(--tsrd-font-size)*0.5)] py-[calc(var(--tsrd-font-size)*0.25)] text-[calc(var(--tsrd-font-size)*0.75)] transition-all duration-200 ease-out dark:bg-[#191c24]',
            // 'pl-[calc(var(--tsrd-font-size)*0.375)]',
            'bottom-[calc(var(--tsrd-font-size)*0.5)] right-[calc(var(--tsrd-font-size)*10.5)]',
            'origin-top-right translate-x-[0.5rem]',
            'h-[30px] bg-[#191c24]',
            isOpen && 'pointer-events-none opacity-0',
          )}
        >
          <div className="font-pretendard whitespace-nowrap bg-gradient-to-r from-[#dd524b] to-[#e9a03b] bg-clip-text text-[calc(var(--tsrd-font-size)*0.75)] font-semibold leading-none text-transparent">
            TanStack Query
          </div>
        </button>
      </div>
      <div className="[&_.tsqd-transitions-container>div]:hidden">
        <React.Suspense fallback={null}>
          <ReactQueryDevtoolsProduction />
          <LazyComponentWrapper onLoad={() => setIsDevtoolsLoaded(true)} />
        </React.Suspense>
        {isDevtoolsLoaded && (
          <ClosedWrapper onClosed={onClose} isOpen={isOpen} />
        )}
      </div>
    </>
  )
}
