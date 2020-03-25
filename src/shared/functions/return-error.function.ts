import { Response } from "express";

export default function({ res, status = 500, message = "Error", data }: { res: Response; status?: number; message?: string; data: any }) {
   res.status(status)
      .json({ statusCode: status, success: false, message, data })
      .end();
   return;
}
