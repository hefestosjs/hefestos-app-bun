import { join } from "node:path";
import { LocalStrategy } from "./strategies";

export type ParamsType = {
  folder?: string;
};

const uploadPath = join(process.cwd(), "app/config/upload");
export const { uploadConfig } = require(uploadPath);

export const upload = (params?: ParamsType) => LocalStrategy(params);
