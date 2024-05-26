import { useEffect, useState } from "react"
import { Title } from "rizzui"
import { Button, Pagination } from "@nextui-org/react"
import ModalCrearTopic from "../../components/Modals/modalCrearTopic" // Asegúrate de ajustar el path si es necesario
import { AiFillLike, AiFillDislike } from "react-icons/ai"
import { TopicService } from "../../services/topic.service"
import { ITopic } from "../../types/topic.type"
import { Link } from "react-router-dom"

const CreateTopicForm: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [topics, setTopics] = useState([])
  const topicService = new TopicService()

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const handleOpenChange = (open: boolean) => {
    setIsModalOpen(open)
  }

  const fetchTopics = () => {
    topicService
      .getTopicsPagination(currentPage, 5)
      .then((res) => res.data)
      .then((res) => {
        setTopics(res.topics)
        setTotalPages(Math.ceil(res.total / 5))
      })
      .catch((e) => console.error(e))
  }

  useEffect(() => {
    fetchTopics()
  }, [currentPage])

  return (
    <>
      <div className="flex flex-col min-h-screen pb-10 pt-8 gap-y-6 justify-start items-center w-full bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-100 to-gray-900">
        <div className="flex flex-row w-[80%] justify-between pb-6">
          <Title as="h1">Foro</Title>
          <Button
            color="primary"
            variant="shadow"
            onClick={() => setIsModalOpen(true)}
          >
            Crear un tema
          </Button>
        </div>

        {topics?.map((topic: ITopic) => (
          <div
            key={topic._id}
            className="flex flex-col w-[80%] justify-between border border-gray-500 py-4 px-6 rounded-lg"
          >
            <div className="flex flex-row justify-between">
              <Link to={`/foro/${topic._id}`}>
                <Title as="h3" className="hover:underline">
                  {topic.title}
                </Title>
              </Link>
              <div className="flex flex-row min-w-20 justify-between">
                <div className="flex flex-row items-center">
                  <AiFillLike /> <p>{topic.likes}</p>
                </div>
                <div className="flex flex-row items-center">
                  <AiFillDislike /> <p>{topic.dislikes}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <p>Creado por: {topic.createdBy.name}</p>
              <p>{new Date(topic.createdAt).toLocaleDateString()}</p>
            </div>
            <p>{topic.content}</p>
          </div>
        ))}
        {topics && (
          <Pagination
            total={totalPages}
            color="secondary"
            page={currentPage}
            onChange={setCurrentPage}
          />
        )}
      </div>

      <ModalCrearTopic
        isOpen={isModalOpen}
        onOpenChange={handleOpenChange}
        onTopicCreated={fetchTopics} // Pasa la función de actualización como prop
      />
    </>
  )
}

export default CreateTopicForm
