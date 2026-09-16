<script>
	import { onMount } from "svelte";
	import { api } from "../config.js";
	import { settings } from "../stores/settings.js";
	import HodSection from "../sections/HodSection.svelte";
	import { STATIC } from "../config.js";
	import MultiLineTypewriter from "../components/typo/MultiTypeWriter.svelte";

	let hod = null;

	onMount(async () => {
		try {
			const res = await fetch(api("/hod"));
			if (res.ok) hod = await res.json();
		} catch {}
	});
</script>

<!-- Hero strip -->
<section
	class="bg-gradient-to-br from-[#4B338C] to-purple-900 text-white py-20 px-4"
>
	<div class="max-w-4xl mx-auto text-center">
		<div class="text-xs uppercase tracking-[0.3em] text-purple-300 mb-4">
			About
		</div>
		<h1 class="text-4xl md:text-5xl font-bold mb-4">
			Department of Cyber Security
		</h1>
		<p class="text-lg text-purple-200 italic">{STATIC.tagline}</p>
	</div>
</section>

<!-- About paragraph from settings -->
{#if $settings.about_department}
	<section class="py-16 px-4 md:px-8 lg:px-16 bg-white">
		<div class="max-w-4xl mx-auto">
			<div
				class="text-xs uppercase tracking-[0.3em] text-purple-600 mb-3 text-center"
			>
				Our Department
			</div>
			<h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">
				Who We Are
			</h2>
			<div class="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
				{$settings.about_department}
			</div>
		</div>
	</section>
{/if}
<section class="py-12 px-4 bg-[#0f0725]">
	<div class="max-w-4xl mx-auto">
		<div
			class="rounded-xl border border-purple-500/30 bg-black/40 backdrop-blur-sm p-6 font-mono text-sm shadow-[0_0_40px_-12px_rgba(139,92,246,0.6)]"
		>
			<div class="flex gap-2 mb-4">
				<span class="w-2.5 h-2.5 rounded-full bg-red-500/70"></span>
				<span class="w-2.5 h-2.5 rounded-full bg-yellow-500/70"></span>
				<span class="w-2.5 h-2.5 rounded-full bg-green-500/70"></span>
				<span class="ml-2 text-purple-300/60 text-xs">department.log</span>
			</div>

			<MultiLineTypewriter
				lines={[
					"$ whoami",
					"  → Department of Cyber Security, DUET Karachi",
					"$ cat mission.txt",
					"  → Produce world-class defenders of the digital domain.",
					"$ status --programs",
					"  → 4+ academic tracks · 5 research labs · 1000+ students",
				]}
				font="text-sm sm:text-base"
				activeLineClass="text-purple-100"
				idleLineClass="text-purple-300/40"
				cursorClass="bg-purple-300"
			/>
		</div>
	</div>
</section>
<!-- Mission / Vision -->
<!--<section class="py-16 px-4 md:px-8 lg:px-16 bg-purple-50">
	<div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
		<div class="bg-white rounded-xl p-7 shadow-sm border-t-4 border-purple-600">
			<div class="text-purple-600 mb-4">
				<svg
					class="w-10 h-10"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 2l3 7h7l-5.5 4.5L18.5 21 12 16.5 5.5 21l2-7.5L2 9h7l3-7z"
					/></svg
				>
			</div>
			<h3 class="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
			<p class="text-gray-600 leading-relaxed">
				To produce world-class cybersecurity professionals equipped with the
				technical depth and ethical grounding needed to defend the digital
				infrastructure of tomorrow.
			</p>
		</div>
		<div
			class="bg-white rounded-xl p-7 shadow-sm border-t-4 border-fuchsia-500"
		>
			<div class="text-fuchsia-500 mb-4">
				<svg
					class="w-10 h-10"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
					/><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
					/></svg
				>
			</div>
			<h3 class="text-xl font-bold text-gray-900 mb-3">Our Vision</h3>
			<p class="text-gray-600 leading-relaxed">
				To be the leading hub of cybersecurity education and research in
				Pakistan, recognized globally for innovation, industry collaboration,
				and academic excellence.
			</p>
		</div>
		<div class="bg-white rounded-xl p-7 shadow-sm border-t-4 border-purple-400">
			<div class="text-purple-400 mb-4">
				<svg
					class="w-10 h-10"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 12l2 2 4-4M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
					/></svg
				>
			</div>
			<h3 class="text-xl font-bold text-gray-900 mb-3">Our Values</h3>
			<p class="text-gray-600 leading-relaxed">
				Integrity, rigor, and curiosity. We believe security is not only a
				technical problem — it is a discipline of constant learning and
				responsibility.
			</p>
		</div>
	</div>
</section>
-->
<!-- HOD section -->
<HodSection info={hod} />
