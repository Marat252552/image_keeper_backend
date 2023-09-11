import { UploadedFile } from "express-fileupload";
import { TokenPayload_T } from "../../shared/types";

export type addImageReq_T = {
  files: {
    file: UploadedFile;
  };
  body: {
    label: string;
  };
};
export type addImageRes_T = {
  TokenPayload: TokenPayload_T;
};


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
