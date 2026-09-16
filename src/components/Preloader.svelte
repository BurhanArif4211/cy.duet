<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  const bootLines = [
    { text: 'cyber@duet:~$ init --secure-session',                delay: 180 },
    { text: 'cyber@duet:~$ fetch /api/settings',                  delay: 260 },
    { text: '  ✓ 200 OK',                                         delay: 140 },
    { text: 'cyber@duet:~$ fetch /api/hero-slides',               delay: 260 },
    { text: '  ✓ 200 OK',                                         delay: 140 },
    { text: 'cyber@duet:~$ mount SPA',                            delay: 220 },
    { text: '  ✓ ready.',                                         delay: 200 }
  ];

  let visible = [];
  let cursorVisible = true;
  let done = false;

  onMount(async () => {
    for (const line of bootLines) {
      visible = [...visible, line.text];
      await new Promise(r => setTimeout(r, line.delay));
    }
    done = true;
  });

  // Blink the trailing cursor regardless
  onMount(() => {
    const id = setInterval(() => { cursorVisible = !cursorVisible; }, 500);
    return () => clearInterval(id);
  });
</script>

<div
  transition:fade={{ duration: 400 }}
  class="fixed inset-0 z-[100] bg-[#0b0618] flex items-center justify-center px-4"
>
  <!-- grid overlay -->
  <div class="absolute inset-0 opacity-[0.08] pointer-events-none"
       style="background-image:linear-gradient(#a78bfa 1px, transparent 1px),linear-gradient(90deg,#a78bfa 1px, transparent 1px);background-size:40px 40px;">
  </div>

  <div class="relative w-full max-w-2xl">
    <div class="flex items-center gap-2 mb-4">
      <span class="w-3 h-3 rounded-full bg-red-500/70"></span>
      <span class="w-3 h-3 rounded-full bg-yellow-500/70"></span>
      <span class="w-3 h-3 rounded-full bg-green-500/70"></span>
      <span class="ml-3 text-xs text-purple-300/70 font-mono">secure-shell — duet-cs</span>
    </div>

    <div class="rounded-lg border border-purple-500/30 bg-black/60 backdrop-blur-sm p-5 sm:p-6 font-mono text-sm sm:text-base shadow-[0_0_60px_-15px_rgba(139,92,246,0.6)]">
      {#each visible as line, i}
        <div class="text-purple-200/90 leading-relaxed"
             class:text-green-400={line.includes('✓')}>
          {line}
        </div>
      {/each}

      {#if !done}
        <div class="text-purple-300 leading-relaxed">
          <span class="text-purple-400">cyber@duet:~$</span>
          <span
            class="inline-block w-2 h-4 align-middle ml-1 bg-purple-400"
            class:opacity-0={!cursorVisible}
          ></span>
        </div>
      {:else}
        <div class="text-purple-300 leading-relaxed">
          <span class="text-purple-400">cyber@duet:~$</span>
          <span
            class="inline-block w-2 h-4 align-middle ml-1 bg-purple-400"
            class:opacity-0={!cursorVisible}
          ></span>
        </div>
      {/if}
    </div>

    <div class="mt-4 h-1 w-full bg-purple-900/40 rounded-full overflow-hidden">
      <div
        class="h-full bg-gradient-to-r from-purple-500 to-fuchsia-500 transition-all duration-300"
        style={`width: ${Math.min(100, (visible.length / bootLines.length) * 100)}%`}
      ></div>
    </div>
  </div>
</div>
