import { Request, Response, Application } from "express";

export default async (app: Application) => {
  try {
    app.get("/", (req, res) => {
      res.json({
        ok: true,
        message: "Hello from small project!",
        userId: (req as any).userId,
      });
    });

    app.use("/", (req: Request, res: Response) => {
      res.json({ msg: "Express working..." });
    });
  } catch (error) {
    console.log("Express Error :", error);
  }
};
