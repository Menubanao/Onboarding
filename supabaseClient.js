// SUPABASE CLIENT v1.9 (EMERGENCY BACKUP EDITION)
const supabaseUrl = 'https://vuqvokufivgtevpvppcd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1cXZva3VmaXZndGV2cHZwcGNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMTgyNzAsImV4cCI6MjA4NzU5NDI3MH0.VJ7m8CUBexVdJRinN82Bor3IEM4JEqadE0Rm1_IyvfE';

function initSupabase() {
    console.log("Supabase DEBUG: v1.9 Initializing...");
    if (typeof supabase === 'undefined') {
        const errorMsg = "❌ ERROR: Supabase library failed to load from CDN. Your internet is blocking the library itself!";
        console.error(errorMsg);
        alert(errorMsg);
        return null;
    }
    return supabase.createClient(supabaseUrl, supabaseAnonKey);
}

window.sbClient = initSupabase();

async function runEmergencyDiagnostic() {
    const statusBanner = document.getElementById('conn-status');
    if (!statusBanner) return;

    try {
        // Test direct fetch
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

        const res = await fetch(`${supabaseUrl}/auth/v1/health`, {
            method: 'GET',
            mode: 'no-cors',
            signal: controller.signal
        });

        statusBanner.innerText = "ONLINE ✅";
        statusBanner.className = "px-3 py-1 bg-green-500 text-white text-[10px] rounded-full font-bold shadow-lg animate-pulse";
        console.log("🌐 Supabase is Reachable!");
    } catch (e) {
        statusBanner.innerHTML = `BLOCK DETECTED ❌ <button onclick="window.open('${supabaseUrl}/rest/v1/', '_blank')" class="ml-2 underline text-[8px] font-black">TEST LINK</button>`;
        statusBanner.className = "px-3 py-1 bg-red-600 text-white text-[10px] rounded-full font-bold shadow-lg cursor-pointer";

        // Final desperate attempt: Show unblocker instructions
        if (!document.getElementById('emergency-modal')) {
            const modal = document.createElement('div');
            modal.id = 'emergency-modal';
            modal.className = "fixed inset-0 bg-black/80 backdrop-blur-md z-[10000] flex items-center justify-center p-4 animate-fadeIn";
            modal.innerHTML = `
                <div class="bg-white dark:bg-slate-900 w-full max-w-md p-8 rounded-3xl shadow-2xl border-2 border-red-500">
                    <h2 class="text-2xl font-black text-red-600 mb-4">Network Blocked!</h2>
                    <p class="text-sm text-slate-500 mb-6 leading-relaxed">
                        Your browser or internet provider is <b>REFUSING</b> to connect to Supabase. This is why the OTP is not coming.
                    </p>
                    <div class="space-y-4 mb-8">
                        <div class="flex items-start gap-3 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">
                            <span class="text-xl">📱</span>
                            <p class="text-xs"><b>Try this:</b> Connect to your <b>Mobile Hotspot</b> instead of your home WiFi.</p>
                        </div>
                        <div class="flex items-start gap-3 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">
                            <span class="text-xl">🛡️</span>
                            <p class="text-xs"><b>Try this:</b> Turn off <b>Brave Shields</b> or any <b>Adblocker</b>.</p>
                        </div>
                        <div class="flex items-start gap-3 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">
                            <span class="text-xl">🌐</span>
                            <p class="text-xs"><b>Try this:</b> Use an <b>Incognito Window</b> or a <b>VPN</b>.</p>
                        </div>
                    </div>
                    <button onclick="document.getElementById('emergency-modal').remove()" class="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl">GOT IT, I'LL TRY THESE</button>
                    <p class="text-center mt-4"><a href="${supabaseUrl}/rest/v1/" target="_blank" class="text-xs text-primary underline">Click here to see if Supabase loads</a></p>
                </div>
            `;
            document.body.appendChild(modal);
        }
    }
}

window.addEventListener('load', () => setTimeout(runEmergencyDiagnostic, 1000));
