// SUPABASE CLIENT v1.7 (PRO-DIAGNOSTIC)
// This file assumes supabase-js is loaded via <script> tag in HTML
const supabaseUrl = 'https://vuqvokufivgtevpvppcd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1cXZva3VmaXZndGV2cHZwcGNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMTgyNzAsImV4cCI6MjA4NzU5NDI3MH0.VJ7m8CUBexVdJRinN82Bor3IEM4JEqadE0Rm1_IyvfE';

function initSupabase() {
    console.log("Supabase DEBUG: v1.7 Initializing...");

    if (typeof supabase === 'undefined') {
        console.error("❌ CRITICAL: Supabase library not found. Check your Internet connection or CDN link.");
        return null;
    }

    try {
        const client = supabase.createClient(supabaseUrl, supabaseAnonKey);
        console.log("✅ Supabase Client Created.");
        return client;
    } catch (e) {
        console.error("❌ Failed to create Supabase client:", e);
        return null;
    }
}

// Global exposure
window.sbClient = initSupabase();

// Visibility / Connectivity Monitor
async function runConnectivityCheck() {
    const statusBanner = document.getElementById('conn-status');
    const hint = document.getElementById('network-hint');
    if (!statusBanner) return;

    try {
        // Fast ping to Supabase health endpoint
        const start = Date.now();
        const res = await fetch(`${supabaseUrl}/auth/v1/health`, {
            method: 'GET',
            mode: 'no-cors',
            cache: 'no-store'
        });
        const latency = Date.now() - start;

        statusBanner.innerText = `ONLINE (${latency}ms) ✅`;
        statusBanner.className = "px-3 py-1 bg-green-500 text-white text-[10px] rounded-full font-bold shadow-lg animate-pulse";
        if (hint) hint.classList.add('hidden');
        console.log("🌐 Network: Supabase API is reachable.");
    } catch (e) {
        statusBanner.innerText = "BLOCK DETECTED ❌";
        statusBanner.className = "px-3 py-1 bg-red-600 text-white text-[10px] rounded-full font-bold shadow-lg";
        if (hint) hint.classList.remove('hidden');
        console.error("🚫 Network: Supabase API is UNREACHABLE. This is likely due to Brave Shields or an Ad-blocker.", e);
    }
}

// Run diagnostic on load
window.addEventListener('load', () => {
    setTimeout(runConnectivityCheck, 600);
});
