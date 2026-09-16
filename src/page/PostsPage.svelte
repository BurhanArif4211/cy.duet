<script>
  import { onMount } from 'svelte';
  import { api } from '../config.js';
  import { formatDate } from '../utils/format.js';
  import { router } from '../router.js';

  let posts = [], loading = true, error = null;
  let page = 1, totalPages = 1;
  let category = '';
  let categories = [];

  async function load() {
    loading = true; error = null;
    try {
      const q = new URLSearchParams({ page: String(page), limit: '9' });
      if (category) q.set('category', category);
      const res = await fetch(api(`/posts?${q}`));
      if (!res.ok) throw new Error('Failed to load posts');
      const json = await res.json();
      posts = json.data ?? [];
      totalPages = json.pagination?.total_pages ?? 1;
    } catch (e) { error = e.message; posts = []; }
    finally { loading = false; }
  }

  async function loadCategories() {
    try {
      const res = await fetch(api('/posts?limit=50'));
      if (!res.ok) return;
      const json = await res.json();
      categories = [...new Set((json.data ?? []).map(p => p.category).filter(Boolean))];
    } catch {}
  }

  function setCategory(c) { category = c; page = 1; load(); }
  function setPage(p) { page = p; load(); window.scrollTo({ top: 0, behavior: 'smooth' }); }

  onMount(() => { load(); loadCategories(); });
</script>

<section class="bg-gradient-to-br from-[#4B338C] to-purple-900 text-white py-20 px-4">
  <div class="max-w-4xl mx-auto text-center">
    <div class="text-xs uppercase tracking-[0.3em] text-purple-300 mb-4">Newsroom</div>
    <h1 class="text-4xl md:text-5xl font-bold mb-3">News & Updates</h1>
    <p class="text-lg text-purple-200">Stories, research, and events from our department.</p>
  </div>
</section>

<div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-7xl mx-auto">
    {#if categories.length > 0}
      <div class="flex flex-wrap justify-center gap-2 mb-10">
        <button on:click={() => setCategory('')}
                class="px-4 py-2 rounded-full text-sm transition-colors {category === '' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-purple-100'}">
          All
        </button>
        {#each categories as c}
          <button on:click={() => setCategory(c)}
                  class="px-4 py-2 rounded-full text-sm transition-colors {category === c ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-purple-100'}">
            {c}
          </button>
        {/each}
      </div>
    {/if}

    {#if loading}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each Array(6) as _}
          <div class="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
            <div class="w-full h-48 bg-gray-200"></div>
            <div class="p-6 space-y-3">
              <div class="h-3 bg-gray-200 rounded w-1/3"></div>
              <div class="h-5 bg-gray-200 rounded w-full"></div>
              <div class="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        {/each}
      </div>
    {:else if error}
      <p class="text-center text-red-600 py-20">{error}</p>
    {:else if posts.length === 0}
      <div class="text-center py-20">
        <h3 class="text-xl font-semibold text-gray-900 mb-2">No posts found</h3>
        <p class="text-gray-500">{category ? `No posts in category "${category}".` : 'No posts published yet.'}</p>
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each posts as p (p.id)}
          <article
            class="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col"
            on:click={() => router.navigate(`/news/${p.slug}`)}
            role="button" tabindex="0"
            on:keydown={(e) => e.key === 'Enter' && router.navigate(`/news/${p.slug}`)}
          >
            {#if p.cover_image_url}
              <div class="w-full h-48 overflow-hidden bg-purple-100">
                <img src={p.cover_image_url} alt={p.title} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
            {/if}
            <div class="p-6 flex-1 flex flex-col">
              <div class="flex items-center gap-2 text-xs text-gray-500 mb-2">
                {#if p.category}
                  <span class="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-semibold uppercase tracking-wide">{p.category}</span>
                {/if}
                <span>{formatDate(p.published_at)}</span>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-700 transition-colors">{p.title}</h3>
              {#if p.excerpt}<p class="text-sm text-gray-600 line-clamp-3 flex-1">{p.excerpt}</p>{/if}
            </div>
          </article>
        {/each}
      </div>

      {#if totalPages > 1}
        <div class="flex items-center justify-center gap-3 mt-12">
          <button disabled={page === 1} on:click={() => setPage(page - 1)}
                  class="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm disabled:opacity-40 hover:bg-purple-50 transition-colors">
            Previous
          </button>
          <span class="text-sm text-gray-600">Page <span class="font-semibold">{page}</span> of {totalPages}</span>
          <button disabled={page === totalPages} on:click={() => setPage(page + 1)}
                  class="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm disabled:opacity-40 hover:bg-purple-50 transition-colors">
            Next
          </button>
        </div>
      {/if}
    {/if}
  </div>
</div>

<style>
  .line-clamp-2 { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
  .line-clamp-3 { display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }
</style>
