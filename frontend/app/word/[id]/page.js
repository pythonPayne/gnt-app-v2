export const maxDuration = 300 // seconds (5 minutes)
import { gqlRequest } from "@/lib/graphql"
import WordPageClient from "./pageClient"

export async function generateMetadata({ params }) {
  const query = `
  query ($id:String!) {
    lexns (filters: {lexnId:$id}) {        
    lexnId
    lexnGreek
    lexnGloss    
    }
  }
  `
  const { id } = await params
  const data = await gqlRequest(query, { id })
  const word = data.lexns[0]
  const metadata = {
    title: `${word.lexnGreek} (${word.lexnId})`,
    description: `Greek word ${word.lexnGreek} (${word.lexnId}) (${word.lexnDefinition}): lexicon, usage, and parsing.`,
    alternates: {
      canonical: `/word/${id}`,
    },
    openGraph: {
      title: `${word.lexnGreek} (${word.lexnId})`,
      description: `Lexical entry for ${word.lexnId}.`,
      url: `/word/${id}`,
    },
  }
  return metadata
}

// This defines the finite set of pages to build
export async function generateStaticParams() {
  const query = `
    query {
      lexns {
        lexnId
      }
    }
  `
  const data = await gqlRequest(query)

  return data.lexns.map((word) => ({
    id: word.lexnId,
  }))
}

export default async function WordPage({ params }) {
  const query = `
  query ($id:String!) {
    lexns (filters: {lexnId:$id}) {        
    lexnId
    lexnGreek
    lexnGreekLong
    lexnTransliteration
    lexnGloss
    lexnDefinition
    lexnUsage
    lexnStrongs
    lexnFreqNt
    lexnFunction
    pdgm {
      pdgmGreek
      pdgmFreqNt
      pdgmPars {
        parsId
        parsRank
        parsFunction
        parsTense
        parsVoice
        parsMood
        parsPerson
        parsCase
        parsGender
        parsNumber
        word (filters:{wordLexnIdCopy:$id}) {
          wordParsIdCopy
          wordEnglish
          wordVers {
            versBookNameAbbrev
            versRefAbbrev
            versChapUrl
            versId
            word {
              wordId
              wordGreek
              wordEnglish
              wordLexnIdCopy
            }
          }
        }
      }
    }
  }
}
  `
  const querySmall = `
  query ($id:String!) {
    lexns (filters: {lexnId:$id}) {        
    lexnId
    lexnGreek
    lexnGreekLong
    lexnTransliteration
    lexnGloss
    lexnDefinition
    lexnUsage
    lexnStrongs
    lexnFreqNt
    lexnFunction
    pdgm {
      pdgmGreek
      pdgmFreqNt
      pdgmPars {
        parsId
        parsRank
        parsFunction
        parsTense
        parsVoice
        parsMood
        parsPerson
        parsCase
        parsGender
        parsNumber
        word (filters:{wordLexnIdCopy:$id}) {
          wordParsIdCopy
          wordEnglish
          wordVers {
            versBookNameAbbrev
            versRefAbbrev
            versChapUrl
            versId
          }
        }
      }
    }
  }
}
  `

  const { id } = await params
  const data = await gqlRequest(
    id > "0040" || ["0019", "0022", "0034", "0036"].includes(id)
      ? query
      : querySmall,
    { id }
  )
  const word = data.lexns[0]
  return (
    <>
      <WordPageClient word={word} />
      {/* JSON-LD STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "DefinedTerm",
            name: word.lexnGreek,
            identifier: word.lexnId,
            description: word.lexnDefinition,
            inDefinedTermSet: "Greek New Testament Lexicon",
          }),
        }}
      />
    </>
  )
}
