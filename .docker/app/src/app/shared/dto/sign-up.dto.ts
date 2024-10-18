export interface SignUpDto {
  cpf: string;
  name: string;
  sector: string;
  phone: string;
}

export const isSignUpDto = (dto: any): dto is SignUpDto => {
  return (
    typeof dto === 'object' &&
    dto !== null &&
    'cpf' in dto &&
    'name' in dto &&
    'sector' in dto &&
    'phone' in dto &&
    typeof dto.cpf === 'string' &&
    typeof dto.name === 'string' &&
    typeof dto.sector === 'string' &&
    typeof dto.phone === 'string'
  );
};
