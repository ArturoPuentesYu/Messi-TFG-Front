import { useEffect, useState } from "react"
import { Title } from "rizzui"
import { Button, Pagination } from "@nextui-org/react"
import { AiFillLike, AiFillDislike } from "react-icons/ai"
import { TopicService } from "../../services/topic.service"
import { IComment, ITopic } from "../../types/topic.type"
import { Link, useParams } from "react-router-dom"
import ModalAddComment from "../../components/Modals/modalAddComment"
import { IoMdArrowBack } from "react-icons/io"

const CreateTopicForm: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [topic, setTopic] = useState<ITopic | null>(null)
  const topicService = new TopicService()

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const handleOpenChange = (open: boolean) => {
    setIsModalOpen(open)
  }

  const fetchTopic = () => {
    if (id) {
      topicService
        .getTopicById(id)
        .then((res) => {
          setTopic(res.topic)
          setTotalPages(Math.ceil(res.topic.comments.length / 5))
        })
        .catch((e) => console.error(e))
    }
  }

  useEffect(() => {
    fetchTopic()
  }, [id])

  return (
    <>
      <div className="flex flex-col min-h-screen pb-10 pt-8 gap-y-6 justify-start items-center w-full bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-100 to-gray-900">
        <div className="flex flex-row w-[80%] justify-between pb-6">
          <div className="flex flex-row justify-center items-center">
            <Link to={"/foro"}>
              <IoMdArrowBack size={28} />
            </Link>
            <Title as="h1">Foro</Title>
          </div>
          <Button
            color="primary"
            variant="shadow"
            onClick={() => setIsModalOpen(true)}
          >
            Añadir comentario
          </Button>
        </div>

        {topic && (
          <>
            <div
              className="flex flex-col w-[80%] pb-10 mb-auto justify-between border border-gray-500 pt-4 px-6 rounded-lg"
              key={topic._id}
            >
              <div className="flex flex-col sm:flex-row justify-between">
                <Title as="h3">{topic.title}</Title>
                <div className="flex flex-row min-w-20 justify-start gap-x-8 sm:gap-0 sm:justify-between ">
                  <div className="flex flex-row items-center">
                    <AiFillLike /> <p>{topic.likes}</p>
                  </div>
                  <div className="flex flex-row items-center">
                    <AiFillDislike /> <p>{topic.dislikes}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <div className="flex">
                  <p className="italic font-semibold">Creado por: </p>
                  <p className="ps-2">{topic.createdBy.name}</p>
                </div>
                <p>{new Date(topic.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex flex-col">
                <p className="font-semibold text-lg">Descripción: </p>
                <p className="ps: 2">{topic.content}</p>
              </div>
              <div className="flex flex-col gap-y-6 mt-10">
                {topic.comments
                  ?.slice((currentPage - 1) * 5, currentPage * 5)
                  .map((comment: IComment) => (
                    <div className="w-full justify-between border border-gray-500 py-4 px-6 rounded-lg">
                      <div className="flex flex-col">
                        <div className="flex flex-col justify-between sm:flex-row">
                          <div className="flex flex-row gap-2 items-baseline">
                            <p className="text-lg font-thin">
                              {comment.createdBy.name} {comment.createdBy.surnames}
                            </p>
                            <p className="italic text-sm font-thin ">
                              {new Date(comment.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex flex-row min-w-20 justify-start gap-x-4 sm:gap-x-8 sm:gap-0 sm:justify-between ">
                            <div className="flex flex-row items-center">
                              <AiFillLike /> <p>{comment.likes}</p>
                            </div>
                            <div className="flex flex-row items-center">
                              <AiFillDislike /> <p>{comment.dislikes}</p>
                            </div>
                          </div>
                        </div>
                        <p>{comment.content}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <Pagination
              total={totalPages}
              color="secondary"
              page={currentPage}
              onChange={setCurrentPage}
            />
          </>
        )}
      </div>

      <ModalAddComment
        isOpen={isModalOpen}
        onOpenChange={handleOpenChange}
        onTopicCreated={fetchTopic}
        id_topic={id || ""}
      />
    </>
  )
}

export default CreateTopicForm
