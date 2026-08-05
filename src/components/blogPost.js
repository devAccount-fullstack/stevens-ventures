export function renderBlogPost(card) {
  if (!card) {
    return `
      <div class="content-wrapper blog-post-not-found">
        <h1>Post not found</h1>
        <p>The article you're looking for doesn't exist or may have been moved.</p>
        <a href="/resources/" class="btn gray">Back to Resources</a>
      </div>
    `;
  }

  const body = card.fullContent || card.fullCotent || `<p>${card.excerpt}</p>`;

  return `
    <article class="blog-post">
      <div class="content-wrapper blog-post-body">
        <div class="blog-post-meta">
          <span>${card.author}</span>
          <span class="dot">&bull;</span>
          <time datetime="${card.date || card.publishDate}" title="${card.date || card.publishDate}">
            ${card.date || card.publishDate}
          </time>
        </div>

        <div class="blog-post-content">
          ${body}
        </div>
      </div>
    </article>
  `;
}