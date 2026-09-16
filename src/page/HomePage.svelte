<script>
	import { onMount } from "svelte";
	import { api } from "../config.js";
	import HeroCarousel from "../components/HeroCarousel.svelte";
	import HodSection from "../sections/HodSection.svelte";
	import LatestPosts from "../sections/LatestPosts.svelte";
	import TeachersSection from "../sections/Teachers.svelte";
	import TypewriterMulti from "../components/typo/TypewritterMulti.svelte";

	let slides = [],
		hod = null;

	onMount(async () => {
		const [slidesRes, hodRes] = await Promise.allSettled([
			fetch(api("/hero-slides")).then((r) => (r.ok ? r.json() : [])),
			fetch(api("/hod")).then((r) => (r.status === 404 ? null : r.json())),
		]);

		if (slidesRes.status === "fulfilled" && Array.isArray(slidesRes.value)) {
			slides = slidesRes.value;
		}
		if (hodRes.status === "fulfilled") {
			hod = hodRes.value;
		}
	});
</script>

<HeroCarousel {slides} />

<section
	class="bg-gradient-to-r from-[#4B338C] via-purple-800 to-[#4B338C] text-white"
>
	<div
		class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center gap-4"
	>
		<span class="text-purple-300 font-mono text-sm">cyber@duet:~$</span>
		<TypewriterMulti
			texts={[
				"securing the digital frontier",
				"training tomorrow's defenders",
				"research that matters",
				"trustable objective",
			]}
			font="text-sm  sm:text-lg max-h-[1.5rem]"
			cursorClass="bg-purple-300"
		/>
	</div>
</section>

<!-- Quick-highlight strip -->
<section class="bg-[#4B338C] text-white">
	<div
		class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center"
	>
		<div>
			<div class="text-3xl font-bold text-purple-200">1000+</div>
			<div class="text-sm text-purple-100/80 uppercase tracking-wider mt-1">
				Students
			</div>
		</div>
		<div>
			<div class="text-3xl font-bold text-purple-200">10+</div>
			<div class="text-sm text-purple-100/80 uppercase tracking-wider mt-1">
				Faculty & Researchers
			</div>
		</div>
		<div>
			<div class="text-3xl font-bold text-purple-200">5</div>
			<div class="text-sm text-purple-100/80 uppercase tracking-wider mt-1">
				Labs
			</div>
		</div>
	</div>
</section>

<HodSection info={hod} />
<LatestPosts />
<TeachersSection />
