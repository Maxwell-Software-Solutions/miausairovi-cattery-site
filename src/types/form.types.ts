/**
 * Form-related type definitions
 */

/**
 * Contact form data structure
 */
export interface ContactFormData {
  /** Contact name */
  name: string;
  /** Contact email address */
  email: string;
  /** Optional phone number */
  phone: string;
  /** Message content */
  message: string;
  /** Optional call schedule preference */
  callSchedule: string;
}

/**
 * Response from email submission
 */
export interface EmailResponse {
  /** Whether the submission was successful */
  success: boolean;
  /** Response data if successful */
  data?: Record<string, unknown>;
  /** Error message if failed */
  error?: string;
}

/**
 * Form field validation rules
 */
export interface ValidationRules {
  required?: boolean;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  custom?: (value: string | number | boolean) => string | null;
}

/**
 * Form field state
 */
export interface FormField {
  value: string | number | boolean;
  error: string | null;
  touched: boolean;
}
