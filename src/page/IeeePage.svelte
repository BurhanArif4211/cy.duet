<script>
	import { contactsBySection, contactHref } from "../stores/contact.js";
	import { settings } from "../stores/settings.js";
	import LatestPosts from "../sections/LatestPosts.svelte";
	$: ieee = $contactsBySection.IEEE ?? [];

	function iconFor(label) {
		const l = (label ?? "").toLowerCase();
		if (l === "instagram") return "instagram";
		if (l === "linkedin") return "linkedin";
		return "globe";
	}
</script>

<section
	class="bg-gradient-to-br from-[#4B338C] via-purple-800 to-[#2a1a5c] text-white py-20 px-4 relative overflow-hidden"
>
	<div
		class="absolute inset-0 opacity-[0.06] pointer-events-none"
		style="background-image:linear-gradient(#a78bfa 1px,transparent 1px),linear-gradient(90deg,#a78bfa 1px,transparent 1px);background-size:40px 40px;"
	></div>

	<div class="relative max-w-4xl mx-auto text-center">
		<div
			class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-300/30 mb-6"
		>
			<span class="w-1.5 h-1.5 rounded-full bg-purple-300 animate-pulse"></span>
			<span class="text-xs uppercase tracking-[0.3em] text-purple-200"
				>Society</span
			>
		</div>
		<h1 class="text-4xl md:text-5xl font-bold mb-4">IEEE Education Society</h1>
		<p class="text-lg text-purple-200 max-w-2xl mx-auto">
			Student Chapter · Advancing technology for humanity through education.
		</p>
	</div>
</section>

<div class="bg-gray-50 py-14 px-4 sm:px-6 lg:px-8">
	<div class="max-w-4xl mx-auto space-y-8">
		{#if $settings.ieee_description}
			<div
				class="bg-white rounded-2xl p-8 shadow-sm border-l-4 border-purple-600"
			>
				<h2 class="text-2xl font-bold text-gray-900 mb-4">About the Chapter</h2>
				<p class="text-gray-700 leading-relaxed whitespace-pre-line">
					{$settings.ieee_description}
				</p>
			</div>
		{/if}

		<div class="bg-white rounded-2xl p-8 shadow-sm">
			<h2 class="text-2xl font-bold text-gray-900 mb-6">Connect with IEEE</h2>

			{#if ieee.length === 0}
				<p class="text-gray-500 text-sm">Contact details coming soon.</p>
			{:else}
				<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
					{#each ieee as c (c.id)}
						<a
							href={contactHref(c)}
							target={c.type === "url" ? "_blank" : undefined}
							rel={c.type === "url" ? "noopener noreferrer" : undefined}
							class="group flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-all"
						>
							<div
								class="w-10 h-10 rounded-lg bg-purple-100 group-hover:bg-purple-600 flex items-center justify-center transition-colors"
							>
								{#if iconFor(c.label) === "instagram"}
									<svg
										class="w-5 h-5 text-purple-700 group-hover:text-white transition-colors"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
										/>
									</svg>
								{:else if iconFor(c.label) === "linkedin"}
									<svg
										class="w-5 h-5 text-purple-700 group-hover:text-white transition-colors"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
										/>
									</svg>
								{:else}
									<svg
										class="w-5 h-5 text-purple-700 group-hover:text-white transition-colors"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 010 18M12 3a15 15 0 000 18"
										/>
									</svg>
								{/if}
							</div>
							<div class="min-w-0">
								<div class="text-xs uppercase tracking-wider text-gray-500">
									{c.label}
								</div>
								<div class="text-sm font-medium text-gray-900 truncate">
									{c.value.replace(/^https?:\/\//, "").replace(/\/$/, "")}
								</div>
							</div>
						</a>
					{/each}
				</div>
			{/if}
			<h1>Latest News</h1>
			<LatestPosts category="IEEE" />
		</div>
	</div>
</div>
