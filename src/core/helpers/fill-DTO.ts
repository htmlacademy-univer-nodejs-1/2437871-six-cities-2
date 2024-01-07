import {ClassConstructor, plainToInstance} from 'class-transformer';

export function fillDTO<T, V>(dto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(dto, plainObject, { excludeExtraneousValues: true });
}
