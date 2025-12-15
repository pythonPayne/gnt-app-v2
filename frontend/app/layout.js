import "./globals.css"
import ReduxProvider from "@/lib/providers/ReduxProvider"
import Layout from "@/components/Layout"

export const metadata = {
  metadataBase: new URL("https://greeknt.netlify.app/"),
  title: {
    default: "GNT",
  },
  description:
    "A fast static Greek New Testament with morphology, lexical tools, flashcards, and more.",
  openGraph: {
    type: "website",
    siteName: "GNT",
  },
  twitter: {
    card: "summary_large_image",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Layout>{children}</Layout>
        </ReduxProvider>
      </body>
    </html>
  )
}
