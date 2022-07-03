export interface ErrorInterface {
  code: number;
  path: string;
  timestamp: string;
  httpStatus: number;
  description?: string;
  developMessage?: string;
}
