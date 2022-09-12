import { IsUUID } from 'class-validator';
import {} from 'brazilian-class-validator';

export class DesactiveProductEntity {
  @IsUUID()
  id: string;
}
