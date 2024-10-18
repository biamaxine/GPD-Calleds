export interface FormFieldConfig {
  label: string;
  placeholder: string;
  ico: string;
  type: 'text' | 'password' | 'number';
  verifier?: (value: string) => boolean;
}
