const STORAGE_KEY = "NEWS_DATA";

/* ===============================
   INIT DUMMY DATA (TAMBAH 3 DATA BARU)
================================ */
const initialNews = [
  {
    id: "1",
    title: "Teknologi AI Mengubah Dunia",
    category: "Tech",
    author: "Admin",
    content: "Artificial Intelligence kini digunakan di berbagai sektor industri dan mengubah cara manusia bekerja. Perusahaan mulai mengadopsi AI untuk otomatisasi, analisis data, dan pengambilan keputusan. Teknologi ini juga membuka peluang baru di bidang kesehatan, pendidikan, dan transportasi.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    title: "Ekonomi Global Tahun 2025",
    category: "Business",
    author: "Editor",
    content: "Pertumbuhan ekonomi global diprediksi melambat akibat inflasi dan konflik geopolitik. Analis memproyeksikan pertumbuhan ekonomi dunia hanya 2.7% di tahun 2025. Negara-negara berkembang masih menunjukkan ketahanan dengan pertumbuhan rata-rata 4.1%.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    createdAt: "2024-01-14T14:20:00Z",
  },
  {
    id: "3",
    title: "React 18: Fitur Concurrent Rendering",
    category: "Tech",
    author: "Web Developer",
    content: "React 18 menghadirkan fitur Concurrent Rendering yang memungkinkan multiple tasks berjalan secara bersamaan. Fitur ini meningkatkan user experience dengan mengurangi lag dan membuat aplikasi lebih responsif. Developer sekarang bisa menggunakan useTransition dan useDeferredValue untuk optimasi rendering.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    createdAt: "2024-01-13T09:15:00Z",
  },
  {
    id: "4",
    title: "Startup Fintech Indonesia Raih Pendanaan",
    category: "Business",
    author: "Business Analyst",
    content: "Startup fintech asal Indonesia berhasil mengumpulkan pendanaan Seri B senilai $30 juta. Pendanaan ini akan digunakan untuk ekspansi ke pasar Asia Tenggara dan pengembangan produk digital banking. CEO menyatakan fokus pada financial inclusion untuk masyarakat yang belum terjangkau bank.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    createdAt: "2024-01-12T16:45:00Z",
  },
  {
    id: "5",
    title: "Trend Remote Work Pasca Pandemi",
    category: "General",
    author: "HR Specialist",
    content: "Hybrid work model menjadi standar baru di perusahaan teknologi. Survei menunjukkan 68% perusahaan mengadopsi sistem kerja hybrid permanent. Hal ini mempengaruhi real estate, teknologi collaboration tools, dan kebijakan HR. Produktivitas meningkat 15% dengan fleksibilitas kerja.",
    image: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    createdAt: "2024-01-11T11:30:00Z",
  },
];

/* ===============================
   STORAGE HELPERS - PERBAIKAN
================================ */
function initStorage() {
  const saved = localStorage.getItem(STORAGE_KEY);
  
  // PERBAIKAN: Cek apakah saved adalah null, undefined, atau empty array
  if (!saved || saved === "[]" || saved === "null" || saved === "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialNews));
    return initialNews;
  }
  
  try {
    const parsed = JSON.parse(saved);
    // PERBAIKAN: Jika parsed adalah array kosong, reset ke initial
    if (Array.isArray(parsed) && parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialNews));
      return initialNews;
    }
    return parsed;
  } catch (error) {
    console.error("Error parsing saved news, resetting to default:", error);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialNews));
    return initialNews;
  }
}

function readData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  
  if (!saved || saved === "[]" || saved === "null" || saved === "undefined") {
    return initStorage(); // Akan return initialNews
  }
  
  try {
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed) && parsed.length === 0) {
      return initStorage(); // Akan return initialNews
    }
    return parsed;
  } catch (error) {
    console.error("Error parsing saved news:", error);
    return initStorage(); // Akan return initialNews
  }
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
  const currentData = readData();
  const newData = currentData.filter((item) => item.id !== id);
  writeData(newData);
  return true;
}

// ✅ RESET TO DEFAULT (untuk testing/development)
export async function resetToDefault() {
  writeData(initialNews);
  return initialNews.map(normalize);
}

// ✅ CHECK IF STORAGE IS EMPTY (helper untuk admin)
export async function isStorageEmpty() {
  const data = readData();
  return data.length === 0;
}

// ✅ GET STORAGE INFO (debug info)
export async function getStorageInfo() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return {
    hasStorage: !!saved,
    storageValue: saved,
    parsedLength: saved ? JSON.parse(saved).length : 0,
    initialLength: initialNews.length
  };
}