import { join } from "node:path";
import express, { type Express } from "express";

export default function Assets(APP: Express) {
  const ROOT_PATH = process.cwd();

  APP.use(express.static(join(ROOT_PATH, "public")));
  APP.use("/css", express.static(join(ROOT_PATH, "public/css")));
  APP.use("/js", express.static(join(ROOT_PATH, "app/resources/js")));
  APP.use("/images", express.static(join(ROOT_PATH, "public/images")));
  APP.use("/assets", express.static(join(ROOT_PATH, "public/assets")));

  if (process.env.DRIVE_DISK === "local") {
    APP.use("/files", express.static(join(ROOT_PATH, "uploads")));
  }
}
