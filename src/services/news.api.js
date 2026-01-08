const STORAGE_KEY = "NEWS_DATA";

/* ===============================
   INIT DUMMY DATA
================================ */
const initialNews = [
  {
    id: "1",
    title: "Teknologi AI Mengubah Dunia",
    category: "Tech",
    author: "Admin",
    content:
      "Artificial Intelligence kini digunakan di berbagai sektor industri dan mengubah cara manusia bekerja.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Ekonomi Global Tahun 2025",
    category: "Business",
    author: "Editor",
    content:
      "Pertumbuhan ekonomi global diprediksi melambat akibat inflasi dan konflik geopolitik.",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c",
    createdAt: new Date().toISOString(),
  },
];

/* ===============================
   STORAGE HELPERS
================================ */
function initStorage() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialNews));
  }
}

function readData() {
  initStorage();
  return JSON.parse(localStorage.getItem(STORAGE_KEY));
}

function writeData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/* ===============================
   NORMALIZER
================================ */
function normalize(item) {
  return {
    id: item.id,
    title: item.title ?? item.name,
    category: item.category ?? item.data?.category ?? "General",
    author: item.author ?? item.data?.author ?? "Admin",
    content: item.content ?? item.data?.content ?? "",
    image:
      item.image ??
      item.data?.image ??
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c",
    createdAt: item.createdAt,
  };
}

/* ===============================
   API FUNCTIONS (FINAL)
================================ */

// ✅ USER & ADMIN LIST
export async function fetchNews() {
  return readData().map(normalize);
}

export async function getAllNews() {
  return readData().map(normalize);
}

// ✅ DETAIL
export async function getNewsById(id) {
  const item = readData().find((n) => n.id === id);
  return item ? normalize(item) : null;
}

// ✅ CREATE
export async function createNews(payload) {
  const news = readData();

  const newItem = {
    id: Date.now().toString(),
    title: payload.title,
    category: payload.category,
    author: payload.author || "Admin",
    content: payload.content,
    image:
      payload.image ||
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c",
    createdAt: new Date().toISOString(),
  };

  news.unshift(newItem);
  writeData(news);
  return newItem;
}

// ✅ UPDATE
export async function updateNews(id, payload) {
  const updated = readData().map((item) =>
    item.id === id ? { ...item, ...payload } : item
  );
  writeData(updated);
  return true;
}

// ✅ DELETE
export async function deleteNews(id) {
  writeData(readData().filter((item) => item.id !== id));
  return true;
}