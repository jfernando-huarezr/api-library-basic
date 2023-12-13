"use client"
import { useEffect, useState} from "react";
import axios from 'axios';
import NewBookPage from "./new";

export default function Page({ params }: {params: {slug: string}}) {

    const [currentBook, setCurrentBook] = useState<any>(null);
    const isEditMode = params.slug.endsWith('edit');
    const bookId = isEditMode ? params.slug.slice(0, -5) : params.slug;
  

    const fetchData = async () => {
        if (bookId !== "new") {
            const responseBook = await axios.get(`/api/library/${bookId}`).then((response) => response.data);
            setCurrentBook(responseBook);
            console.log(responseBook)
        }
    }

    useEffect(() => {
          fetchData();
      }, []);


      if(params.slug === "new") {
        return <NewBookPage/>
      }
    
      if (isEditMode) {    
        return currentBook ? <NewBookPage book = {currentBook} /> : <div>Loading...</div>;
      }

    return currentBook ? (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <p>BookId: {currentBook._id}</p>
                    <p>Title: {currentBook.title}</p>
                    <p>Author: {currentBook.author}</p>
                    <p>Description: {currentBook.description}</p>
                    <p>Year: {currentBook.year}</p>
                    <p>ISBN: {currentBook.ISBN}</p>
                    <p>Hardcover: {currentBook.hardcover ? "Yes" : "No"}</p>
                    <p>Autographed: {currentBook.autographed ? "Yes" : "No"}</p>
                    <p>Category: {currentBook.category}</p>
                    <p>Cost: ${currentBook.cost}</p>
                    <p>Country of origin: {currentBook.countryOrigin}</p>
                </div>
            </div>
            <button onClick={ () => window.location.href='http://isil.dev'}>Return</button>
        </div>
    ) : (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <h5>No register</h5>
                </div>
            </div>
        </div>
    );
}