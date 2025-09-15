<!-- HodSection.svelte -->
<script>
    import { RestURL } from './../main.js';

    export let info = {};
</script>

<section style={`background: url('${RestURL}/wp/wp-content/uploads/2025/09/typing1.jpeg')`} class={`py-16 px-4 md:px-8 lg:px-16 `}>
    <div class="backdrop-blur-2xl rounded-3xl max-w-7xl mx-auto p-8">
        <h2 class="text-3xl font-bold text-white mb-8 text-center">Message from the Head of Department</h2>
        
        <div class="flex flex-col md:flex-row items-center gap-8">
            <div class="w-full md:w-1/3 flex justify-center">
                <div class="w-64 h-64 rounded-full overflow-hidden border-4 border-cyan-600 shadow-lg">
                    <img src={info.hod_image} alt={info.hod_name} class="w-full h-full object-cover" />
                </div>
            </div>
            
            <div class="w-full md:w-2/3">
                <h3 class="text-2xl font-semibold text-cyan-200 mb-2">{info.hod_name}</h3>
                <p class="text-white mb-6 leading-relaxed">{info.hod_message}</p>
                
                <div class="flex items-center">
                    <svg class="w-5 h-5 text-cyan-100 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    <a href={`mailto:${info.hod_email}`} class="text-cyan-600 hover:text-cyan-800">
                        {info.hod_email}
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>