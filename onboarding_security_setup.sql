-- Run this in your Supabase SQL Editor to ensure users can update their own data
-- and that the restaurants table is linked correctly.

-- Ensure profiles table has correct RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
TO authenticated 
USING (auth.uid() = id);

CREATE POLICY "Users can read their own profile" 
ON public.profiles 
FOR SELECT 
TO authenticated 
USING (auth.uid() = id);

-- Ensure restaurants table also has RLS (safety check)
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own restaurant" 
ON public.restaurants 
FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can manage their own restaurant" 
ON public.restaurants 
FOR ALL 
TO authenticated 
USING (auth.uid() = owner_id);
