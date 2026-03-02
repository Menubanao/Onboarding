// SUPABASE CLIENT v2.0 (SILENT PRODUCTION)
const supabaseUrl = 'https://vuqvokufivgtevpvppcd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1cXZva3VmaXZndGV2cHZwcGNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMTgyNzAsImV4cCI6MjA4NzU5NDI3MH0.VJ7m8CUBexVdJRinN82Bor3IEM4JEqadE0Rm1_IyvfE';

function initSupabase() {
    if (typeof supabase === 'undefined') {
        process.env.NODE_ENV !== 'production' && console.error("❌ Supabase library missing.");
        return null;
    }
    return supabase.createClient(supabaseUrl, supabaseAnonKey);
}

// Global exposure for the app logic
window.sbClient = initSupabase();
