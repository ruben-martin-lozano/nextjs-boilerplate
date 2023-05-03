import { useEffect } from 'react'

export default function Hello() {
  useEffect(() => {
    window.alert('Hello from JS!')
  }, [])

  return (
    <section className='hello'>
      <h1>👋🏻 Hello</h1>
      <p>¿Did you see the window.alert and brown background?</p>
    </section>
  )
}
