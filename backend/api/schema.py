import strawberry
import strawberry_django
from strawberry import auto
from strawberry.django import type, field, filters
from typing import List, Optional

from .models import Word, Pars, Lexn, Book, Chap, Vers, Pdgm, Frlc, Frlb

# -----------------------------------------------
# Filters
# -----------------------------------------------


@filters.filter(Word)
class WordFilter:
    word_book_name_abbrev: str | None
    word_chap_num: int | None
    word_vers_num: int | None
    word_english: str | None
    word_greek: str | None
    word_lexn_id_copy: str | None
    word_pars_id_copy: str | None


@filters.filter(Lexn)
class LexnFilter:
    lexn_id: str | None
    lexn_greek: str | None
    lexn_transliteration: str | None
    lexn_gloss: str | None
    lexn_strongs: str | None


@filters.filter(Pars)
class ParsFilter:
    pars_function: str | None
    pars_tense: str | None
    pars_voice: str | None
    pars_mood: str | None
    pars_case: str | None
    pars_gender: str | None
    pars_number: str | None


@filters.filter(Book)
class BookFilter:
    book_name: str | None
    book_name_abbrev: str | None


@filters.filter(Chap)
class ChapFilter:
    chap_id: str | None
    chap_book__book_name_abbrev: str | None
    chap_num: int | None


@filters.filter(Vers)
class VersFilter:
    vers_book_name_abbrev: str | None
    vers_chap_num: int | None
    vers_num: int | None


# -----------------------------------------------
# Types
# -----------------------------------------------


@type(Pars)
class ParsType:
    pars_id: auto
    pars_function: auto
    pars_tense: auto
    pars_voice: auto
    pars_mood: auto
    pars_person: auto
    pars_case: auto
    pars_gender: auto
    pars_number: auto
    pars_freq_nt: auto
    pars_rank: auto

    word: list["WordType"] = strawberry.auto
    word: List["WordType"] = strawberry_django.field(filters=WordFilter)


@type(Lexn)
class LexnType:
    lexn_id: auto
    lexn_greek: auto
    lexn_greek_long: auto
    lexn_transliteration: auto
    lexn_gloss: auto
    lexn_definition: auto
    lexn_usage: auto
    lexn_strongs: auto
    lexn_function: auto
    lexn_freq_nt: auto
    lexn_chs: auto

    pdgm: list["PdgmType"] = strawberry.auto


@type(Book)
class BookType:
    book_id: auto
    book_name: auto
    book_name_abbrev: auto
    book_num_chapters: auto
    book_num_verses: auto
    book_num_words: auto
    chap: list["ChapType"] = strawberry.auto


@type(Chap)
class ChapType:
    chap_id: auto
    chap_num_verses: auto
    chap_num_words: auto
    chap_num: auto
    chap_url: auto
    chap_url_prev: auto
    chap_url_next: auto
    chap_book: BookType | None
    vers: list["VersType"] = strawberry.auto


@type(Vers)
class VersType:
    vers_id: auto
    vers_ref: auto
    vers_ref_abbrev: auto
    vers_chap_url: auto
    vers_book_name_abbrev: auto
    vers_chap_num: auto
    vers_num: auto
    vers_num_words: auto
    vers_book: BookType | None
    vers_chap: ChapType | None
    word: list["WordType"] = strawberry.auto


@type(Word)
class WordType:
    word_id: auto
    word_greek: auto
    word_english: auto
    word_greek_punc: auto
    word_english_punc: auto
    word_book_name_abbrev: auto
    word_chap_num: auto
    word_vers_num: auto
    word_word_num: auto
    word_lexn_id_copy: auto
    word_pars_id_copy: auto

    word_pars: ParsType | None
    word_lexn: LexnType | None
    word_book: BookType | None
    word_chap: ChapType | None
    word_vers: VersType | None


@type(Pdgm)
class PdgmType:
    pdgm_id: auto
    pdgm_greek: auto
    pdgm_freq_nt: auto
    pdgm_lexn: LexnType | None
    pdgm_pars: ParsType | None


@type(Frlc)
class FrlcType:
    frlc_id: auto
    frlc_book_name_abbrev: auto
    frlc_chap_num: auto
    frlc_count: auto
    frlc_lexn: LexnType | None


@type(Frlb)
class FrlbType:
    frlb_id: auto
    frlb_book_name_abbrev: auto
    frlb_count: auto
    frlb_lexn: LexnType | None


# -----------------------------------------------
# Query
# -----------------------------------------------


@strawberry.type
class Query:

    words: list[WordType] = field(filters=WordFilter)
    word: WordType | None = field()

    lexns: list[LexnType] = field(filters=LexnFilter)
    lexn: LexnType | None = field()

    pars: list[ParsType] = field(filters=ParsFilter)
    par: ParsType | None = field()

    books: list[BookType] = field(filters=BookFilter)
    book: BookType | None = field()

    chaps: list[ChapType] = field(filters=ChapFilter)
    chap: ChapType | None = field()

    verses: list[VersType] = field(filters=VersFilter)
    vers: VersType | None = field()

    pdgms: list[PdgmType] = field()
    pdgm: PdgmType | None = field()

    frlcs: list[FrlcType] = field()
    frlc: FrlcType | None = field()

    frlbs: list[FrlbType] = field()
    frlb: FrlbType | None = field()


schema = strawberry.Schema(query=Query)
