export interface TodoItem {
  message: string;
  id: string;
  timestamp: number;
  complete?: Boolean;
}