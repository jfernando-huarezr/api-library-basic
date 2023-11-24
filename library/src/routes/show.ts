import express, { Request, Response } from "express";
import { Book } from "../models/book"

const router = express.Router();

router.get(
    '/api/library/:id',
    async(req: Request, res: Response) => {
        const { id } = req.params;
        //Consultar con la base de datos y traer el registro que coincida con el ID
        const book = await Book.findById(id)

        res.send({ book})
    }
);

export { router as showBookRouter}