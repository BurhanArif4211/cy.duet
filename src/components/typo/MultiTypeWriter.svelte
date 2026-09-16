<!-- src/components/MultiLineTypewriter.svelte -->
<script>
  import { onMount, onDestroy } from 'svelte';

  export let lines = [];
  export let typingSpeed = 55;
  export let eraseSpeed = 25;
  export let lineDelay = 500;
  export let finalDelay = 3200;
  export let font = 'text-base';
  export let activeLineClass = 'text-white';
  export let idleLineClass = 'text-purple-300/60';
  export let cursorClass = 'bg-purple-300';

  let currentLineIndex = 0;
  let displayedText = [];
  let isTyping = true;
  let isDeleting = false;
  let isWaiting = false;
  let timer;

  // Initialise once, without triggering a reactive loop
  $: if (lines.length > 0 && displayedText.length !== lines.length) {
    displayedText = Array(lines.length).fill('');
  }

  function type() {
    if (isTyping) {
      const line = lines[currentLineIndex] ?? '';
      if (displayedText[currentLineIndex].length < line.length) {
        displayedText[currentLineIndex] = line.slice(0, displayedText[currentLineIndex].length + 1);
        timer = setTimeout(type, typingSpeed);
      } else if (currentLineIndex < lines.length - 1) {
        isWaiting = true;
        timer = setTimeout(() => { isWaiting = false; currentLineIndex++; type(); }, lineDelay);
      } else {
        isWaiting = true;
        timer = setTimeout(() => { isWaiting = false; isTyping = false; isDeleting = true; type(); }, finalDelay);
      }
    } else if (isDeleting) {
      if (displayedText[currentLineIndex].length > 0) {
        displayedText[currentLineIndex] = displayedText[currentLineIndex].slice(0, displayedText[currentLineIndex].length - 1);
        timer = setTimeout(type, eraseSpeed);
      } else if (currentLineIndex > 0) {
        isWaiting = true;
        timer = setTimeout(() => { isWaiting = false; currentLineIndex--; type(); }, lineDelay);
      } else {
        isDeleting = false;
        isTyping = true;
        timer = setTimeout(type, typingSpeed);
      }
    }
  }

  onMount(() => { if (lines.length > 0) type(); return () => clearTimeout(timer); });
  onDestroy(() => clearTimeout(timer));
</script>

<div class={`${font} font-mono`}>
  {#each displayedText as line, i}
    <div class={i === currentLineIndex && !isWaiting ? activeLineClass : idleLineClass}>
      {line}{#if i === currentLineIndex && !isWaiting && !isDeleting}<span class={`inline-block w-[2px] h-[1em] ${cursorClass} align-middle ml-1 animate-pulse`}></span>{/if}
    </div>
  {/each}
</div>
