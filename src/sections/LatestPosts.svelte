<script>
	import { onMount } from "svelte";
	import { api } from "../config.js";
	import { formatDate } from "../utils/format.js";
	import { router } from "../router.js";

	let posts = [];
	let loading = true;
	let error = null;
	export let category;
	onMount(async () => {
		try {
			let urlTo;
			if (category) {
				urlTo = `/posts?category=${category}`;
			} else {
				urlTo = `/posts?limit=6`;
			}
			const res = await fetch(api(urlTo));
			if (!res.ok) throw new Error("Failed to load posts");
			const json = await res.json();
			posts = json.data ?? [];
		} catch (e) {
			error = e.message;
		} finally {
			loading = false;
		}
	});

	const go = (e, slug) => {
		e.preventDefault();
		router.navigate(`/news/${slug}`);
	};
</script>

<section class="py-16 px-4 md:px-8 lg:px-16 bg-purple-50/50">
	<div class="max-w-7xl mx-auto">
		<div class="text-center mb-10">
			<div class="text-xs uppercase tracking-[0.3em] text-purple-600 mb-3">
				Newsroom
			</div>
			<h2 class="text-3xl md:text-4xl font-bold text-gray-900">
				Latest News & Updates
			</h2>
		</div>

		{#if loading}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each Array(3) as _}
					<div
						class="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse"
					>
						<div class="hidden md:block w-full h-48 bg-gray-200"></div>
						<div class="p-6 space-y-3">
							<div class="h-3 bg-gray-200 rounded w-1/3"></div>
							<div class="h-5 bg-gray-200 rounded w-full"></div>
							<div class="h-3 bg-gray-200 rounded w-2/3"></div>
						</div>
					</div>
				{/each}
			</div>
		{:else if error}
			<p class="text-center text-gray-500">Could not load posts: {error}</p>
		{:else if posts.length === 0}
			<p class="text-center text-gray-500">No posts yet — check back soon.</p>
		{:else}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each posts as p (p.id)}
					<article
						class="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
						on:click={() => router.navigate(`/news/${p.slug}`)}
						role="button"
						tabindex="0"
						on:keydown={(e) =>
							e.key === "Enter" && router.navigate(`/news/${p.slug}`)}
					>
						{#if p.cover_image_url}
							<div
								class="hidden md:block w-full h-48 overflow-hidden bg-purple-100"
							>
								<img
									src={p.cover_image_url}
									alt={p.title}
									class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
									loading="lazy"
								/>
							</div>
						{/if}
						<div class="p-6 flex-1 flex flex-col">
							<div class="flex items-center gap-2 text-xs text-gray-500 mb-2">
								{#if p.category}
									<span
										class="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-semibold uppercase tracking-wide"
										>{p.category}</span
									>
								{/if}
								<span>{formatDate(p.published_at)}</span>
							</div>
							<h3
								class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-700 transition-colors"
							>
								{p.title}
							</h3>
							{#if p.excerpt}
								<p class="text-sm text-gray-600 line-clamp-3 flex-1">
									{p.excerpt}
								</p>
							{/if}
							<span
								class="mt-4 text-purple-600 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all"
							>
								Read more
								<svg
									class="w-4 h-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M14 5l7 7m0 0l-7 7m7-7H3"
									/></svg
								>
							</span>
						</div>
					</article>
				{/each}
			</div>

			<div class="text-center mt-10">
				<a
					href="/news"
					on:click={(e) => {
						
						router.navigate("/news");
					}}
					class="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
				>
					View All News
				</a>
			</div>
		{/if}
	</div>
</section>

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
