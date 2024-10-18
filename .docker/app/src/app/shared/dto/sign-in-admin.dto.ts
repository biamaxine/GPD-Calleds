export interface SignInAdminDto {
  cpf: string;
  password: string;
}

export const isSignInAdminDto = (dto: any): dto is SignInAdminDto => {
  return (
    typeof dto === 'object' &&
    dto !== null &&
    'cpf' in dto &&
    'password' in dto &&
    typeof dto.cpf === 'string' &&
    typeof dto.password === 'string'
  );
};
