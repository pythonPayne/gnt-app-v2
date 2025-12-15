import "./globals.css"
import ReduxProvider from "@/lib/providers/ReduxProvider"
import Layout from "@/components/Layout"

export const metadata = {
  title: "GNT",
  description: "Greek New Testament application",
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
