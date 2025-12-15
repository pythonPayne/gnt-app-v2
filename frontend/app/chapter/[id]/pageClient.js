"use client"
export const maxDuration = 300 // seconds (5 minutes)
import React, { useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useSelector, useDispatch } from "react-redux"
import VerseCard from "@/components/VerseCard"
import {
  toggleShowMenu,
  toggleShowSettings,
  setTemplate,
  toggleShowChapterLinks,
  toggleShowOtherLinks,
} from "@/redux/actions/layout"

export default function ChapterPageClient({ chap }) {
  const pathname = usePathname()
  const dispatch = useDispatch()
  const showMenu = useSelector((state) => state.layout.showMenu)
  const expandAllVerses = useSelector(
    (state) => state.verseCard.expandAllVerses
  )
  const dark = useSelector((state) => state.layout.dark)

  useEffect(() => {
    if (!window.location.hash) return

    window.requestAnimationFrame(() => {
      const anchor = document.querySelector(window.location.hash)
      const offset = anchor.getBoundingClientRect().top + window.scrollY
      window.scroll({ top: offset, left: 0 })
    })
  }, [pathname])

  useEffect(() => {
    dispatch(setTemplate("chapter"))
    dispatch(toggleShowMenu(false))
    dispatch(toggleShowSettings(true))
    dispatch(toggleShowChapterLinks(false))
    dispatch(toggleShowOtherLinks(false))
  }, [])

  return (
    <>
      <div
        className={`flex justify-center
      ${dark ? "bg-gray-800" : "bg-gray-50"}
      `}
      >
        <div className={`w-screen max-w-[1100px]`}>
          <div
            className={`flex items-center justify-between h-[12vh] mb-2 px-4 ${
              dark ? "text-gray-300" : "text-gray-500"
            }
            `}
          >
            <Link
              className={`cursor-pointer`}
              href={`/chapter/${chap.chapUrlPrev}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
            </Link>
            <div
              className={`cursor-pointer text-xl font-sans tracking-wider md:hover:text-blue-600
            `}
              onClick={() => {
                dispatch(toggleShowMenu(!showMenu))
                dispatch(toggleShowChapterLinks(true))
                dispatch(toggleShowOtherLinks(false))
                dispatch(toggleShowSettings(false))
              }}
            >
              {chap.chapBook.bookName} {parseInt(chap.chapId.slice(2, 4))}
            </div>
            <Link
              className={`cursor-pointer`}
              href={`/chapter/${chap.chapUrlNext}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>

          {/* VERSES */}
          <div className={`mx-2`}>
            {chap.vers.map((verse, key) => (
              <div
                key={key}
                className={`mb-6`}
                id={`${verse.versChapUrl.split("#")[1]}`}
              >
                <VerseCard verse={verse} lexnId={"0"} open={expandAllVerses} />
              </div>
            ))}
          </div>

          <div
            className={`flex items-center justify-between h-[12vh] mb-2 px-4 ${
              dark ? "text-gray-300" : "text-gray-500"
            }
            `}
          >
            <Link
              className={`cursor-pointer`}
              href={`/chapter/${chap.chapUrlPrev}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
            </Link>
            <div
              className={`cursor-pointer text-3xl font-sans tracking-wider
            `}
            >
              {""}
            </div>
            <Link
              className={`cursor-pointer`}
              href={`/chapter/${chap.chapUrlNext}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>

          <div className={`min-h-[30vh]`}></div>
        </div>
      </div>
    </>
  )
}
