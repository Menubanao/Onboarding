-- Create the restaurants table
CREATE TABLE IF NOT EXISTS public.restaurants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    restaurant_name TEXT NOT NULL,
    address TEXT,
    email TEXT,
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to manage only their own restaurant data
CREATE POLICY "Users can manage their own restaurant"
ON public.restaurants
FOR ALL
USING (owner_id = auth.uid())
WITH CHECK (owner_id = auth.uid());

-- Optional: If you want to automatically sync the user's email to the restaurant table
-- you could add a trigger, but for now we'll handle it via the frontend logic as requested.
