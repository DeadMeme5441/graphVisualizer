import React from 'react'

import Upload from './Upload'

const NavBar = () => {

  return (
    <div>
      <div className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full">
        <div className="mb-2 sm:mb-0">
          Enova
        </div>
        <div>
          <Upload />
        </div>
      </div>
    </div>
  )
}

export default NavBar;
