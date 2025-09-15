<!-- Typewriter.svelte -->
<script>
    import { onMount } from 'svelte';
    
    export let text = '';
    export let typingSpeed = 100; // ms per character
    export let eraseSpeed = 50; // ms per character when erasing
    export let delay = 2000; // ms to wait before erasing
    export let font='text-lg';
    let displayedText = '';
    let isTyping = true;
    let isDeleting = false;
    let isWaiting = false;
    
    onMount(() => {
        let timer;
        
        function type() {
            if (isTyping) {
                // Typing logic
                if (displayedText.length < text.length) {
                    displayedText = text.slice(0, displayedText.length + 1);
                    timer = setTimeout(type, typingSpeed);
                } else {
                    isTyping = false;
                    isWaiting = true;
                    timer = setTimeout(() => {
                        isWaiting = false;
                        isDeleting = true;
                        type();
                    }, delay);
                }
            } else if (isDeleting) {
                // Deleting logic
                if (displayedText.length > 0) {
                    displayedText = displayedText.slice(0, displayedText.length - 1);
                    timer = setTimeout(type, eraseSpeed);
                } else {
                    isDeleting = false;
                    isTyping = true;
                    timer = setTimeout(type, typingSpeed);
                }
            }
        }
        
        type();
        
        return () => clearTimeout(timer);
    });
</script>

<div class={`font-mono text-cyan-600 ${font}  font-semibold`}>
    {displayedText}
    <span class="inline-block w-2 h-6 bg-cyan-700 align-middle ml-1 animate-pulse"></span>
</div>