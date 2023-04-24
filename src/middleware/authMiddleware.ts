import { UnauthorizedErr } from "../errors/errors";
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/constants";
import { ISessionRequest } from "../utils/types";

const extractBearerToken = (header: string) => header.replace("Bearer ", "");

export default (req: ISessionRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization?.startsWith("Bearer ")) {
    next(new UnauthorizedErr("Необходима авторизация"));
    return;
  }
  const token = extractBearerToken(authorization);
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedErr("Необходима авторизация"));
  }
  req.user = payload;
  next();
};
