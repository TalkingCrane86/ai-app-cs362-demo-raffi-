addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    const url = new URL(request.url)
    if (url.pathname === '/') {
        return new Response(await fetch('index.html'), {
            headers: { 'content-type': 'text/html' },
        })
    }
    return fetch(request)
}