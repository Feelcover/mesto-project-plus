import { NextFunction, Response } from "express";
import { ISessionRequest } from "utils/types";


const extractBearerToken = (header:string) => header.replace("Bearer ", "");

export default (req:ISessionRequest, res:Response, next:NextFunction) => {
  const {authorization} = req.headers;
};