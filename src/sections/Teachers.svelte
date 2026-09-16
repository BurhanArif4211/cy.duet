<script>
  import { onMount } from 'svelte';
  import { api } from '../config.js';
  import { initials } from '../utils/format.js';

  let teachers = [], loading = true;

  onMount(async () => {
    try {
      const res = await fetch(api('/teachers'));
      teachers = res.ok ? await res.json() : [];
    } catch { teachers = []; }
    finally { loading = false; }
  });
</script>

<section class="py-16 px-4 md:px-8 lg:px-16 bg-white">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-10">
      <div class="text-xs uppercase tracking-[0.3em] text-purple-600 mb-3">People</div>
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900">Meet Our Faculty</h2>
    </div>

    {#if loading}
      <p class="text-center text-gray-500 py-12">Loading faculty…</p>
    {:else if teachers.length === 0}
      <p class="text-center text-gray-500 py-12">Faculty to be announced.</p>
    {:else}
      <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {#each teachers.slice(0, 8) as t (t.id)}
          <div class="bg-gray-50 rounded-xl p-6 text-center hover:bg-purple-50 transition-colors">
            <div class="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full overflow-hidden border-4 border-purple-200 mb-4 bg-gradient-to-br from-purple-300 to-purple-500 flex items-center justify-center">
              {#if t.profile_image_url}
                <img src={t.profile_image_url} alt={t.name} class="w-full h-full object-cover" loading="lazy" />
              {:else}
                <span class="text-white text-2xl md:text-3xl font-bold">{initials(t.name)}</span>
              {/if}
            </div>
            <h3 class="text-sm md:text-base font-semibold text-gray-900 mb-1 line-clamp-1">{t.name}</h3>
            {#if t.title}<p class="text-xs md:text-sm text-purple-700 mb-3 line-clamp-2">{t.title}</p>{/if}
            {#if t.email}
              <a href={`mailto:${t.email}`} class="text-xs text-gray-500 hover:text-purple-600 transition-colors">Contact</a>
            {/if}
          </div>
        {/each}
      </div>
      <div class="text-center mt-10">
        <a href="/faculty"
           on:click={(e) => { e.preventDefault(); window.history.pushState({}, '', '/faculty'); window.dispatchEvent(new PopStateEvent('popstate')); }}
           class="inline-block border-2 border-purple-600 text-purple-700 px-6 py-3 rounded-lg hover:bg-purple-600 hover:text-white transition-colors font-medium">
          View Full Faculty
        </a>
      </div>
    {/if}
  </div>
</section>

<style>
  .line-clamp-1 { display:-webkit-box; -webkit-line-clamp:1; -webkit-box-orient:vertical; overflow:hidden; }
  .line-clamp-2 { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
</style>
