import React from 'react'

// 로드 완료를 감지하는 커스텀 훅
// function useComponentLoaded() {
//   const [loaded, setLoaded] = React.useState(false)

//   React.useEffect(() => {
//     setLoaded(true)
//   }, [])

//   return loaded
// }

// function LazyComponentWrapper({ onLoad }: { onLoad: () => void }) {
//   const loaded = useComponentLoaded()

//   React.useEffect(() => {
//     if (loaded) {
//       onLoad()
//     }
//   }, [loaded, onLoad])

//   return null
// }

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
  const [isDevtoolsLoaded] = React.useState(false)
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
          // className={cn(
          //   'bg-white dark:bg-[#191c24] p-[calc(var(--tsrd-font-size)*0.25)] px-[calc(var(--tsrd-font-size)*0.5)] py-[calc(var(--tsrd-font-size)*0.25)] rounded-[calc(var(--tsrd-font-size)*0.375)] fixed z-[99999] inline-flex w-auto cursor-pointer appearance-none border border-[#667085] gap-2 items-center text-[calc(var(--tsrd-font-size)*0.75)] transition-all duration-200 ease-out',
          //   'bottom-[calc(var(--tsrd-font-size)*0.5)] right-[calc(var(--tsrd-font-size)*0.5)]',
          //   'translate-x-[0.5rem] rotate-90 origin-top-right rounded-t-none',
          //   'shadow-md',
          //   isOpen && 'opacity-0 pointer-events-none',
          // )}
        >
          <div className="font-pretendard whitespace-nowrap bg-gradient-to-r from-[#dd524b] to-[#e9a03b] bg-clip-text text-[calc(var(--tsrd-font-size)*0.75)] font-semibold leading-none text-transparent">
            React Query v5
          </div>
        </button>
      </div>
      <div className="[&_.tsqd-transitions-container>div]:hidden">
        {isDevtoolsLoaded && (
          <ClosedWrapper onClosed={onClose} isOpen={isOpen} />
        )}
      </div>
    </>
  )
}
