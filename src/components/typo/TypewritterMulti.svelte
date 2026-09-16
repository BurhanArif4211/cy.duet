<!-- src/components/TypewriterMulti.svelte -->
<script>
  import { onMount, onDestroy } from 'svelte';

  export let texts = [];
  export let typingSpeed = 70;
  export let eraseSpeed = 30;
  export let delay = 2000;
  export let loop = true;
  export let font = '';
  export let cursorClass = 'bg-purple-400';

  let displayedText = '';
  let index = 0;
  let isTyping = true;
  let isDeleting = false;
  let timer;

  function type() {
    const current = texts[index] ?? '';
    if (isTyping) {
      if (displayedText.length < current.length) {
        displayedText = current.slice(0, displayedText.length + 1);
        timer = setTimeout(type, typingSpeed);
      } else {
        timer = setTimeout(() => { isTyping = false; isDeleting = true; type(); }, delay);
      }
    } else if (isDeleting) {
      if (displayedText.length > 0) {
        displayedText = displayedText.slice(0, displayedText.length - 1);
        timer = setTimeout(type, eraseSpeed);
      } else {
        isDeleting = false;
        const next = (index + 1) % texts.length;
        if (!loop && next === 0) return;
        index = next;
        isTyping = true;
        timer = setTimeout(type, typingSpeed);
      }
    }
  }

  onMount(() => { type(); return () => clearTimeout(timer); });
  onDestroy(() => clearTimeout(timer));
</script>

<span class={`font-mono ${font}`}>
  {displayedText}<span class={`inline-block w-[2px] h-[1em] ${cursorClass} align-middle ml-1 animate-pulse`}></span>
</span>
