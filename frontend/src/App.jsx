import React from 'react'
import { RouterProvider } from 'react-router'
import { router } from './Routes/Route/Routes'

const App = () => {
  return (
    <div className='max-w-screen-xl mx-auto my-2'>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
