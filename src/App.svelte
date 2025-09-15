<script>
    import { onMount } from "svelte";
    import { router } from "./router";
    import Navbar from "./components/Navbar.svelte";
    import Footer from "./components/Footer.svelte";
    import StatusBar from "./components/StatusBar.svelte";
    import HomePage from "./page/HomePage.svelte";
    import { RestURL } from "./main";
    
    const navData = {
        logo: {
            src: `${RestURL}/wp/wp-content/uploads/2025/09/duet_logo-300x227-1.png`,
            alt: "DUET logo",
            text: "Cyber Security",
        },
        
        menuItems: [

            { text: "Home", href: "/", current: true },
            {
                text: "Faculty",
                href: "/faculty",
                // children: [
                //     { text: "Professors", href: "/posts/professors" },
                //     { text: "Staff", href: "/posts/staff" },
                //     { text: "Researchers", href: "/posts/research" },
                // ],
            },
            {
                text: "Programs",
                href: "",
                children: [
                    { text: "Undergraduate", href: "/posts/undergraduate-program" },
                    { text: "Graduate", href: "/posts/graduate-program" },
                    { text: "Certificates", href: "/posts/certificates-program" },
                ],
            },
            {
                text: "Research",
                href: "",
                children: [
                    { text: "Areas", href: "/posts/research-areas" },
                    { text: "Labs", href: "/posts/research-labs" },
                    { text: "Publications", href: "/posts/research-publications" },
                ],
            },
            { text: "About", href: "/posts/about" },
            { text: "News & Events", href: "/posts"},
            { text: "Resources", href: "/posts/resources"},
            { text: "Contact", href: "/contact"},
        ],
    };
    // Hardcoded footer data
    const footerData = {
        department: "Department of Cyber Security",
        address:
            "Dawood University of Engineering & Technology, Block 17 Gulshan-e-Iqbal, Karachi, Sindh, Pakistan, (75300).",
        // phone: "placeholder",
        email: "cy@duet.edu.pk",
        quickLinks: [
            { text: "About Us", href: "/about" },
            { text: "Programs", href: "/programs" },
            { text: "Admissions", href: "/admissions" },
            { text: "Research", href: "/research" },
        ],
        socialMedia: [
            { platform: "Facebook", href: "#", icon: "facebook" },
            { platform: "Twitter", href: "#", icon: "twitter" },
            { platform: "LinkedIn", href: "#", icon: "linkedin" },
            { platform: "Instagram", href: "#", icon: "instagram" },
        ],
    };
    let currentComponent = null;
    let routeParams = {};
    let routeData = null;
    let loading = true;
    onMount(() => {
        // Initialize router
        router.init();

        // Subscribe to router changes
        const unsubscribe = router.subscribe((value) => {
            currentComponent = value.component;
            routeParams = value.params;
            routeData = value.routeData;
            loading = value.loading;
        });

        return unsubscribe;
    });
</script>

<svelte:head>
    <title>Department of Cyber Security</title>
    <meta
        name="description"
        content="Leading cybersecurity education and research"
    />
</svelte:head>

<div class="fixed z-100 w-full">
    <StatusBar />
</div>
<div class="min-h-screen flex flex-col">
    <Navbar data={navData} />
    <main class="flex-grow">
        <div class="h-[104px] sm:h-[136px]"></div><!--This is spacer to add space after navbar-->

        {#if loading}
            <div class="flex justify-center items-center h-64">
                <div
                    class="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"
                ></div>
            </div>
        {:else if currentComponent}
            <svelte:component
                this={currentComponent}
                params={routeParams}
                data={routeData}
            />
        {/if}
    </main>
    <Footer data={footerData} />
    <div class="bg-gray-900 text-green-300 text-center px-3">Developed With ❤️ By <a class="underline" target="_blank" href="https://linkedin.com/in/that-burhan">Burhan Arif</a></div>
</div>


