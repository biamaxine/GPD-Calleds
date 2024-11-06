import { $Enums, Called } from '@prisma/client';

export class CalledEntity implements Called {
  id: number;
  authorId: number;

  type: $Enums.CalledType;
  location: string;
  description: string;

  status: $Enums.CalledStatus;
  code: string;
  difficulty: $Enums.CalledDifficulty;
  notes: string;

  createdAt: Date;
  updatedAt: Date;
}
