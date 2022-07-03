export interface GenericResponse<T> {
  code: number;
  description: string;
  result: T;
}
