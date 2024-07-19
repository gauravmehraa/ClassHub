import { Request, Response } from "express";

export const signup = (req: Request, res: Response) => {
  try{

  }
  catch (error) {
    console.log(`[ERROR] - Signup Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const login = (req: Request, res: Response) => {
  try{
    
  }
  catch (error) {
    console.log(`[ERROR] - Login Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const logout = (req: Request, res: Response) => {
  try{
    
  }
  catch (error) {
    console.log(`[ERROR] - Logout Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
