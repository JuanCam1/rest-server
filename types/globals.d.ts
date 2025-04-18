import type { SendResponse } from "./response.model";
import type { Theme } from "./theme.model";
import type {
  RequestMethod,
  ApiRequest,
  FolderType,
  Response,
  UpdateActiveRequest,
  DeleteRequest,
  UpdateHeader,
} from "./request.model";

declare global {
  type SendResponseI<T> = SendResponse<T>;
  type ThemeI = Theme;
  type RequestMethodI = RequestMethod;
  type ApiRequestI = ApiRequest;
  type FolderTypeI = FolderType;
  type ResponseI = Response;
  type UpdateActiveRequestI = UpdateActiveRequest;
  type UpdateHeaderI = UpdateHeader;
  type DeleteRequestI = DeleteRequest;
}