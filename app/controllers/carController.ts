import { Request, Response } from "express";
import { CarService } from "../services/carsService";
import { mUpload } from "../../config/multer";
import cloudinary from "../../config/cloudinary";
import CarLogService from "../services/carLogsService";
import Users from "../models/Users";

interface CustomRequest extends Request {
  user?: Users;
}

export const getAllCars = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const cars = await CarService.getAllCars();
    res.json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Get Data dengan Id
export const getCarById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const carId = parseInt(id, 10);
    const car = await CarService.getCarById(carId);

    if (!car) {
      res.status(404).json({ message: "Car not found" });
      return;
    }

    res.json(car);
  } catch (error) {
    console.error("Error fetching car by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Delete Data Car
export const deleteCar = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const carId = parseInt(id, 10);

    await CarService.deleteCarById(carId);
    const userId = req.user?.id;
    await CarLogService.createLog({
      activity_type: "delete",
      user_id: userId,
      car_id: carId,
    });

    res.json({ message: "Car deleted successfully" });
  } catch (error) {
    console.error("Error deleting car:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Create Data Car
export const createCar = async (req: CustomRequest, res: Response) => {
  try {
    mUpload.single("picture")(req, res, async (err: unknown) => {
      if (err) {
        console.error("Error uploading picture:", err);
        return res
          .status(400)
          .json({ message: "Error uploading picture", error: err });
      }
      try {
        const fileBase64 = req.file?.buffer.toString("base64");
        const file = `data:${req.file?.mimetype};base64,${fileBase64}`;

        const result = await cloudinary.uploader.upload(file, {
          folder: "bcr",
          use_filename: true,
        });

        const { name, price, start_rent, finish_rent } = req.body;

        // Membuat mobil
        const car = await CarService.createCar({
          name,
          price,
          picture: result.url,
          start_rent,
          finish_rent,
        });

        const userId = req.user?.id;
        await CarLogService.createLog({
          activity_type: "create",
          user_id: userId,
          car_id: car.id,
        });

        res.status(201).json({
          message: "Car created successfully",
          car,
        });
      } catch (error) {
        console.error("Error uploading picture to Cloudinary:", error);
        res.status(400).json({
          message: "Error uploading picture to Cloudinary",
          error,
        });
      }
    });
  } catch (error) {
    console.error("Error creating car:", error);
    res.status(400).json({
      message: "Error creating car",
      error,
    });
  }
};

//Update Data Car
export const updateCar = async (req: CustomRequest, res: Response) => {
  try {
    mUpload.single("picture")(req, res, async (err: unknown) => {
      if (err) {
        console.error("Error uploading picture:", err);
        return res
          .status(400)
          .json({ message: "Error uploading picture", error: err });
      }
      try {
        const fileBase64 = req.file?.buffer.toString("base64");
        const file = `data:${req.file?.mimetype};base64,${fileBase64}`;

        const result = await cloudinary.uploader.upload(file, {
          folder: "bcr",
          use_filename: true,
        });

        const { name, price, start_rent, finish_rent } = req.body;
        const carId = Number(req.params.id);

        const existingCar = await CarService.getCarById(carId);
        if (!existingCar) {
          return res.status(404).json({ message: "Car not found" });
        }

        const updatedCar = await CarService.updateCarById(carId, {
          name,
          price,
          picture: result.url,
          start_rent,
          finish_rent,
        });

        const userId = req.user?.id;
        await CarLogService.createLog({
          activity_type: "update",
          user_id: userId,
          car_id: carId,
        });

        res.status(200).json({
          message: "Car updated successfully",
          car: updatedCar,
        });
      } catch (error) {
        console.error("Error uploading picture to Cloudinary:", error);
        res.status(400).json({
          message: "Error uploading picture to Cloudinary",
          error,
        });
      }
    });
  } catch (error) {
    console.error("Error updating car:", error);
    res.status(400).json({
      message: "Error updating car",
      error,
    });
  }
};
