export const dynamic = "force-static"
import { gqlRequest } from "@/lib/graphql"

export default async function sitemap() {
  const wordQuery = `
    query {
      lexns {
        lexnId
      }
    }
  `
  const words = await gqlRequest(wordQuery)

  const chapterQuery = `
    query {
      chaps {
        chapId
        chapBook{
          bookName
          bookNameAbbrev
        }
      }
    }
  `
  const chapters = await gqlRequest(chapterQuery)

  const wordUrls = words.lexns.map((word) => ({
    url: `https://greeknt.netlify.app/word/${word.lexnId}`,
    lastModified: new Date(),
  }))

  const chapterUrls = chapters.chaps.map((ch) => ({
    url: `https://greeknt.netlify.app/chapter/${
      ch.chapBook.bookNameAbbrev
    }-${parseInt(ch.chapId.slice(-2))}`,
    lastModified: new Date(),
  }))

  return [
    { url: "https://greeknt.netlify.app/", lastModified: new Date() },
    ...wordUrls,
    ...chapterUrls,
  ]
}
