import { useEffect } from 'react'

export default function Hello() {
  useEffect(() => {
    window.alert('Hello from JS!')
  }, [])

  return (
    <>
      <h1>👋🏻 Hello</h1>
      <p>¿Did you see the window.alert?</p>
    </>
  )
}
