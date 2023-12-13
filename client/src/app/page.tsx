"use client"
import { useEffect, useState } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faTrash,
  faPenToSquare
} from "@fortawesome/free-solid-svg-icons";

export default function IndexPage() {
  const [totalBooks, setTotalBooks] = useState<number>(0);
  const [books, setBooks] = useState<any>(null)

  const fetchData = async () => {
    const responseBooks = await axios.get('/api/library').then((response) => response.data)
    setBooks(responseBooks)
    setTotalBooks(responseBooks.length)
  }

  //funcion para borrar un libro, con un window alert
  const deleteBook = async (bookId: any) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await axios.delete(`/api/library/${bookId}`);
        //recargar los libros con fetch
        fetchData();
      } catch (error) {
        console.error(error);
      }
    }
  }
  

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="container">
            <div className="row">
                <div className="col-12">
                    <h2>You have a total of {totalBooks} books</h2>
                    <button onClick={ () => window.location.href='/books/new'}>New Book</button>

                    <table className="table">
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Author</th>
                          <th>Cost</th>
                          <th>Category</th>
                          <th>More Info</th>
                          <th>Update</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>                            
                        {(books ?? []).map((book: any) => (
                          <tr key={book.title}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>${book.cost}</td>
                            <td>{book.category}</td>
                            {/* botones para el CRUD*/}
                            <td><a href={`/books/${book._id}`}><FontAwesomeIcon icon={faMagnifyingGlass}/></a></td>
                            <td><a href={`/books/${book._id}-edit`}><FontAwesomeIcon icon={faPenToSquare} /></a></td>
                            <td><a onClick={() => deleteBook(book._id)}><FontAwesomeIcon icon={faTrash} /></a></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                </div>
            </div>
        </div>
  )
}
