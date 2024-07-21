import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <main>
      <div className="grid h-[calc(100dvh-var(--gnb-h))] place-content-center">
        <article className="prose">
          <h1>훈민정음</h1>
          <p>
            나랏말싸미 듕귁에 달아문자와로 서르 사맛디 아니할쎄 이런 전차로 어린
            백셩이 니르고져 홇베이셔도 마참네 제 뜨들 시러펴디 몯핧 노미하니아
            내 이랄 윙하야 어엿비너겨 새로 스믈 여듫 짜랄 맹가노니사람마다 해여
            수비니겨 날로 쑤메 뻔한킈 하고져 할따라미니라
          </p>
        </article>
      </div>
    </main>
  )
}
