import React from 'react'

export default function Header({childern}) {
  return (
    <div>
      <div className='flex flex-row items-center justify-center gap-5'>
                <img src="borderleft.png" alt="" />
                <h2 className="text-4xl font-arbutus text-center">{childern}</h2> <br />
                <img src="borderright.png" alt="" />
            </div>
    </div>
  )
}
