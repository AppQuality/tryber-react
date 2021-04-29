import React, { ReactNode} from 'react'
import './card.scss'

export interface CardProps {
  /**
   * contents
   */
  children?: ReactNode
}

export const Card = ({children}:CardProps) => {
  return (
    <div className="card">
      <div className="card-body">
        {children}
      </div>
    </div>
  )
}
