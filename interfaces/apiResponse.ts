export interface ApiResponse<T> {
  success?: boolean;
  errorCode?: string;
  statusCode?: number;
  message?: string;
  data?: T | null;
}
