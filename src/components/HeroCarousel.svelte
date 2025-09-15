<!-- HeroCarousel.svelte -->
<script>
    import { onMount, onDestroy } from 'svelte';
    
    export let slides = [];
    let currentSlide = 0;
    let intervalId;
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    }
    
    function goToSlide(index) {
        currentSlide = index;
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

<section class="relative w-full h-[70vh] md:h-screen overflow-hidden ">
    {#each slides as slide, index}
        <div class={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
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
    
    <!-- Navigation arrows -->
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <button onclick={prevSlide} class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#00000030] bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
    </button>
    
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <button onclick={nextSlide} class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#0000001d] bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
    </button>
    
    <!-- Indicator dots -->
    <div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {#each slides as _, index}
            <button 
                onclick={() => goToSlide(index)}
                class={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-gray-400'}`}
                aria-label={`Go to slide ${index + 1}`}
            ></button>
        {/each}
    </div>
</section>