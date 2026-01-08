export function filterBySearch(news, search) {
  if (!search) return news;

  return news.filter((item) =>
    item.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );
}

export function filterByCategory(news, category) {
  if (category === "all") return news;

  return news.filter(
    (item) => item.category === category
  );
}