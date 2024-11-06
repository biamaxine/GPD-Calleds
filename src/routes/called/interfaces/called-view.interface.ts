import { $Enums } from '@prisma/client';

export interface CalledView {
  type: $Enums.CalledType;
  description: string;
  location: string;

  status: $Enums.CalledStatus;
}
