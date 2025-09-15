<!-- HeroCarousel.svelte -->
<script>
  import { onMount, onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';

  export let slides = [];
  export let autoplay = true;
  export let interval = 5000;     // ms between slides
  export let duration = 600;      // transition duration in ms

  let currentSlide = 0;
  let timer;

  // Lock so we don't spam navigation while transitioning
  let isTransitioning = false;

  function startTimer() {
    clearInterval(timer);
    if (autoplay && slides.length > 1) {
      timer = setInterval(() => nextSlide(), interval);
    }
  }

  function resetTimer() {
    clearInterval(timer);
    startTimer();
  }

  function nextSlide() {
    if (isTransitioning || slides.length <= 1) return;
    isTransitioning = true;
    currentSlide = (currentSlide + 1) % slides.length;
    resetTimer();
  }

  function prevSlide() {
    if (isTransitioning || slides.length <= 1) return;
    isTransitioning = true;
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    resetTimer();
  }

  function goToSlide(i) {
    if (isTransitioning || i === currentSlide) return;
    isTransitioning = true;
    currentSlide = i;
    resetTimer();
  }

  onMount(() => {
    startTimer();
  });

  onDestroy(() => {
    clearInterval(timer);
  });

  // called from transition end handlers below
  function onTransitionEnd() {
    isTransitioning = false;
  }
</script>

<section class="relative w-full h-[70vh] md:h-screen overflow-hidden">
  <!-- Only render the active slide using a keyed block.
       This avoids overlapping elements and z-index races. -->
  {#if slides.length}
    {#key currentSlide}
      <div
        class="absolute inset-0 flex items-stretch"
        transition:fade={{ duration }}
        on:introend={onTransitionEnd}
        on:outroend={onTransitionEnd}
        >
        <img src={slides[currentSlide].image}
             alt={slides[currentSlide].headline}
             class="w-full h-full object-cover" />

        <!-- dim overlay -->
        <div class="absolute inset-0 bg-black/40"></div>

        <!-- centered content -->
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="text-center text-white px-4 max-w-3xl">
            <h2 class="text-3xl md:text-5xl font-bold mb-4 drop-shadow-md">
              {slides[currentSlide].headline}
            </h2>
            {#if slides[currentSlide].subtext}
              <p class="text-lg md:text-2xl mb-6 drop-shadow-md">
                {slides[currentSlide].subtext}
              </p>
            {/if}
            {#if slides[currentSlide].url}
              <a href={slides[currentSlide].url}
                 class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                Learn More
              </a>
            {/if}
          </div>
        </div>
      </div>
    {/key}
  {/if}

  <!-- arrows -->
  <button
    on:click={prevSlide}
    class="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 hover:bg-black/50 text-white focus:outline-none z-20"
    aria-label="Previous slide"
  >
    <!-- left chevron -->
    <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
    </svg>
  </button>

  <button
    on:click={nextSlide}
    class="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 hover:bg-black/50 text-white focus:outline-none z-20"
    aria-label="Next slide"
  >
    <!-- right chevron -->
    <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
    </svg>
  </button>

  <!-- dots -->
  <div class="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
    {#each slides as _, i}
      <!-- svelte-ignore element_invalid_self_closing_tag -->
      <button
        on:click={() => goToSlide(i)}
        class="rounded-full transition-all duration-200 focus:outline-none"
        aria-label={`Go to slide ${i + 1}`}
        style="width: {i === currentSlide ? '2rem' : '0.6rem'}; height: 0.6rem; background: {i === currentSlide ? 'white' : '#9CA3AF'}"
      />
    {/each}
  </div>
</section>

<style>
  /* minimal styles — most styling is done with utility classes above */
  .drop-shadow-md {
    text-shadow: 0 1px 4px rgba(0,0,0,0.6);
  }
</style>
