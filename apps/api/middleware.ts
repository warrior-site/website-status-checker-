import type {Request,Response,NextFunction} from "express"

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Perform validation logic here

  const authHeader = req.headers['authorization']
  req.userId = "1";
  next();
}
