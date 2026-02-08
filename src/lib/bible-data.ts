
export const OLD_TESTAMENT_BOOKS = [
  'AadiKaandamu',
  'Nirgamanamu',
  'Leveeyakaandamu',
  'Sankhya Kaandamu',
  'Dvitiyopadesha Kaandamu',
  'Yehoshuva',
  'Nyayaadhipathulu',
  'Ruthu',
  'I Samuyelu',
  'II Samuyelu',
  'I Raajulu',
  'II Raajulu',
  'I Dinavruttantamu',
  'II Dinavruttantamu',
  'Ezra',
  'Nehemya',
  'Estheru',
  'Yobu',
  'Keertanalu',
  'Saamethalu',
  'Prasangamu',
  'Shreekaantula Geetamu',
  'Yeshaaya',
  'Yeremiya',
  'Vilapavaakyamulu',
  'Yehezkelu',
  'Daanyelu',
  'Hosheya',
  'Yoelu',
  'Aamosu',
  'Obadya',
  'Yona',
  'Meeka',
  'Nahoomu',
  'Habakkuku',
  'Zephanya',
  'Haggai',
  'Zekarya',
  'Malaaki'
];

export const NEW_TESTAMENT_BOOKS = [
  'Matthayi',
  'Marku',
  'Luka',
  'Yohanu',
  'Aposthula Kruthyalu',
  'Romiyulaku',
  'I Korinthiyulaku',
  'II Korinthiyulaku',
  'Galatiyulaku',
  'Ephesiyulaku',
  'Philippiyulaku',
  'Kolossiyulaku',
  'I Thessalonikeyulaku',
  'II Thessalonikeyulaku',
  'I Timothiki',
  'II Timothiki',
  'Titusku',
  'Philemonku',
  'Hebreeyulaku',
  'Yakobu',
  'I Peturu',
  'II Peturu',
  'I Yohanu',
  'II Yohanu',
  'III Yohanu',
  'Yuda',
  'Prakatana'
];

export const ALL_BOOKS = [...OLD_TESTAMENT_BOOKS, ...NEW_TESTAMENT_BOOKS];

export const BOOK_CHAPTERS: { [key: string]: number } = {
  // Old Testament
  'AadiKaandamu': 50,
  'Nirgamanamu': 40,
  'Leveeyakaandamu': 27,
  'Sankhya Kaandamu': 36,
  'Dvitiyopadesha Kaandamu': 34,
  'Yehoshuva': 24,
  'Nyayaadhipathulu': 21,
  'Ruthu': 4,
  'I Samuyelu': 31,
  'II Samuyelu': 24,
  'I Raajulu': 22,
  'II Raajulu': 25,
  'I Dinavruttantamu': 29,
  'II Dinavruttantamu': 36,
  'Ezra': 10,
  'Nehemya': 13,
  'Estheru': 10,
  'Yobu': 42,
  'Keertanalu': 150,
  'Saamethalu': 31,
  'Prasangamu': 12,
  'Shreekaantula Geetamu': 8,
  'Yeshaaya': 66,
  'Yeremiya': 52,
  'Vilapavaakyamulu': 5,
  'Yehezkelu': 48,
  'Daanyelu': 12,
  'Hosheya': 14,
  'Yoelu': 3,
  'Aamosu': 9,
  'Obadya': 1,
  'Yona': 4,
  'Meeka': 7,
  'Nahoomu': 3,
  'Habakkuku': 3,
  'Zephanya': 3,
  'Haggai': 2,
  'Zekarya': 14,
  'Malaaki': 4,

  // New Testament
  'Matthayi': 28,
  'Marku': 16,
  'Luka': 24,
  'Yohanu': 21,
  'Aposthula Kruthyalu': 28,
  'Romiyulaku': 16,
  'I Korinthiyulaku': 16,
  'II Korinthiyulaku': 13,
  'Galatiyulaku': 6,
  'Ephesiyulaku': 6,
  'Philippiyulaku': 4,
  'Kolossiyulaku': 4,
  'I Thessalonikeyulaku': 5,
  'II Thessalonikeyulaku': 3,
  'I Timothiki': 6,
  'II Timothiki': 4,
  'Titusku': 3,
  'Philemonku': 1,
  'Hebreeyulaku': 13,
  'Yakobu': 5,
  'I Peturu': 5,
  'II Peturu': 3,
  'I Yohanu': 5,
  'II Yohanu': 1,
  'III Yohanu': 1,
  'Yuda': 1,
  'Prakatana': 22
};

export const getChaptersForBook = (book: string): number => {
  return BOOK_CHAPTERS[book] || 0;
};

export const getNextChapter = (book: string, chapter: number): { book: string, chapter: number } | null => {
  const totalChaptersInCurrentBook = getChaptersForBook(book);

  if (chapter < totalChaptersInCurrentBook) {
    return { book, chapter: chapter + 1 };
  }

  const currentBookIndex = ALL_BOOKS.indexOf(book);
  if (currentBookIndex !== -1 && currentBookIndex < ALL_BOOKS.length - 1) {
    const nextBook = ALL_BOOKS[currentBookIndex + 1];
    return { book: nextBook, chapter: 1 };
  }

  return null; // End of available books
};

export const getPrevChapter = (book: string, chapter: number): { book: string, chapter: number } | null => {
  if (chapter > 1) {
    return { book, chapter: chapter - 1 };
  }

  const currentBookIndex = ALL_BOOKS.indexOf(book);
  if (currentBookIndex > 0) {
    const prevBook = ALL_BOOKS[currentBookIndex - 1];
    const totalChaptersInPrevBook = getChaptersForBook(prevBook);
    return { book: prevBook, chapter: totalChaptersInPrevBook };
  }

  return null; // Beginning of available books
};
