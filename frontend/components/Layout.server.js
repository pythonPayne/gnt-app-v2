import LayoutClient from "./Layout.client"

export default async function Layout({ children }) {
  const res = await fetch("http://127.0.0.1:8000/graphql/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query {
          books {
            bookId
            bookName
            bookNameAbbrev
            bookNumChapters
          }
        }
      `,
    }),
    cache: "force-cache",
  })

  const json = await res.json()
  const books = json.data.books

  return (
    <div className="no-scrollbar">
      <LayoutClient books={books} />
      <div>{children}</div>
    </div>
  )
}
