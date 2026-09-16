<script>
  import { onMount } from 'svelte';
  import { api } from '../config.js';

  let pubs = [], loading = true, error = null;
  let page = 1, totalPages = 1;
  let expanded = {}; // id -> bool

  async function load() {
    loading = true; error = null;
    try {
      const res = await fetch(api(`/publications?page=${page}&limit=9`));
      if (!res.ok) throw new Error('Failed to load publications');
      const json = await res.json();
      pubs = json.data ?? [];
      totalPages = json.pagination?.total_pages ?? 1;
    } catch (e) { error = e.message; pubs = []; }
    finally { loading = false; }
  }

  function toggle(id) { expanded = { ...expanded, [id]: !expanded[id] }; }
  function setPage(p) { page = p; load(); window.scrollTo({ top: 0, behavior: 'smooth' }); }

  onMount(load);
</script>

<section class="bg-gradient-to-br from-[#4B338C] to-purple-900 text-white py-20 px-4">
  <div class="max-w-4xl mx-auto text-center">
    <div class="text-xs uppercase tracking-[0.3em] text-purple-300 mb-4">Research</div>
    <h1 class="text-4xl md:text-5xl font-bold mb-3">Publications</h1>
    <p class="text-lg text-purple-200">Peer-reviewed work from our faculty and researchers.</p>
  </div>
</section>

<div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-5xl mx-auto">
    {#if loading}
      <div class="space-y-4">
        {#each Array(4) as _}
          <div class="bg-white rounded-xl p-6 shadow-sm animate-pulse space-y-3">
            <div class="h-5 bg-gray-200 rounded w-3/4"></div>
            <div class="h-3 bg-gray-200 rounded w-1/2"></div>
            <div class="h-3 bg-gray-200 rounded w-full"></div>
          </div>
        {/each}
      </div>
    {:else if error}
      <p class="text-center text-red-600 py-20">{error}</p>
    {:else if pubs.length === 0}
      <p class="text-center text-gray-500 py-20">No publications listed yet.</p>
    {:else}
      <div class="space-y-4">
        {#each pubs as p (p.id)}
          <article class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border-l-4 border-purple-500">
            <div class="flex flex-wrap items-start justify-between gap-3 mb-2">
              <h2 class="text-lg font-semibold text-gray-900 leading-snug flex-1">{p.title}</h2>
              {#if p.published_at}
                <span class="text-xs text-gray-500 whitespace-nowrap px-2 py-0.5 bg-gray-100 rounded-full">{p.published_at}</span>
              {/if}
            </div>

            {#if p.authors}
              <div class="text-sm text-purple-700 mb-3 italic">{p.authors}</div>
            {/if}

            {#if p.abstract}
              <p class="text-sm text-gray-600 leading-relaxed" class:line-clamp-3={!expanded[p.id]}>
                {p.abstract}
              </p>
              {#if p.abstract.length > 180}
                <button on:click={() => toggle(p.id)} class="text-xs text-purple-600 hover:text-purple-800 mt-1 font-medium">
                  {expanded[p.id] ? 'Show less ↑' : 'Read more ↓'}
                </button>
              {/if}
            {/if}

            <div class="flex flex-wrap gap-2 mt-4">
              {#if p.pdf_url}
                <a href={p.pdf_url} target="_blank" rel="noopener noreferrer"
                   class="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-red-50 text-red-700 rounded-full hover:bg-red-100 transition-colors">
                  <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM8 18H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V8h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V8h2v2zm4 8h-2v-6h2v6zm0-8h-2V8h2v2z"/></svg>
                  PDF
                </a>
              {/if}
              {#if p.external_url}
                <a href={p.external_url} target="_blank" rel="noopener noreferrer"
                   class="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full hover:bg-purple-100 transition-colors">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                  External
                </a>
              {/if}
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
  .line-clamp-3 { display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }
</style>
