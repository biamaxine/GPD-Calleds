export interface SignInDto {
  cpf: string;
}

export const isSignInDto = (dto: any): dto is SignInDto => {
  return (
    typeof dto === 'object' &&
    dto !== null &&
    'cpf' in dto &&
    typeof dto.cpf === 'string'
  );
};
