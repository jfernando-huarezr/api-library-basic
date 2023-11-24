import express, { Request, Response } from "express";
import { Book } from "../models/book"

const router = express.Router();

router.put(
    '/api/library/:id',
    async(req: Request, res: Response) => {
        //Consultar con la base de datos los campos para actualizar el registro con el {:id}
        const { id } = req.params;
        const { title, description, author, year, ISBN, hardcover, countryOrigin, cost, autographed, category  } = req.body
        const book = await Book.findById(id);

        book?.set({ 
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

        await book?.save()

        res.send({book})
    }
);

export { router as updateBookRouter}