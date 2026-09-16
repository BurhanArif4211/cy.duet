<script>
  export let info = null;
  export let compact = false;
</script>

{#if info && info.name}
  <section class={`px-4 md:px-8 lg:px-16 bg-white ${compact ? 'py-10' : 'py-16'}`}>
    <div class="max-w-6xl mx-auto">
      {#if !compact}
        <div class="text-center mb-10">
          <div class="text-xs uppercase tracking-[0.3em] text-purple-600 mb-3">Leadership</div>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900">Message from the Head of Department</h2>
        </div>
      {/if}

      <div class="flex flex-col md:flex-row items-center gap-10">
        <div class="w-full md:w-1/3 flex justify-center">
          <div class="relative">
            <div class="absolute -inset-2 rounded-full bg-gradient-to-tr from-purple-500 to-fuchsia-400 opacity-30 blur-lg"></div>
            <div class="relative w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-purple-600 shadow-xl bg-purple-100">
              {#if info.image_url}
                <img src={info.image_url} alt={info.name} class="w-full h-full object-cover" loading="lazy" />
              {:else}
                <div class="w-full h-full flex items-center justify-center text-purple-700 text-6xl font-bold">
                  {info.name[0] ?? 'H'}
                </div>
              {/if}
            </div>
          </div>
        </div>

        <div class="w-full md:w-2/3">
          <h3 class="text-2xl font-semibold text-purple-800 mb-1">{info.name}</h3>
          <div class="text-sm text-gray-500 mb-5">Head of Department</div>
          <p class="text-gray-700 leading-relaxed whitespace-pre-line mb-6">{info.message}</p>
          {#if info.email}
            <a href={`mailto:${info.email}`} class="inline-flex items-center gap-2 text-purple-700 hover:text-purple-900 font-medium transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              {info.email}
            </a>
          {/if}
        </div>
      </div>
    </div>
  </section>
{/if}
