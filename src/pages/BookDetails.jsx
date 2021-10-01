import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { loadBook } from '../scripts/Utils';
import Rating from '../blocks/Rating';
import '../styles/book-details.scss';
import '../styles/blocks/_rating.scss';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState([]);
  useEffect(() => {
    loadBook(id)
      .then(({ data: bookData }) => {
        console.log(bookData);
        setBook(bookData);
      })
      .catch((e) => {
        throw new Error(e);
      });
  }, []);

  // const [title, image, author, rating, synopsis, pages, published] = {
  //   book,
  // };

  return (
    <>
      <main className="main">
        <section className="section">
          <div className="book-details">
            <div className="book-card">
              <img
                className="book-card__img"
                crossOrigin="anonymous"
                src={book.image}
                alt={`${book.title}'s cover`}
              />
              <div className="label-before">
                <Rating rating={book.rating} />
              </div>
            </div>
            <div className="book-details__info">
              <h1 className="section__header">{book.title}</h1>
              <h2 className="section__h2">{book.author}</h2>
              <h3 className="section__h3">{`Published: ${book.published}`}</h3>
              <h3 className="section__h3">{`${book.pages} pages`}</h3>
              <p className="section__text">{book.synopsis}</p>
            </div>
          </div>
          <div className="button-group">
            <button className="button" type="button">
              Edit This Book
            </button>
            <button className="button button--secondary-color" type="button">
              Back to Shelf
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default BookDetails;
