<!-- Footer.svelte -->
<script>
    export let data;
</script>

<footer class="bg-gray-900 text-white py-12 px-4 md:px-8 lg:px-16">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Department Info -->
        <div>
            <h3 class="text-xl font-bold mb-4">{data.department}</h3>
            <p class="text-gray-400 mb-4">{data.address}</p>
            <p class="text-gray-400 mb-2">
                <svg class="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                {data.phone}
            </p>
            <p class="text-gray-400">
                <svg class="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <a href={`mailto:${data.email}`} class="hover:text-cyan-400">{data.email}</a>
            </p>
        </div>
        
        <!-- Quick Links -->
        <div>
            <h3 class="text-xl font-bold mb-4">Quick Links</h3>
            <ul class="space-y-2">
                {#each data.quickLinks as link}
                    <li>
                        <a href={link.href} class="text-gray-400 hover:text-cyan-400 transition-colors">{link.text}</a>
                    </li>
                {/each}
            </ul>
        </div>
        
        <!-- Programs -->
        <div>
            <h3 class="text-xl font-bold mb-4">Programs</h3>
            <ul class="space-y-2">
                <li><a href="#" class="text-gray-400 hover:text-cyan-400 transition-colors">Programs</a></li>
                <li><a href="#" class="text-gray-400 hover:text-cyan-400 transition-colors">Certificates</a></li>
                <li><a href="#" class="text-gray-400 hover:text-cyan-400 transition-colors">Online Learning</a></li>
            </ul>
        </div>
        
        <!-- Connect With Us -->
        <div>
            <h3 class="text-xl font-bold mb-4">Connect With Us</h3>
            <div class="flex space-x-4 mb-6">
                {#each data.socialMedia as social}
                    <a href={social.href} class="bg-gray-800 hover:bg-cyan-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                        <span class="sr-only">{social.platform}</span>
                        <!-- In a real implementation, you would use proper icons here -->
                        <span class="font-bold text-sm">{social.icon.charAt(0)}</span>
                    </a>
                {/each}
            </div>

        </div>
    </div>
    
    <div class="max-w-7xl mx-auto border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} DUET Department of Cyber Security. All rights reserved.</p>
    </div>
</footer>