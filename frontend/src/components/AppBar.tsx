import React from 'react'

import { ProfileIcon } from './ProfileIcon'
import { Link } from 'react-router-dom'
import { GlowingButton } from './GlowingButton'

export const AppBar = () => {
  return (
    <div className='flex justify-between border-b-2 py-4 px-12 '>
        <div className='flex items-center'>
            <div>
              <Link to={'/blogs'}>
                logo
              </Link>
            </div>
           
        </div>
        <div className='flex items-center gap-5'>
          <Link to={'/publish'}>
          <GlowingButton text='New' />
            {/* <button className='bg-blue-500 text-white px-4 py-2 rounded'>New</button> */}
          </Link>
            <div className=''><ProfileIcon name='Himanshu' email='hgupta080104@gmail.com' avatarSrc=''/></div>
        </div>
    </div>
  )
}

