import React, { useState } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from '@nextui-org/react'
import { useAuth } from '../../contexts/auth.context'
import { TopicService } from '../../services/topic.service'

import { Textarea } from 'rizzui'

interface ModalComponentProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onTopicCreated: () => void
  id_topic: string
}

const ModalAddComment: React.FC<ModalComponentProps> = ({
  isOpen,
  onOpenChange,
  onTopicCreated,
  id_topic
}) => {
  const [content, setContent] = useState('')
  const [error, setError] = useState<string | null>(null)
  const { user, isAuthenticated } = useAuth()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const topicService = new TopicService()
    if (!isAuthenticated) {
      setError('Tienes que iniciar sesión para crear un tema')
      return
    }

    try {
      const topicData = {
        content,
        createdBy: user._id
      }
      const response = await topicService.addComment(id_topic, topicData)
      if (response.status === 'error') {
        setError(response.error)
      } else {
        setContent('')
        setError(null)
        onOpenChange(false) // Cerrar el modal
        onTopicCreated() // Actualizar la lista de temas
      }
    } catch (err) {
      setError('No se ha podido crear el Tema')
    }
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <form onSubmit={handleSubmit}>
              <ModalHeader className="flex flex-col gap-1">
                Escribe tu comentario
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-y-4">
                  <Textarea
                    className="w-full flex-wrap md:flex-nowrap"
                    id="content"
                    value={content}
                    placeholder="Escribe aquí"
                    onChange={(e) => setContent(e.target.value)}
                    required
                  />
                  {error && <p>{error}</p>}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" type="submit" className="w-full">
                  Sube tu comentario
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ModalAddComment
