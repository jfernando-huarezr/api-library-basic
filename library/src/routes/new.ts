import express, { Request, Response } from "express";
import { Book } from "../models/book";

const router = express.Router();

router.post(
    '/api/library',
    async(req: Request, res: Response) => {
        //Guardar un registro con la base de datos y revolver el registro guardado
        const { title, description, author, year, ISBN, hardcover, countryOrigin, cost, autographed, category } = req.body;

        const book = Book.build({ 
            title,
            description,
            author,
            year,
            ISBN,
            hardcover,
            countryOrigin,
            cost,
            autographed,
            category
        });

        await book.save();

        res.status(201).send(book);
    }
);

export { router as createBookRouter };