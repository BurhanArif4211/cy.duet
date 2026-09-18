<script>
	import { onMount } from "svelte";
	import { identity } from "../stores/identity.js";
	// Props
	export let duration = 500; // ms to show before fading
	export let fadeDuration = 2000; // ms for fade-out transition
	//   export let text = 'Requion LTD';     // fallback text if logo missing

	let visible = true;
	let fadingOut = false;

	onMount(() => {
		const fadeTimer = setTimeout(() => {
			fadingOut = true; // start CSS opacity transition
		}, duration);

		const hideTimer = setTimeout(() => {
			visible = false; // remove from DOM after fade completes
		}, duration + fadeDuration);

		return () => {
			clearTimeout(fadeTimer);
			clearTimeout(hideTimer);
		};
	});
</script>

{#if visible}
	<div
		class="fixed inset-0 z-9999 flex items-center justify-center bg-white transition-opacity duration-[2s] ease-out"
		class:opacity-0={fadingOut}
		aria-hidden={!visible}
	>
		<!-- Pulsing accent ring -->
		<div
			class="absolute w-24 h-24 md:w-42 md:h-42 sm:w-62 sm:h-62 rounded-full border-2 border-[#4B338C]/30 animate-ping"
		></div>
		<div
			class="absolute w-24 h-24 md:w-42 md:h-42 sm:w-62 sm:h-62 rounded-full border border-[#4B338C]/50"
		></div>

		<!-- Logo -->
		<div class="relative z-10 flex flex-col items-center gap-4">
			{#if $identity.site_logo_url}
				<img
					src="/favicon.ico"
					alt={"loading Please Wait..."}
					class="w-24 h-24 md:w-32 md:h-32 sm:w-52 sm:h-52 object-contain drop-shadow-lg"
					on:error={(e) => (e.currentTarget.style.display = "none")}
				/>
			{/if}
			<!-- {#if text}
        <span class="text-white/80 font-mono text-sm sm:text-base tracking-widest">{text}</span>
      {/if} -->
		</div>
	</div>
{/if}
