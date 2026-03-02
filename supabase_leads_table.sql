-- Table for storing onboarding leads/requests
CREATE TABLE IF NOT EXISTS public.onboarding_leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    restaurant_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'onboarded', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS
ALTER TABLE public.onboarding_leads ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public lead form)
CREATE POLICY "Anyone can insert leads" ON public.onboarding_leads
    FOR INSERT WITH CHECK (true);

-- Only authenticated admins can view/update leads
CREATE POLICY "Admins can view leads" ON public.onboarding_leads
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can update leads" ON public.onboarding_lead
    FOR UPDATE USING (auth.role() = 'authenticated');
