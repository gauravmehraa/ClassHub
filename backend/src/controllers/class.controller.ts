import { Request, Response } from "express";
import { IClass } from "../types/class.type";
import Class from "../models/class.model";

export const getClasses = async(req: Request, res: Response) => {
  try{
    const classes: IClass[] = await Class.find().select("-createdAt -updatedAt -__v");
    res.status(200).json(classes);
  }
  catch (error) {
    console.log(`[ERROR] - Get Classes Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const addClass = async(req: Request, res: Response) => {
  try{
    const { year, program, seats } = req.body;

    const existingClass: IClass[] = await Class.find({
      year: { $eq: year },
      program: { $eq: program },
    });

    if(existingClass.length !== 0){
      res.status(400).json({error: "Class is already registered"});
      return;
    }

    const newClass = new Class({ year, program, seats, subjects: [] });
    if(newClass){
      await newClass.save();
      res.status(201).json({
        _id: newClass._id,
        year: newClass.year,
        program: newClass.program,
        seats: newClass.seats,
        subjects: newClass.subjects,
      });
    }
    else{
      res.status(400).json({ error: "Invalid data" })
    }
  }
  catch (error) {
    console.log(`[ERROR] - Add Class Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const editClass = async(req: Request, res: Response) => {
  try{
    const { id: classID } = req.params;
    const { year, program, seats, subjects } = req.body;

    const updatedClass = await Class.findByIdAndUpdate(
      classID,
      { year, program, seats, subjects },
      { new: true }
    );

    if(!updatedClass){
      res.status(500).json({ error: "No class to be edited" });
      return;
    }

    await updatedClass.save();
    res.status(200).json(updatedClass);

  }
  catch (error) {
    console.log(`[ERROR] - Edit Class Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}