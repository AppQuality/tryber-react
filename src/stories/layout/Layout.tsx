import React, {MouseEventHandler, ReactNode} from 'react'
import {Button} from '../button/Button'
import './layout.scss'

export interface LayoutProps {
  /**
   * contents
   */
  children?: ReactNode
}

export const Grid = ({children}:LayoutProps) => {
  return (
    <div>
      {children}
    </div>
  )
}

export const Col = ({children}:LayoutProps) => {
  return (
    <div>
      {children}
    </div>
  )
}

export const Container = ({children}:LayoutProps) => {
  return (
    <div>
      {children}
    </div>
  )
}