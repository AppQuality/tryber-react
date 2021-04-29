import React from 'react'
import {Button} from '../button/Button'
import './header.scss'

export interface User {
  id: number
  username: string
  name: string
  surname: string
  email: string
  image: string
}

export interface HeaderProps {
  user?: User
  logo?: React.ReactNode
};

export interface UserInfoProps {
  user: User
};

export const Header = ({ user, logo }: HeaderProps) => {
  const UserInfo = ({user}: UserInfoProps) => (
    <div className='user-info'>
      <div className="user-avatar">
        <img src={user.image} />
      </div>
      <div className="user-name">
        {user.name} {user.surname} <span className="user-id">(T{user.id})</span>
      </div>
      <Button size='sm' type='link'>login</Button>
    </div>
  )

  return (
    <div className='site-header'>
      <div className='brand-logo'>
        {(logo)
          ? {logo}
          : <img src='https://crowd.app-quality.com/wp-content/themes/crowdappquality/img/aq_vector_logo_light_crowd.svg' />
        }
      </div>
      <div className='header-menu'>
      </div>
      <div className="header-actions">
        {(user)
          ? <UserInfo user={user}/>
          : <Button size='sm' type='link'>login</Button>
        }
      </div>
    </div>
  )
}