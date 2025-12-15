"use client"
import React, { useState, useEffect } from "react"
import Link from "next/link"

export default function ChapterMenu() {
  const [bookOpen, setBookOpen] = useState("")
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://127.0.0.1:8000/graphql/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            query {
              books {
                bookId
                bookName
                bookNameAbbrev
                bookNumChapters
                bookNumVerses
                bookNumWords                
              }
            }
          `,
        }),
        cache: "no-store", // 🔑 client always no-store
      })
      const json = await res.json()
      setBooks(json.data.books)
      setLoading(false)
    }
    fetchData()
  }, [])

  const book_menu = (book) => {
    let chs = [...Array(book.bookNumChapters).keys()].map((x) => x + 1)
    const sameBook = bookOpen === book.bookName
    return (
      <div>
        <div
          className={`cursor-pointer ml-8 mr-10 py-2 font-sans text-md md:text-lg md:hover:text-blue-500 
            ${
              sameBook
                ? "border-b border-gray-500 text-blue-500"
                : "border-none text-gray-300"
            }`}
          onClick={() => {
            if (sameBook) {
              setBookOpen("")
            } else {
              setBookOpen(book.bookName)
            }
          }}
        >
          {book.bookName}
        </div>

        {sameBook && (
          <div className={`grid grid-cols-3 mt-2`}>
            {chs.map((ch) => (
              <Link
                key={ch}
                href={`/chapter/${book.bookNameAbbrev}-${ch}`}
                className={`text-center px-1 py-1 text-gray-500 hover:text-white`}
              >
                {ch}
              </Link>
            ))}
          </div>
        )}
      </div>
    )
  }
  return (
    <div className={``}>
      {books.map((book, i) => (
        <div key={i}>{book_menu(book)}</div>
      ))}
    </div>
  )
}
