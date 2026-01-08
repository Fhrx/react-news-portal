import { useState } from "react"

const NewsForm = ({ initialData = {}, onSubmit }) => {
  const [title, setTitle] = useState(initialData.title || "")
  const [category, setCategory] = useState(initialData.category || "")
  const [content, setContent] = useState(initialData.content || "")

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title || !category || content.length < 10) {
      alert("Invalid form")
      return
    }

    onSubmit({
      name: title,
      data: {
        category,
        content,
      },
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <input
        className="border p-2 w-full"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="border p-2 w-full"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <textarea
        className="border p-2 w-full h-32"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button className="px-4 py-2 bg-black text-white rounded">
        Save
      </button>
    </form>
  )
}

export default NewsForm