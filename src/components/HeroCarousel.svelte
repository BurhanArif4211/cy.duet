<!-- HeroCarousel.svelte -->
<script>
  import { onMount, onDestroy } from 'svelte';
  
  export let slides = [];
  
  let currentSlide = 0;
  let intervalId;
  let isTransitioning = false;
  let direction = 'next'; // Track slide direction for animations
  
  // Reset and restart the auto-advance timer
  function resetTimer() {
    clearInterval(intervalId);
    intervalId = setInterval(nextSlide, 5000);
  }
  
  function nextSlide() {
    if (isTransitioning) return;
    
    isTransitioning = true;
    direction = 'next';
    currentSlide = (currentSlide + 1) % slides.length;
    
    // Reset transition lock after animation completes
    setTimeout(() => {
      isTransitioning = false;
    }, 1000);
    
    resetTimer();
  }
  
  function prevSlide() {
    if (isTransitioning) return;
    
    isTransitioning = true;
    direction = 'prev';
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    
    // Reset transition lock after animation completes
    setTimeout(() => {
      isTransitioning = false;
    }, 1000);
    
    resetTimer();
  }
  
  function goToSlide(index) {
    if (isTransitioning || index === currentSlide) return;
    
    isTransitioning = true;
    direction = index > currentSlide ? 'next' : 'prev';
    currentSlide = index;
    
    // Reset transition lock after animation completes
    setTimeout(() => {
      isTransitioning = false;
    }, 1000);
    
    resetTimer();
  }
  
  onMount(() => {
    // Auto-advance slides every 5 seconds
    intervalId = setInterval(nextSlide, 5000);
    
    return () => {
      clearInterval(intervalId);
    };
  });
  
  onDestroy(() => {
    clearInterval(intervalId);
  });
</script>

<section class="relative w-full h-[70vh] md:h-screen overflow-hidden">
  <div class="relative w-full h-full">
    {#each slides as slide, index}
      <div 
        class="absolute inset-0 transition-transform duration-1000 ease-in-out"
        class:translate-x-0={index === currentSlide}
        class:translate-x-full={index > currentSlide || (index === 0 && currentSlide === slides.length - 1 && direction === 'next')}
        class:-translate-x-full={index < currentSlide || (index === slides.length - 1 && currentSlide === 0 && direction === 'prev')}
      >
        <img src={slide.image} alt={slide.headline} class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-[#00000053]"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="text-center text-white px-4 max-w-3xl">
            <h2 class="text-4xl md:text-5xl text-shadow-2xs font-bold mb-4">{slide.headline}</h2>
            <p class="text-xl md:text-2xl text-shadow-2xs mb-8">{slide.subtext}</p>
            <a href={slide.url} class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
              Learn More
            </a>
          </div>
        </div>
      </div>
    {/each}
  </div>
  
  <!-- Navigation arrows -->
  <button 
    on:click={prevSlide} 
    class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#00000030] text-white p-3 rounded-full hover:bg-[#00000060] focus:outline-none transition-colors"
    aria-label="Previous slide"
  >
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
    </svg>
  </button>
  
  <button 
    on:click={nextSlide} 
    class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#00000030] text-white p-3 rounded-full hover:bg-[#00000060] focus:outline-none transition-colors"
    aria-label="Next slide"
  >
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
    </svg>
  </button>
  
  <!-- Indicator dots -->
  <div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
    {#each slides as _, index}
      <button 
        on:click={() => goToSlide(index)}
        class={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white w-8' : 'bg-gray-400 hover:bg-gray-300'}`}
        aria-label={`Go to slide ${index + 1}`}
      ></button>
    {/each}
  </div>
</section>

<style>
  /* Custom animation for slide transitions */
  .translate-x-full {
    transform: translateX(100%);
  }
  
  .-translate-x-full {
    transform: translateX(-100%);
  }
  
  .translate-x-0 {
    transform: translateX(0);
    z-index: 10;
  }
  
  /* Text shadow for better readability */
  .text-shadow-2xs {
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
  }
</style>