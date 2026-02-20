-- Migration: Update invoices table with draft status and patient relationship
-- Story: 005-smart-memory-database.md
-- Date: 2026-02-19

-- Add patient_id foreign key to invoices
ALTER TABLE invoices 
ADD COLUMN IF NOT EXISTS patient_id UUID REFERENCES patients(id) ON DELETE SET NULL;

-- Add status column with enum type
DO $$ BEGIN
  CREATE TYPE invoice_status AS ENUM ('draft', 'review', 'issued', 'cancelled');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Add status column (default to 'draft' for new invoices)
ALTER TABLE invoices 
ADD COLUMN IF NOT EXISTS status invoice_status DEFAULT 'draft';

-- Update existing invoices to 'issued' status
UPDATE invoices SET status = 'issued' WHERE status IS NULL;

-- Add validation fields
ALTER TABLE invoices
ADD COLUMN IF NOT EXISTS validation_errors JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS reviewed_by UUID REFERENCES auth.users(id);

-- Create index for status filtering
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);

-- Create index for patient relationship
CREATE INDEX IF NOT EXISTS idx_invoices_patient_id ON invoices(patient_id);

-- Comments
COMMENT ON COLUMN invoices.patient_id IS 'Link to patient record for Smart Memory';
COMMENT ON COLUMN invoices.status IS 'Invoice workflow status: draft, review, issued, cancelled';
COMMENT ON COLUMN invoices.validation_errors IS 'JSON array of validation errors found during review';
COMMENT ON COLUMN invoices.reviewed_at IS 'Timestamp when invoice was reviewed before issuing';
