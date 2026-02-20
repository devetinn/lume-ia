-- Migration: Create autocomplete function for Smart Memory
-- Story: 005-smart-memory-database.md
-- Date: 2026-02-19

-- Function to search patients by name (autocomplete)
CREATE OR REPLACE FUNCTION search_patients(
  search_query TEXT,
  doctor_uuid UUID DEFAULT auth.uid()
)
RETURNS TABLE (
  id UUID,
  full_name VARCHAR,
  cpf VARCHAR,
  email VARCHAR,
  phone VARCHAR,
  street VARCHAR,
  number VARCHAR,
  city VARCHAR,
  state VARCHAR,
  zip_code VARCHAR
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.full_name,
    p.cpf,
    p.email,
    p.phone,
    p.street,
    p.number,
    p.city,
    p.state,
    p.zip_code
  FROM patients p
  WHERE p.doctor_id = doctor_uuid
    AND p.is_active = true
    AND (
      p.full_name ILIKE '%' || search_query || '%'
      OR p.cpf ILIKE '%' || search_query || '%'
    )
  ORDER BY 
    -- Prioritize exact name matches
    CASE WHEN p.full_name ILIKE search_query || '%' THEN 1 ELSE 2 END,
    p.full_name
  LIMIT 10;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION search_patients(TEXT, UUID) TO authenticated;

-- Comments
COMMENT ON FUNCTION search_patients IS 'Autocomplete search for patients by name or CPF';
