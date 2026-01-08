export function sortNews(news, sort) {
  const data = [...news];

  switch (sort) {
    case "latest":
      return data.sort(
        (a, b) =>
          new Date(b.publishedAt) -
          new Date(a.publishedAt)
      );

    case "oldest":
      return data.sort(
        (a, b) =>
          new Date(a.publishedAt) -
          new Date(b.publishedAt)
      );

    case "title_asc":
      return data.sort((a, b) =>
        a.title.localeCompare(b.title)
      );

    case "title_desc":
      return data.sort((a, b) =>
        b.title.localeCompare(a.title)
      );

    default:
      return data;
  }
}