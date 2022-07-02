export interface GenericResponse<T> {
  code: number;
  description: string;
  data: T;
}
