

export type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface UpdateActiveRequest {
  field: keyof ApiRequest;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  value: any;
}

export interface DeleteRequest {
  folderId: string;
  requestId: string;
}

export interface UpdateHeader {
  index: number;
  field: "key" | "value";
  value: string;
}

export interface FolderType {
  id: string;
  name: string;
  isOpen: boolean;
  requests: ApiRequest[];
}

export interface ApiRequest {
  id: string;
  name: string;
  url: string;
  method: RequestMethod;
  headers: { key: string; value: string }[];
  body: string;
}

export interface Response {
  data: string;
  status: number;
  time: number;
}