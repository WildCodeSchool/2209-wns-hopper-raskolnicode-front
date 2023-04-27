import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

interface ActionsProps {
  blogId?: string
}

const Actions = ({blogId}: ActionsProps) => {
  return (
    <section className="actions text-center p-3 bg-dark">
      <p className='h3 mb-4 text-light'>Tableau de bord de mon blog</p>
      <div className="d-flex justify-content-center">
        <Link to={`/blog/${blogId}/nouvel-article`}>
          <button className='btn btn-light'><FontAwesomeIcon icon={faPenToSquare} /> Article</button>
        </Link>
      </div>
    </section>
  )
}

export default Actions