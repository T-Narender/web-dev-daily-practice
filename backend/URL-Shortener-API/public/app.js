document.getElementById('shortenBtn').addEventListener('click', async () => {
  const url = document.getElementById('urlInput').value.trim()
  const resultEl = document.getElementById('result')
  const allUrlsBtn = document.getElementById('getAllUrlsBtn')
  if (!url) {
    resultEl.textContent = 'Please provide a URL.'
    return
  }

  document.getElementById('loading').style.display = 'block'
  resultEl.textContent = ''

  try {
    const res = await fetch('/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    })

    const data = await res.json()
    if (!res.ok) {
      resultEl.textContent = data.error || 'Error'
      return
    }

    resultEl.innerHTML = `<pre><a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a></pre>`
  } catch (err) {
    resultEl.textContent = 'Network error'
  }
  try{
    allUrlsBtn.addEventListener('click', async () => {
      const res = await fetch('/all/urls')
      const data = await res.json()
      if (!res.ok) {
        resultEl.textContent = data.error || 'Error fetching URLs'
        return
      }
      resultEl.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`
    })
  } catch (err) {
    resultEl.textContent = 'Network error'
  }

  document.getElementById('loading').style.display = 'none'
})
