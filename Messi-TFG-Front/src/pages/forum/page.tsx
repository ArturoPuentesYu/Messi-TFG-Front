import { useEffect, useState } from 'react'
import { Title } from 'rizzui'
import { Button, Pagination } from '@nextui-org/react'
import ModalCrearTopic from '../../components/Modals/modalCrearTopic' // Asegúrate de ajustar el path si es necesario
import { AiFillLike, AiFillDislike } from 'react-icons/ai'
import { TopicService } from '../../services/topic.service'
import { ITopic } from '../../types/topic.type'
import { Link } from 'react-router-dom'

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
      <div className="flex min-h-screen w-full flex-col items-center justify-start gap-y-6 bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-100 to-gray-900 pb-10 pt-8">
        <div className="flex w-[80%] flex-row justify-between pb-6">
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
          <Link
            to={`/foro/${topic._id}`}
            key={topic._id}
            className="flex w-[80%] flex-col justify-between rounded-lg bg-white/50 px-6 py-4 shadow-md hover:bg-slate-300/50 hover:shadow-2xl"
          >
            <div>
              <div className="flex flex-row justify-between">
                <Title as="h2" className="hover:underline">
                  {topic.title}
                </Title>
                <div className="flex min-w-20 flex-row justify-between">
                  <div className="flex flex-row items-center">
                    <AiFillLike /> <p>{topic.likes?.length ?? 0}</p>
                  </div>
                  <div className="flex flex-row items-center">
                    <AiFillDislike /> <p>{topic.dislikes?.length ?? 0}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <p>Creado por: {topic.createdBy.name}</p>
                <p>{new Date(topic.createdAt).toLocaleDateString()}</p>
              </div>
              <p>{topic.content}</p>
            </div>
          </Link>
        ))}
        {topics && (
          <Pagination
            total={totalPages}
            color="primary"
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
