-- Migration: Create patients table for Smart Memory
-- Story: 005-smart-memory-database.md
-- Date: 2026-02-19

-- Create patients table
CREATE TABLE IF NOT EXISTS patients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  doctor_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Patient identification
  full_name VARCHAR(255) NOT NULL,
  cpf VARCHAR(14) UNIQUE NOT NULL,
  
  -- Contact information
  email VARCHAR(255),
  phone VARCHAR(20),
  
  -- Address
  street VARCHAR(255),
  number VARCHAR(20),
  complement VARCHAR(100),
  neighborhood VARCHAR(100),
  city VARCHAR(100),
  state VARCHAR(2),
  zip_code VARCHAR(9),
  
  -- Metadata
  notes TEXT,
  is_active BOOLEAN DEFAULT true,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Indexes for performance
  CONSTRAINT patients_doctor_id_cpf_unique UNIQUE(doctor_id, cpf)
);

-- Create index for fast search by name
CREATE INDEX IF NOT EXISTS idx_patients_full_name ON patients USING gin(to_tsvector('portuguese', full_name));

-- Create index for CPF lookup
CREATE INDEX IF NOT EXISTS idx_patients_cpf ON patients(cpf);

-- Create index for doctor's patients
CREATE INDEX IF NOT EXISTS idx_patients_doctor_id ON patients(doctor_id);

-- Enable Row Level Security
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Doctors can only see their own patients
CREATE POLICY "Doctors can view own patients"
  ON patients FOR SELECT
  USING (auth.uid() = doctor_id);

CREATE POLICY "Doctors can insert own patients"
  ON patients FOR INSERT
  WITH CHECK (auth.uid() = doctor_id);

CREATE POLICY "Doctors can update own patients"
  ON patients FOR UPDATE
  USING (auth.uid() = doctor_id);

CREATE POLICY "Doctors can delete own patients"
  ON patients FOR DELETE
  USING (auth.uid() = doctor_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_patients_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER patients_updated_at_trigger
  BEFORE UPDATE ON patients
  FOR EACH ROW
  EXECUTE FUNCTION update_patients_updated_at();

-- Comments
COMMENT ON TABLE patients IS 'Stores patient information for Smart Memory autocomplete';
COMMENT ON COLUMN patients.doctor_id IS 'Foreign key to auth.users - each doctor manages their own patients';
COMMENT ON COLUMN patients.cpf IS 'Brazilian CPF - unique identifier for patients';
