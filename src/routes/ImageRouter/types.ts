import { FileArray, UploadedFile } from "express-fileupload";
import { TokenPayload_T } from "../../shared/types";
import { Request, Response } from "express";

export type addImageReq_T = Request<{}, {}, { label: string; }>

// {
//   files: FileArray | null | undefined;
//   body: {
//     label: string;
//   };
// }

export type response_T = Response<{}, {
  TokenPayload: TokenPayload_T
}>



export type deleteImageReq_T = {
  params: {
    image_id: string
  }
}

export type setLabelReq_T = {
  body: {
    image_id: string,
    label: string
  }
}
