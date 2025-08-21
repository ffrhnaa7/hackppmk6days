/*
  # Create User Club Creation and Management System

  1. New Tables
    - `user_clubs`
      - `id` (uuid, primary key)
      - `name` (jsonb for ko/en names)
      - `description` (jsonb for ko/en descriptions)
      - `category` (text)
      - `creator_id` (uuid, foreign key to auth.users)
      - `member_count` (integer)
      - `established` (integer year)
      - `recruiting` (boolean)
      - `requirements` (jsonb for ko/en requirements)
      - `activities` (jsonb array for ko/en activities)
      - `cultural_guide` (jsonb for ko/en cultural guide)
      - `image` (text url)
      - `location` (text - Korea-based)
      - `contact_email` (text)
      - `social_media` (jsonb)
      - `status` (text: 'active', 'inactive', 'pending')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `club_applications`
      - `id` (uuid, primary key)
      - `club_id` (uuid, foreign key to user_clubs)
      - `applicant_id` (uuid, foreign key to auth.users)
      - `status` (text: 'pending', 'accepted', 'rejected')
      - `application_message` (text)
      - `admin_notes` (text)
      - `applied_at` (timestamp)
      - `reviewed_at` (timestamp)
      - `reviewed_by` (uuid, foreign key to auth.users)

    - `club_members`
      - `id` (uuid, primary key)
      - `club_id` (uuid, foreign key to user_clubs)
      - `user_id` (uuid, foreign key to auth.users)
      - `role` (text: 'creator', 'admin', 'member')
      - `joined_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for club creators to manage their clubs
    - Add policies for applicants to view their applications
    - Add policies for public viewing of active clubs

  3. Functions
    - Function to get club application counts
    - Function to get user's managed clubs
*/

-- Create user_clubs table
CREATE TABLE IF NOT EXISTS user_clubs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name jsonb NOT NULL,
  description jsonb NOT NULL,
  category text NOT NULL CHECK (category IN ('학술', '문화', '취미', '봉사', '종교', '체육', '학생회')),
  creator_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  member_count integer DEFAULT 1,
  established integer DEFAULT EXTRACT(YEAR FROM now()),
  recruiting boolean DEFAULT true,
  requirements jsonb,
  activities jsonb DEFAULT '[]'::jsonb,
  cultural_guide jsonb,
  image text,
  location text DEFAULT 'Korea',
  contact_email text,
  social_media jsonb DEFAULT '{}'::jsonb,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create club_applications table
CREATE TABLE IF NOT EXISTS club_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id uuid REFERENCES user_clubs(id) ON DELETE CASCADE NOT NULL,
  applicant_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  application_message text,
  admin_notes text,
  applied_at timestamptz DEFAULT now(),
  reviewed_at timestamptz,
  reviewed_by uuid REFERENCES auth.users(id),
  UNIQUE(club_id, applicant_id)
);

-- Create club_members table
CREATE TABLE IF NOT EXISTS club_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id uuid REFERENCES user_clubs(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role text DEFAULT 'member' CHECK (role IN ('creator', 'admin', 'member')),
  joined_at timestamptz DEFAULT now(),
  UNIQUE(club_id, user_id)
);

-- Enable RLS
ALTER TABLE user_clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE club_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE club_members ENABLE ROW LEVEL SECURITY;

-- Policies for user_clubs
CREATE POLICY "Anyone can view active clubs"
  ON user_clubs
  FOR SELECT
  TO authenticated
  USING (status = 'active');

CREATE POLICY "Club creators can manage their clubs"
  ON user_clubs
  FOR ALL
  TO authenticated
  USING (creator_id = auth.uid())
  WITH CHECK (creator_id = auth.uid());

-- Policies for club_applications
CREATE POLICY "Club creators can view applications to their clubs"
  ON club_applications
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_clubs 
      WHERE id = club_applications.club_id 
      AND creator_id = auth.uid()
    )
  );

