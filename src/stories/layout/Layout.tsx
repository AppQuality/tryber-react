import React, {ReactNode} from 'react'
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
  /**
   * gutter
   */
  gutter?: number
}

export const Grid = ({children,gutter}:LayoutProps) => {
  let className = 'row'
  if (typeof gutter != 'undefined') {
    className += ` g-${gutter}`
  }
  return (
    <div className={className}>
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
