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
      this.instance.post("/topics", topicData)
    )
    if (error) {
      return { status: "error", error }
    }
    return { status: "ok", topic: data }
  }

  public async getTopics() {
    const { data, error } = await this._getData(this.instance.get("/topics"))
    if (error) {
      return { status: "error", error }
    }
    return { status: "ok", topics: data }
  }

  public async addComment(
    topicId: string,
    commentData: { content: string; createdBy: string }
  ) {
    const { data, error } = await this._getData(
      this.instance.post(`/topics/${topicId}/comments`, commentData)
    )
    if (error) {
      return { status: "error", error }
    }
    return { status: "ok", comment: data }
  }
}

export { TopicService }
