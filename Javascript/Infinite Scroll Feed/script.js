const PAGE_SIZE = 10
const TOTAL_POSTS = 100

let currentPage = 1
let isLoading = false
let allLoaded = false

async function fetchPosts(page) {
  const url = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${PAGE_SIZE}`
  const res = await fetch(url)
  const data = await res.json()
  return data
}

function renderPosts(posts) {
  const feed = document.getElementById("feed")
  posts.forEach(post => {
    const card = document.createElement("div")
    card.className = "post-card"
    card.innerHTML = `
          <h3>${post.title}</h3>
          <p>${post.body}</p>
          <p class="post-meta">Post #${post.id}</p>
        `
    feed.appendChild(card)
  })
}

async function loadMore() {
  if (isLoading || allLoaded) return

  isLoading = true
  document.getElementById("loaded").style.display = "block"

  try {
    const posts = await fetchPosts(currentPage)

    if (posts.length === 0) {
      allLoaded = true
      document.getElementById("endMsg").style.display = "block"
      document.getElementById("loaded").style.display = "none"
      return
    }
    renderPosts(posts)
    currentPage++

    if (currentPage * PAGE_SIZE > TOTAL_POSTS) {
      allLoaded = true
      document.getElementById("endMsg").style.display = "block"
    }
  }
  catch (err) {
    console.error("Failed to load posts:", err)
  } finally {
    isLoading = false
    document.getElementById("loaded").style.display = "none"
  }
}

// ── SCROLL DETECTION ──────────────────────────────────
// Intersection Observer watches a sentinel div at the bottom
// When it enters the viewport → load more posts

const sentinal = document.createElement("div")
sentinal.id = "sentinal"
document.body.appendChild(sentinal)

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadMore()
    }
  })
}, {
  rootMargin: "200px" // load before user hits exact bottom
})

observer.observe(sentinal)

loadMore()  // load first page on startup