// SUPABASE CLIENT v1.6 (DIAGNOSTIC EDITION)
// This file assumes supabase-js is loaded via <script> tag in HTML
const supabaseUrl = 'https://vuqvokufivgtevpvppcd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1cXZva3VmaXZndGV2cHZwcGNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMTgyNzAsImV4cCI6MjA4NzU5NDI3MH0.VJ7m8CUBexVdJRinN82Bor3IEM4JEqadE0Rm1_IyvfE';

function initSupabase() {
    console.log("Supabase DEBUG: Initializing Client...");
    if (typeof supabase === 'undefined') {
        console.error("❌ CRITICAL: Supabase library not found in window object.");
        return null;
    }
    try {
        const client = supabase.createClient(supabaseUrl, supabaseAnonKey);
        console.log("✅ Supabase Client Created Successfully.");
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
    if (!statusBanner) return;

    try {
        const start = Date.now();
        const res = await fetch(`${supabaseUrl}/auth/v1/health`, { method: 'GET', mode: 'no-cors' });
        const latency = Date.now() - start;

        statusBanner.innerText = `SUPABASE: ONLINE (${latency}ms) ✅`;
        statusBanner.className = "px-2 py-1 bg-green-600 text-white text-[10px] rounded-lg font-mono shadow-lg animate-pulse";
        console.log("🌐 Network: Supabase API is reachable.");
    } catch (e) {
        statusBanner.innerText = "SUPABASE: BLOCKED/OFFLINE ❌";
        statusBanner.className = "px-2 py-1 bg-red-600 text-white text-[10px] rounded-lg font-mono shadow-lg";
        console.error("🚫 Network: Supabase API is UNREACHABLE. Check Brave Shields/Firewall.", e);
    }
}

// Run check on load
window.addEventListener('load', () => {
    setTimeout(runConnectivityCheck, 500);
});
