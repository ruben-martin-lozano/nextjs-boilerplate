import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

export default function Index() {
  const fetchHandler = (url, replace = false) => {
    fetch(url, { method: 'POST' })
      .then(request => request.text())
      .then(response => {
        console.log(response)

        if (replace) {
          document.querySelector('html').innerHTML = response
        }
      })
      .catch(console.error)
    /*
    try {
      const request = await fetch(url, { method: 'POST' })
      const response = await request.text()
      console.log(response)

      if (replace) {
        document.querySelector('html').innerHTML = response
      }
    } catch (e) {
      console.error(e)
    }
    */
  }

  const XMLHttpRequestHandler = url => {
    const request = new XMLHttpRequest()

    request.open('POST', url)
    request.send()
    request.onload = () => {
      if (request.readyState === 4 && request.status === 200) {
        const response = request.responseText
        console.log(response)
      }
    }
    request.onerror = console.error
  }

  const msg =
`Open developer tools and click on different options to see:

- CORS Errors for external domain.
- Response text for same domain.
- HTML has response but not fully parsed when replacing from same domain.

Another approach would be a URL in a JSON response from the endpoint and redirect from JS`

  return (
    <main>
      <h1>Request & Redirect examples</h1>
      <div>
        <section>
          <h2>Same domain (/hello)</h2>
          <button onClick={() => fetchHandler('/api/same-domain/1')}>
            ❌ JS fetch (POST/GET)
          </button>
          <button onClick={() => XMLHttpRequestHandler('/api/same-domain/1')}>
            ❌ JS XMLHttpRequest (POST/GET)
          </button>
          <button onClick={() => fetchHandler('/api/same-domain/1', true)}>
            ❌ JS & replace (POST/GET)
          </button>
          <form action='/api/same-domain/1' method='POST'>
            <input type='submit' value='✅ Form Submit (POST/GET)' />
          </form>
          <Link href='/api/same-domain/1'>✅ HTML anchor link (GET)</Link>
        </section>

        <section>
          <h2>External domain (ms-re--publishers)</h2>
          <button onClick={() => fetchHandler('/api/external-domain/1')}>
            ❌ JS fetch (POST/GET)
          </button>
          <button onClick={() => XMLHttpRequestHandler('/api/external-domain/1')}>
            ❌ JS XMLHttpRequest (POST/GET)
          </button>
          <button onClick={() => fetchHandler('/api/external-domain/1', true)}>
            ❌ JS & replace (POST/GET)
          </button>
          <form action='http://ms-re--publishers.es-microfc-pro.heimdall.schip.io/v1/crm/customers/10f1413a-c0f1-40eb-8b7a-505fc559fb39/delegate?actor=valentina.espinal@adevinta.com' method='POST'>
            <input type='submit' value='✅ Form Submit (POST/GET)' />
          </form>
          <Link href='http://ms-re--publishers.es-microfc-pro.heimdall.schip.io/v1/crm/customers/10f1413a-c0f1-40eb-8b7a-505fc559fb39/delegate?actor=valentina.espinal@adevinta.com'>✅ HTML anchor link (GET)</Link>
        </section>
      </div>
      <pre>
        <code dangerouslySetInnerHTML={{__html: msg }} />
      </pre>
    </main>
  )
}
