import ApiService from "./api.service"

class TopicService extends ApiService {
  static createTopic(_topicData: {
    title: string
    content: string
    createdBy: any
  }) {
    throw new Error("Method not implemented.")
  }
  constructor() {
    super()
  }

  private _getData = async (callAxios: Promise<any>) => {
    const { data, error } = await callAxios.catch(
      (err: { response: { data: { message: any } } }) => ({
        error: err.response.data.message
      })
    )
    if (error) {
      return { error }
    }
    return data
  }

  public async createTopic(topicData: {
    title: string
    content: string
    createdBy: string
  }) {
    const { data, error } = await this._getData(
      this.instance.post("/topics/topic", topicData)
    )
    if (error) {
      return { status: "error", error }
    }
    return { status: "ok", topic: data }
  }

  public async getTopics() {
    try {
      const data = await this._getData(this.instance.get("/topics/topic"))
      return { status: "ok", topics: data }
    } catch (error) {
      console.error("Error getting player data:", error)
      return { status: "error", error: error }
    }
  }

  public async getTopicsPagination(page: number, limit: number) {
    try {
      const data = await this._getData(
        this.instance.get(`/topics/topic/pagination?limit=${limit}&page=${page}`)
      )
      return { status: "ok", data: data }
    } catch (error) {
      return { status: "error", error: error }
    }
  }

  public async addComment(
    topicId: string,
    commentData: { content: string; createdBy: string }
  ) {
    const { data, error } = await this._getData(
      this.instance.post(`/topics/topic/${topicId}/comments`, commentData)
    )
    if (error) {
      return { status: "error", error }
    }
    return { status: "ok", comment: data }
  }
}

export { TopicService }
