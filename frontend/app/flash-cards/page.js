import { gqlRequest } from "@/lib/graphql"
import FlashCardsClient from "./pageClient"
import React from "react"

export default async function FlashCards() {
  const query = `
    query {
      lexns {
        lexnId
        lexnGreek
        lexnGreekLong
        lexnDefinition
        lexnGloss
        lexnUsage
        lexnFreqNt
        lexnFunction
        lexnTransliteration
        lexnChs
      }
    }
  `
  const data = await gqlRequest(query)

  return <FlashCardsClient lexns={data.lexns} />
}
