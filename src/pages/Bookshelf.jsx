import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BookCard from '../blocks/BookCard';
import '../styles/bookshelf.scss';
import { loadBooks, searchBooks } from '../scripts/Utils';
import noCover from '../images/no-cover.png';

const Bookshelf = () => {
  const [bookList, setBooks] = useState([]);

  const [searchParams, setSearchParams] = useState('');
  const location = useLocation();
  const param = new URLSearchParams(location.search).get('q');
  if (location.search !== searchParams) {
    setSearchParams(location.search);
  }

  useEffect(() => {
    if (location.search) {
      searchBooks(location.search)
        .then(({ data: books }) => {
          setBooks(filterBooks(books));
        })
        .catch((e) => {
          throw new Error(e);
        });
    } else {
      loadBooks()
        .then(({ data: books }) => {
          setBooks(books);
        })
        .catch((e) => {
          throw new Error(e);
        });
    }
  }, [searchParams]);

  const filterBooks = (unfilteredBooks) => {
    console.log(param);
    return unfilteredBooks.filter((element) => {
      console.log(element.author);
      console.log(element.title);
      return (
        element.author.toLowerCase().includes(param) ||
        element.title.toLowerCase().includes(param)
      );
    });
  };

  return (
    <main className="main">
      <section className="section">
        <h1 className="section__header">
          {location.search
            ? `Titles/Authors with '${param}'`
            : 'Release the Kraken of Knowledge!'}
        </h1>
        <div className="bookshelf-section">
          <div className="bookshelf">
            {bookList.map(({ id, title, image, author, synopsis }) => (
              <BookCard
                key={id + title}
                id={id}
                author={author}
                title={title}
                image={image || noCover}
                synopsis={synopsis}
              />
            ))}
            {bookList.length < 1 ? (
              <h2 className="section__header">No results found.</h2>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Bookshelf;
