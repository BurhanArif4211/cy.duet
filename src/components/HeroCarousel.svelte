<script>
	import { onMount, onDestroy } from "svelte";
	import { resolveLink } from "../utils/format.js";

	export let slides = [];
	let currentSlide = 0;
	let intervalId;
	let isTransitioning = false;
	let direction = "next";

	function resetTimer() {
		clearInterval(intervalId);
		if (slides.length > 1) intervalId = setInterval(nextSlide, 5500);
	}

	function nextSlide() {
		if (isTransitioning || slides.length < 2) return;
		isTransitioning = true;
		direction = "next";
		currentSlide = (currentSlide + 1) % slides.length;
		setTimeout(() => {
			isTransitioning = false;
		}, 900);
		resetTimer();
	}

	function prevSlide() {
		if (isTransitioning || slides.length < 2) return;
		isTransitioning = true;
		direction = "prev";
		currentSlide = (currentSlide - 1 + slides.length) % slides.length;
		setTimeout(() => {
			isTransitioning = false;
		}, 900);
		resetTimer();
	}

	function goToSlide(i) {
		if (isTransitioning || i === currentSlide) return;
		isTransitioning = true;
		direction = i > currentSlide ? "next" : "prev";
		currentSlide = i;
		setTimeout(() => {
			isTransitioning = false;
		}, 900);
		resetTimer();
	}

	onMount(() => {
		if (slides.length > 1) intervalId = setInterval(nextSlide, 5500);
		return () => clearInterval(intervalId);
	});
	onDestroy(() => clearInterval(intervalId));
</script>

{#if slides.length === 0}
	<section
		class="relative w-full h-[60vh] md:h-[80vh] bg-gradient-to-br from-purple-800 via-[#4B338C] to-purple-900 flex items-center justify-center text-white"
	>
		<div class="text-center px-4">
			<div class="text-xs uppercase tracking-[0.3em] text-purple-300 mb-4">
				Department of
			</div>
			<h1 class="text-4xl md:text-6xl font-bold mb-3">Cyber Security</h1>
			<p class="text-lg md:text-xl text-purple-200 italic">
				the university of relevance
			</p>
		</div>
	</section>
{:else}
	<section
		class="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-black"
	>
		<div class="relative w-full h-full">
			{#each slides as slide, i (slide.id ?? i)}
				<div
					class="absolute inset-0 transition-transform duration-700 ease-out will-change-transform"
					class:translate-x-0={i === currentSlide}
					class:translate-x-full={i > currentSlide}
					class:-translate-x-full={i < currentSlide}
				>
					{#if slide.image_url}
						<img
							src={slide.image_url}
							alt={slide.headline}
							class="w-full h-full object-cover"
							loading={i === 0 ? "eager" : "lazy"}
						/>
					{:else}
						<div
							class="w-full h-full bg-gradient-to-br from-purple-800 to-purple-950"
						></div>
					{/if}
					<div
						class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30"
					></div>

					<div class="absolute inset-0 flex items-center justify-center">
						<div class="text-center text-white px-6 max-w-3xl">
							<h2
								class="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg"
							>
								{slide.headline}
							</h2>
							{#if slide.subtext}
								<p
									class="text-lg sm:text-xl md:text-2xl text-purple-100 mb-8 drop-shadow"
								>
									{slide.subtext}
								</p>
							{/if}
							{#if slide.link_url}
								<a
									href={resolveLink(slide.link_url)}
									class="inline-block bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg"
								>
									Explore
								</a>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>

		{#if slides.length > 1}
			<!--		<button
				on:click={prevSlide}
				aria-label="Previous"
				class="hidden md:absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2.5 sm:p-3 rounded-full backdrop-blur-sm transition-colors"
			>
				<svg
					class="w-5 h-5 sm:w-6 sm:h-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 19l-7-7 7-7"
					/></svg
				>
			</button>
			<button
				on:click={nextSlide}
				aria-label="Next"
				class="sm:hidden lg:absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2.5 sm:p-3 rounded-full backdrop-blur-sm transition-colors"
			>
				<svg
					class="w-5 h-5 sm:w-6 sm:h-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 5l7 7-7 7"
					/></svg
				>
			</button>-->

			<div class="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
				{#each slides as _, i}
					<button
						on:click={() => goToSlide(i)}
						aria-label={`Slide ${i + 1}`}
						class="h-2 rounded-full transition-all duration-300 {i ===
						currentSlide
							? 'w-8 bg-white'
							: 'w-2 bg-white/50 hover:bg-white/80'}"
					></button>
				{/each}
			</div>
		{/if}
	</section>
{/if}
