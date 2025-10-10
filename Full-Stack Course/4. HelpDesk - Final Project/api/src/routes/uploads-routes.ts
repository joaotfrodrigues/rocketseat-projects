import { Router } from "express";
import multer from "multer";

import { UploadsController } from "@/controllers/uploads-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";
import uploadConfig from "@/configs/upload";


export const uploadsRoutes = Router();
const uploadsController = new UploadsController();

const upload = multer(uploadConfig.MULTER);

uploadsRoutes.use(verifyUserAuthorization(["client", "technician", "admin"]));

uploadsRoutes.post("/", upload.single("file"), uploadsController.create);
uploadsRoutes.delete("/", uploadsController.remove);
