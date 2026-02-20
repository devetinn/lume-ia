/**
 * Application Constants
 */

// Minimum and maximum invoice amounts (in BRL)
export const MIN_INVOICE_AMOUNT = 10.00
export const MAX_INVOICE_AMOUNT = 50000.00

// Audio constraints
export const MAX_AUDIO_DURATION = 60 // seconds
export const MAX_AUDIO_SIZE = 5 * 1024 * 1024 // 5MB

// Supported audio formats
export const SUPPORTED_AUDIO_FORMATS = ['audio/webm', 'audio/mp3', 'audio/wav', 'audio/m4a']

// Tax rates
export const PIS_RATE = 0.0065 // 0.65%
export const COFINS_RATE = 0.03 // 3%
export const MIN_ISS_RATE = 0.02 // 2%
export const MAX_ISS_RATE = 0.05 // 5%

// Supported states
export const SUPPORTED_STATES = ['CE', 'SE', 'RN'] as const

// User roles
export const USER_ROLES = {
  DOCTOR: 'doctor',
  ADMIN: 'admin',
  ACCOUNTANT: 'accountant',
} as const

// Invoice statuses
export const INVOICE_STATUSES = {
  PENDING: 'pending',
  ISSUED: 'issued',
  CANCELLED: 'cancelled',
  ERROR: 'error',
} as const

// Date formats
export const DATE_FORMAT = 'dd/MM/yyyy'
export const DATETIME_FORMAT = 'dd/MM/yyyy HH:mm'

// Pagination
export const DEFAULT_PAGE_SIZE = 20
export const MAX_PAGE_SIZE = 100

// Audio retention period (days)
export const AUDIO_RETENTION_DAYS = 90
