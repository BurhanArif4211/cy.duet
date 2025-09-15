<!-- MultiLineTypewriter.svelte -->
<script>
    import { onMount } from 'svelte';
    
    export let lines = [];
    export let typingSpeed = 100;
    export let eraseSpeed = 50;
    export let lineDelay = 1000;
    export var finalDelay = 3000;
    export let font ="text-lg";

    let currentLineIndex = 0;
    let displayedText = [];
    let isTyping = true;
    let isDeleting = false;
    let isWaiting = false;
    
    // Initialize displayedText array with empty strings
    $: if (lines.length > 0 && displayedText.length === 0) {
        displayedText = Array(lines.length).fill('');
    }
    
    onMount(() => {
        let timer;
        
        function type() {
            if (isTyping) {
                const currentLine = lines[currentLineIndex];
                
                if (displayedText[currentLineIndex].length < currentLine.length) {
                    // Continue typing current line
                    displayedText[currentLineIndex] = currentLine.slice(0, displayedText[currentLineIndex].length + 1);
                    timer = setTimeout(type, typingSpeed);
                } else if (currentLineIndex < lines.length - 1) {
                    // Move to next line
                    isWaiting = true;
                    timer = setTimeout(() => {
                        isWaiting = false;
                        currentLineIndex++;
                        type();
                    }, lineDelay);
                } else {
                    // All lines are typed, wait then start deleting
                    isWaiting = true;
                    timer = setTimeout(() => {
                        isWaiting = false;
                        isTyping = false;
                        isDeleting = true;
                        type();
                    }, finalDelay);
                }
            } else if (isDeleting) {
                if (displayedText[currentLineIndex].length > 0) {
                    // Continue deleting current line
                    displayedText[currentLineIndex] = displayedText[currentLineIndex].slice(0, displayedText[currentLineIndex].length - 1);
                    timer = setTimeout(type, eraseSpeed);
                } else if (currentLineIndex > 0) {
                    // Move to previous line
                    isWaiting = true;
                    timer = setTimeout(() => {
                        isWaiting = false;
                        currentLineIndex--;
                        type();
                    }, lineDelay);
                } else {
                    // All lines are deleted, start typing again
                    isDeleting = false;
                    isTyping = true;
                    timer = setTimeout(type, typingSpeed);
                }
            }
        }
        
        if (lines.length > 0) {
            type();
        }
        
        return () => clearTimeout(timer);
    });
</script>

<div class={`${font} font-mono p-4 rounded-lg`}>
    {#each displayedText as line, index}
        <div class={ (index === currentLineIndex && !isWaiting ) ? 'text-black' : 'text-gray-700'}>
            {line}
            {#if index === currentLineIndex && !isWaiting && !isDeleting}
                <span class="inline-block w-2 h-4 bg-black align-middle ml-1 animate-pulse"></span>
            {/if}
        </div>
    {/each}
</div>