const GRAPHQL_URL = "http://127.0.0.1:8000/graphql/"

export async function gqlRequest(query, variables = {}) {
  const isDev = process.env.NODE_ENV === "development"
  const res = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: isDev ? "no-store" : "force-cache",
    body: JSON.stringify({ query, variables }),
  })

  const json = await res.json()
  if (json.errors) throw new Error(JSON.stringify(json.errors))

  return json.data
}
