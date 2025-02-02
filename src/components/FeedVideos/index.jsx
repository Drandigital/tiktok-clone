import { useState, useEffect } from 'react'
import VideoPlayer from '../VideoPlayer/index.jsx'
import styles from './styles.module.css'
import { getVideos } from '../../services/index.js'

export default function FeedVideos () {
  const [videos, setVideos] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    getVideos().then(([error, videos]) => {
      if (error) return setError(error)
      setVideos(videos)
    })
  }, [])

  if (error) {
    // Accede a la propiedad 'message' o cualquier otra propiedad relevante del objeto error
    return (
      <span>{error.message || 'Ha ocurrido un error'}</span> // Asegúrate de manejar el error correctamente
    )
  }

  return (
    videos.map(video => {
      const { user: { avatar, username } } = video
      return (
        <div key={video.id} className={styles.item}>
          <VideoPlayer
            {...video}
            avatar={avatar}
            username={username}
          />
        </div>
      )
    })
  )
}
