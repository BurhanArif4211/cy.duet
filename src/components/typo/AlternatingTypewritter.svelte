<!-- TypewriterMulti.svelte -->
<script>
    import { onMount } from "svelte";
  
    export let texts = []; // array of strings
    export let typingSpeed = 70; // ms per character
    export let eraseSpeed = 30; // ms per character
    export let delay = 2000; // ms before erasing
    export let loop = true; // whether to loop indefinitely
    export let font = ""; // additional font classes
    let displayedText = "";
    let index = 0; // current string index
    let isTyping = true;
    let isDeleting = false;
    let isWaiting = false;
  
    onMount(() => {
      let timer;
  
      function type() {
        const currentText = texts[index] ?? "";
  
        if (isTyping) {
          if (displayedText.length < currentText.length) {
            displayedText = currentText.slice(0, displayedText.length + 1);
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
          if (displayedText.length > 0) {
            displayedText = displayedText.slice(0, displayedText.length - 1);
            timer = setTimeout(type, eraseSpeed);
          } else {
            isDeleting = false;
            index = (index + 1) % texts.length; // move to next string
            if (!loop && index === 0) return; // stop if not looping
            isTyping = true;
            timer = setTimeout(type, typingSpeed);
          }
        }
      }
  
      type();
      return () => clearTimeout(timer);
    });
  </script>
  
  <div class={`font-mono ${font} font-semibold`}>
    {displayedText}
    <span class="inline-block w-2 h-6 bg-cyan-700 align-middle ml-1 animate-pulse"></span>
  </div>
  