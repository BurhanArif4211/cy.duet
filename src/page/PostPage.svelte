<script>
  import { formatDate } from '../utils/format.js';
  import { router } from '../router.js';

  export let data = null;

  // Intercept internal links inside rendered HTML
  function onContentClick(e) {
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href) return;
    try {
      const url = new URL(href, window.location.origin);
      if (url.origin === window.location.origin) {
        e.preventDefault();
        router.navigate(url.pathname);
      }
    } catch {}
  }
</script>

{#if !data}
  <div class="max-w-3xl mx-auto py-24 px-4 text-center">
    <h1 class="text-2xl font-bold mb-3">Post not found</h1>
    <a href="/news" on:click={(e) => { e.preventDefault(); router.navigate('/news'); }} class="text-purple-600 hover:underline">
      ← Back to all news
    </a>
  </div>
{:else}
  <article class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <a href="/news" on:click={(e) => { e.preventDefault(); router.navigate('/news'); }}
       class="text-sm text-purple-600 hover:text-purple-800 inline-flex items-center gap-1 mb-6">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
      Back to News
    </a>

    {#if data.category}
      <div class="text-xs uppercase tracking-wider text-purple-600 font-semibold mb-3">{data.category}</div>
    {/if}

    <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">{data.title}</h1>

    <div class="flex items-center gap-3 text-sm text-gray-500 mb-8">
      <span>Published {formatDate(data.published_at)}</span>
      {#if data.updated_at}
        <span class="w-1 h-1 rounded-full bg-gray-300"></span>
        <span>Updated {formatDate(data.updated_at)}</span>
      {/if}
    </div>

    {#if data.cover_image_url}
      <img src={data.cover_image_url} alt={data.title} class="w-full rounded-xl mb-10 shadow-sm" loading="eager" />
    {/if}

    <div
      class="prose prose-lg max-w-none
             prose-headings:text-gray-900
             prose-a:text-purple-600 prose-a:no-underline hover:prose-a:underline
             prose-strong:text-gray-900
             prose-blockquote:border-purple-500 prose-blockquote:bg-purple-50 prose-blockquote:py-1 prose-blockquote:rounded-r
             prose-img:rounded-lg
             prose-code:text-purple-700 prose-code:bg-purple-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-[''] prose-code:after:content-['']"
      on:click={onContentClick}
    >{@html data.content}</div>
  </article>
{/if}
