import { Response } from "express";

export default function({ res, status = 200, message = "Success", data }: { res: Response; status?: number; message?: string; data: any }) {
   return res
      .status(status)
      .json({ statusCode: status, success: true, message, data })
      .end();
}
