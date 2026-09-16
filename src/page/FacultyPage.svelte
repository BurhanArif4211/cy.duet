<script>
  import { onMount } from 'svelte';
  import { api } from '../config.js';
  import { initials } from '../utils/format.js';

  let teachers = [], loading = true, error = null;

  onMount(async () => {
    try {
      const res = await fetch(api('/teachers'));
      if (!res.ok) throw new Error('Failed to load faculty');
      teachers = await res.json();
    } catch (e) { error = e.message; }
    finally { loading = false; }
  });
</script>

<section class="bg-gradient-to-br from-[#4B338C] to-purple-900 text-white py-20 px-4">
  <div class="max-w-4xl mx-auto text-center">
    <div class="text-xs uppercase tracking-[0.3em] text-purple-300 mb-4">People</div>
    <h1 class="text-4xl md:text-5xl font-bold mb-3">Our Faculty</h1>
    <p class="text-lg text-purple-200">The experts shaping the next generation of cyber defenders.</p>
  </div>
</section>

<div class="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
  <div class="max-w-7xl mx-auto">
    {#if loading}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {#each Array(8) as _}
          <div class="bg-white rounded-xl p-6 text-center shadow-sm animate-pulse">
            <div class="w-32 h-32 mx-auto rounded-full bg-gray-200 mb-4"></div>
            <div class="h-5 bg-gray-200 rounded w-2/3 mx-auto mb-3"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        {/each}
      </div>
    {:else if error}
      <p class="text-center text-red-600 py-20">{error}</p>
    {:else if teachers.length === 0}
      <p class="text-center text-gray-500 py-20">Faculty to be announced.</p>
    {:else}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {#each teachers as t (t.id)}
          <div class="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div class="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-purple-100 mb-4 bg-gradient-to-br from-purple-300 to-purple-500 flex items-center justify-center">
              {#if t.profile_image_url}
                <img src={t.profile_image_url} alt={t.name} class="w-full h-full object-cover" loading="lazy" />
              {:else}
                <span class="text-white text-3xl font-bold">{initials(t.name)}</span>
              {/if}
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-1">{t.name}</h3>
            {#if t.title}<p class="text-sm text-purple-700 mb-4 leading-snug">{t.title}</p>{/if}
            {#if t.email}
              <a href={`mailto:${t.email}`} class="text-xs text-gray-500 hover:text-purple-600 inline-flex items-center gap-1 transition-colors">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                Contact
              </a>
            {/if}
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>
