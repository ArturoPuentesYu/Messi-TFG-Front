import React, { useState } from "react"
import { TopicService } from "../../services/topic.service"
import { useAuth } from "../../contexts/auth.context"

const CreateTopicForm: React.FC = () => {
  const { user, isAuthenticated } = useAuth()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const topicService = new TopicService()
    if (!isAuthenticated) {
      setError("You must be logged in to create a topic")
      return
    }

    try {
      const topicData = {
        title,
        content,
        createdBy: user._id
      }
      const response = await topicService.createTopic(topicData)
      if (response.status === "error") {
        setError(response.error)
      } else {
        setTitle("")
        setContent("")
        setError(null)
        // Optionally redirect or update state to reflect new topic
      }
    } catch (err) {
      setError("Failed to create topic")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      {error && <p>{error}</p>}
      <button type="submit">Create Topic</button>
    </form>
  )
}

export default CreateTopicForm
