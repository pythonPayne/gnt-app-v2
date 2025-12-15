export const maxDuration = 300 // seconds (5 minutes)
import { gqlRequest } from "@/lib/graphql"
import ChapterPageClient from "./pageClient"
import getBookData from "@/lib/getBookData"

export async function generateMetadata({ params }) {
  const query = `
    query ($id:String!) {
      chaps (filters: {chapId:$id}) {
        chapId
        chapBook{
          bookName
          bookNameAbbrev
        }
      }
    }
  `
  const { id } = await params

  const bookData = getBookData()

  const data = await gqlRequest(query, {
    id: bookData.filter((chapter) => chapter.url === id)[0].chapId,
  })

  const chap = data.chaps[0]
  const ch = parseInt(chap.chapId.slice(-2))

  const metadata = {
    title: `${chap.bookNameAbbrev} ${ch}`,
    description: `${chap.bookName} ${ch}: Interlinear Greek New Testament`,
    alternates: {
      canonical: `/chapter/${chap.chapId}`,
    },
    openGraph: {
      title: `${chap.bookNameAbbrev} ${ch}`,
      description: `${chap.bookName} ${ch}: Interlinear Greek New Testament`,
      url: `/chapter/${chap.chapId}`,
    },
  }
  return metadata
}

// This defines the finite set of pages to build
export async function generateStaticParams() {
  const query = `
    query {
      chaps {
        chapId
        chapBook{
          bookNameAbbrev
        }
      }      
    }
  `
  const data = await gqlRequest(query)

  return data.chaps.map((chapter) => ({
    id:
      chapter.chapBook.bookNameAbbrev +
      "-" +
      parseInt(chapter.chapId.slice(-2)),
  }))
}

export default async function ChapterPage({ params }) {
  const query = `
    query ($id:String!) {
      chaps (filters: {chapId:$id}) {
        chapBook{
          bookName
          bookNameAbbrev
        }
        chapId
        chapUrl
        chapUrlPrev
        chapUrlNext
        vers {
          versId
          versRefAbbrev
          versChapUrl
          word {
            wordGreek
            wordEnglish
            wordLexn {
              lexnId
              lexnGreek
              lexnFreqNt
            }
            wordPars {
              parsId
              parsFunction
              parsTense
              parsVoice
              parsMood
              parsPerson
              parsCase
              parsGender
              parsNumber
            }
          }
        }
      }
    }
    `

  const { id } = await params

  const bookData = getBookData()

  const data = await gqlRequest(query, {
    id: bookData.filter((chapter) => chapter.url === id)[0].chapId,
  })

  const chap = data.chaps[0]
  const ch = parseInt(chap.chapId.slice(-2))
  return (
    <>
      <ChapterPageClient chap={chap} />
      {/* JSON-LD STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "DefinedTerm",
            name: `${chap.bookNameAbbrev} ${ch}`,
            isPartOf: "Greek New Testament",
          }),
        }}
      />
    </>
  )
}
