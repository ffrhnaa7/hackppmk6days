/*
  # Create Event RSVP System

  1. New Tables
    - `event_rsvps`
      - `id` (uuid, primary key)
      - `event_id` (uuid, foreign key to events)
      - `user_id` (uuid, foreign key to auth.users)
      - `status` (text: 'attending', 'maybe', 'not_attending')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `event_rsvps` table
    - Add policies for authenticated users to manage their own RSVPs
    - Add policy for reading RSVP counts

  3. Functions
    - Function to get RSVP counts for events
    - Trigger to update event participant counts
*/

-- Create event_rsvps table
CREATE TABLE IF NOT EXISTS event_rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status text CHECK (status IN ('attending', 'maybe', 'not_attending')) DEFAULT 'attending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(event_id, user_id)
);

-- Enable RLS
ALTER TABLE event_rsvps ENABLE ROW LEVEL SECURITY;

-- Policies for event_rsvps
CREATE POLICY "Users can manage their own RSVPs"
  ON event_rsvps
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can read RSVP counts"
  ON event_rsvps
  FOR SELECT
  TO authenticated
  USING (true);

-- Function to get RSVP counts
CREATE OR REPLACE FUNCTION get_event_rsvp_counts(event_uuid uuid)
RETURNS TABLE (
  attending_count bigint,
  maybe_count bigint,
  total_count bigint
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) FILTER (WHERE status = 'attending') as attending_count,
    COUNT(*) FILTER (WHERE status = 'maybe') as maybe_count,
    COUNT(*) as total_count
  FROM event_rsvps 
  WHERE event_id = event_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update event participant counts
CREATE OR REPLACE FUNCTION update_event_participant_count()
RETURNS TRIGGER AS $$
BEGIN
  -- Update the events table with new participant count
  UPDATE events 
  SET participants = (
    SELECT COUNT(*) 
    FROM event_rsvps 
    WHERE event_id = COALESCE(NEW.event_id, OLD.event_id) 
    AND status = 'attending'
  )
  WHERE id = COALESCE(NEW.event_id, OLD.event_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically update participant counts
DROP TRIGGER IF EXISTS update_event_participants_trigger ON event_rsvps;
CREATE TRIGGER update_event_participants_trigger
  AFTER INSERT OR UPDATE OR DELETE ON event_rsvps
  FOR EACH ROW
  EXECUTE FUNCTION update_event_participant_count();

-- Add updated_at trigger for event_rsvps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_event_rsvps_updated_at ON event_rsvps;
CREATE TRIGGER update_event_rsvps_updated_at
  BEFORE UPDATE ON event_rsvps
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
