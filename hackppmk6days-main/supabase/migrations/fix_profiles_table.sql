/*
  # Fix Profiles Table Structure and Policies

  1. Table Updates
    - Ensure all required columns exist with proper types
    - Add missing columns that the frontend expects
    - Fix any data type mismatches

  2. Security
    - Update RLS policies for proper profile management
    - Ensure users can read and update their own profiles
    - Add policy for profile creation

  3. Indexes
    - Add performance indexes for common queries
*/

-- First, let's ensure the profiles table has all the required columns
DO $$
BEGIN
  -- Add name column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'name'
  ) THEN
    ALTER TABLE profiles ADD COLUMN name text;
  END IF;

  -- Add email column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'email'
  ) THEN
    ALTER TABLE profiles ADD COLUMN email text;
  END IF;

  -- Add university column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'university'
  ) THEN
    ALTER TABLE profiles ADD COLUMN university text;
  END IF;

  -- Add academic_major column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'academic_major'
  ) THEN
    ALTER TABLE profiles ADD COLUMN academic_major text;
  END IF;

  -- Add year column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'year'
  ) THEN
    ALTER TABLE profiles ADD COLUMN year text;
  END IF;

  -- Add nationality column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'nationality'
  ) THEN
    ALTER TABLE profiles ADD COLUMN nationality text;
  END IF;

  -- Add cultural_background column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'cultural_background'
  ) THEN
    ALTER TABLE profiles ADD COLUMN cultural_background text;
  END IF;

  -- Add looking_for_cultural_exchange column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'looking_for_cultural_exchange'
  ) THEN
    ALTER TABLE profiles ADD COLUMN looking_for_cultural_exchange boolean DEFAULT true;
  END IF;

  -- Add preferred_language column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'preferred_language'
  ) THEN
    ALTER TABLE profiles ADD COLUMN preferred_language text DEFAULT 'en';
  END IF;

  -- Add language_level column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'language_level'
  ) THEN
    ALTER TABLE profiles ADD COLUMN language_level jsonb DEFAULT '{"korean": "intermediate", "english": "native"}'::jsonb;
  END IF;

  -- Add interests column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'interests'
  ) THEN
    ALTER TABLE profiles ADD COLUMN interests text[] DEFAULT '{}';
  END IF;

  -- Add points column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'points'
  ) THEN
    ALTER TABLE profiles ADD COLUMN points integer DEFAULT 0;
  END IF;

  -- Add level column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'level'
  ) THEN
    ALTER TABLE profiles ADD COLUMN level integer DEFAULT 1;
  END IF;

  -- Add streaks column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'streaks'
  ) THEN
    ALTER TABLE profiles ADD COLUMN streaks jsonb DEFAULT '{"eventAttendance": 0, "languageExchange": 0, "culturalEvents": 0}'::jsonb;
  END IF;

  -- Add privacy column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'privacy'
  ) THEN
    ALTER TABLE profiles ADD COLUMN privacy jsonb DEFAULT '{
      "profileVisibility": "university-only",
      "showRealName": true,
      "showUniversity": true,
      "showInterests": true,
      "showAvailability": false,
      "showLanguageLevel": true,
      "allowEventRecommendations": true,
      "allowDirectMessages": true
    }'::jsonb;
  END IF;

  -- Add ai_recommendations column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'ai_recommendations'
  ) THEN
    ALTER TABLE profiles ADD COLUMN ai_recommendations jsonb DEFAULT '{
      "enabled": true,
      "culturalDiversityPreference": "high",
      "eventTypes": ["cultural", "academic", "social"],
      "maxDistance": 10,
      "notificationFrequency": "weekly"
    }'::jsonb;
  END IF;

  -- Add updated_at column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE profiles ADD COLUMN updated_at timestamptz DEFAULT now();
  END IF;

END $$;

-- Ensure RLS is enabled
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to recreate them
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

-- Create comprehensive RLS policies
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add helpful indexes
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_university ON profiles(university);
CREATE INDEX IF NOT EXISTS idx_profiles_updated_at ON profiles(updated_at);
