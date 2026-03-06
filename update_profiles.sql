-- Run this in your Supabase SQL Editor to support the new onboarding fields
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS cafe_address TEXT;

-- Update the handle_new_user trigger to be more robust
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email TEXT;