CREATE POLICY "Club creators can update applications to their clubs"
  ON club_applications
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_clubs 
      WHERE id = club_applications.club_id 
      AND creator_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_clubs 
      WHERE id = club_applications.club_id 
      AND creator_id = auth.uid()
    )
  );

CREATE POLICY "Users can view their own applications"
  ON club_applications
  FOR SELECT
  TO authenticated
  USING (applicant_id = auth.uid());

CREATE POLICY "Users can create applications"
  ON club_applications
  FOR INSERT
  TO authenticated
  WITH CHECK (applicant_id = auth.uid());

-- Policies for club_members
CREATE POLICY "Anyone can view club members"
  ON club_members
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Club creators can manage members"
  ON club_members
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_clubs 
      WHERE id = club_members.club_id 
      AND creator_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_clubs 
      WHERE id = club_members.club_id 
      AND creator_id = auth.uid()
    )
  );

-- Function to automatically add creator as member
CREATE OR REPLACE FUNCTION add_creator_as_member()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO club_members (club_id, user_id, role)
  VALUES (NEW.id, NEW.creator_id, 'creator');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to add creator as member
DROP TRIGGER IF EXISTS add_creator_as_member_trigger ON user_clubs;
CREATE TRIGGER add_creator_as_member_trigger
  AFTER INSERT ON user_clubs
  FOR EACH ROW
  EXECUTE FUNCTION add_creator_as_member();

-- Function to update member count
CREATE OR REPLACE FUNCTION update_club_member_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE user_clubs 
  SET member_count = (
    SELECT COUNT(*) 
    FROM club_members 
    WHERE club_id = COALESCE(NEW.club_id, OLD.club_id)
  )
  WHERE id = COALESCE(NEW.club_id, OLD.club_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update member count
DROP TRIGGER IF EXISTS update_club_member_count_trigger ON club_members;
CREATE TRIGGER update_club_member_count_trigger
  AFTER INSERT OR DELETE ON club_members
  FOR EACH ROW
  EXECUTE FUNCTION update_club_member_count();

-- Function to handle accepted applications
CREATE OR REPLACE FUNCTION handle_accepted_application()
RETURNS TRIGGER AS $$
BEGIN
  -- If application is accepted, add user as member
  IF NEW.status = 'accepted' AND OLD.status = 'pending' THEN
    INSERT INTO club_members (club_id, user_id, role)
    VALUES (NEW.club_id, NEW.applicant_id, 'member')
    ON CONFLICT (club_id, user_id) DO NOTHING;
    
    NEW.reviewed_at = now();
    NEW.reviewed_by = auth.uid();
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for accepted applications
DROP TRIGGER IF EXISTS handle_accepted_application_trigger ON club_applications;
CREATE TRIGGER handle_accepted_application_trigger
  BEFORE UPDATE ON club_applications
  FOR EACH ROW
  EXECUTE FUNCTION handle_accepted_application();

-- Function to get user's managed clubs
CREATE OR REPLACE FUNCTION get_user_managed_clubs(user_uuid uuid)
RETURNS TABLE (
  club_id uuid,
  club_name jsonb,
  member_count integer,
  pending_applications bigint,
  status text,
  created_at timestamptz
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    uc.id as club_id,
    uc.name as club_name,
    uc.member_count,
    COUNT(ca.id) FILTER (WHERE ca.status = 'pending') as pending_applications,
    uc.status,
    uc.created_at
  FROM user_clubs uc
  LEFT JOIN club_applications ca ON uc.id = ca.club_id
  WHERE uc.creator_id = user_uuid
  GROUP BY uc.id, uc.name, uc.member_count, uc.status, uc.created_at
  ORDER BY uc.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add updated_at triggers
DROP TRIGGER IF EXISTS update_user_clubs_updated_at ON user_clubs;
CREATE TRIGGER update_user_clubs_updated_at
  BEFORE UPDATE ON user_clubs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
