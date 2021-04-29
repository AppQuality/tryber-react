import React, {MouseEventHandler, ReactNode} from 'react'
import {Button} from '../button/Button'
import './layout.scss'

export interface LayoutProps {
  /**
   * contents
   */
  children?: ReactNode
  /**
   * size
   */
  size?: number
}

export const Grid = ({children}:LayoutProps) => {
  return (
    <div className="row">
      {children}
    </div>
  )
}

export const Col = ({children,size}:LayoutProps) => {
  return (
    <div className={`col-${size}`}>
      {children}
    </div>
  )
}

export const Container = ({children}:LayoutProps) => {
  return (
    <div className="container">
      {children}
    </div>
  )
}
