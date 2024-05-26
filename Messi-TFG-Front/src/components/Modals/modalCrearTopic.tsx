import React, { useState } from "react"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "@nextui-org/react"
import { useAuth } from "../../contexts/auth.context"
import { TopicService } from "../../services/topic.service"

import { Textarea, Input } from "rizzui"
interface ModalComponentProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onTopicCreated: () => void // Nueva prop para manejar la actualización de temas
}

const ModalCrearTopic: React.FC<ModalComponentProps> = ({
  isOpen,
  onOpenChange,
  onTopicCreated
}) => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [error, setError] = useState<string | null>(null)
  const { user, isAuthenticated } = useAuth()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const topicService = new TopicService()
    if (!isAuthenticated) {
      setError("Tienes que iniciar sesión para crear un tema")
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
        onOpenChange(false) // Cerrar el modal
        onTopicCreated() // Actualizar la lista de temas
      }
    } catch (err) {
      setError("No se ha podido crear el Tema")
    }
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <form onSubmit={handleSubmit}>
              <ModalHeader className="flex flex-col gap-1">
                Crea tu tema nuevo
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-y-4">
                  <Input
                    className="w-full flex-wrap md:flex-nowrap"
                    label="Título"
                    placeholder="Escribe tu título"
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                  <Textarea
                    className="w-full flex-wrap md:flex-nowrap"
                    id="content"
                    value={content}
                    label="Subtítulo"
                    placeholder="Escribe una descripción"
                    onChange={(e) => setContent(e.target.value)}
                    required
                  />
                  {error && <p>{error}</p>}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" type="submit" className="w-full">
                  Sube tu nuevo tema
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ModalCrearTopic
