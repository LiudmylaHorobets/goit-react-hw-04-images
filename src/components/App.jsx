import { useState, useEffect, useCallback } from 'react';

import { Searchbar } from './Searchbar/Searchbar.jsx';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { MyLoader } from './Loader/Loader.jsx';
import { Button } from './Button/Button.jsx';
import { Modal } from './Modal/Modal.jsx';
import { getImage } from '../pixabay-api.js';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageURL, setSelectedImageURL] = useState('');
  const [loadMore, setLoadMore] = useState(false);
  const [tags, setTags] = useState('');

  const getImageSubmit = newQuery => {
    if (!newQuery.trim()) {
      toast.error('Please provide a search term.');
      return;
    }

    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setIsLoading(true);
  };

  const loadImages = useCallback(async () => {
    try {
      setIsLoading(true);
      const { hits, totalHits } = await getImage(query, page);
      if (hits.length === 0) {
        return toast.error('No images found.');
      }
      setImages(prevImages => [...prevImages, ...hits]);
      setLoadMore(page < Math.ceil(totalHits / 12));
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [query, page]);

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = (imageURL, tags) => {
    setIsModalOpen(true);
    setSelectedImageURL(imageURL);
    setTags(tags);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImageURL('');
    setTags('');
  };

  useEffect(() => {
    if (query.trim() === '') {
      return;
    }

    loadImages();
  }, [query, loadImages]);

  return (
    <div>
      <ToastContainer />
      <Searchbar onSubmit={getImageSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {isLoading && <MyLoader />}
      {loadMore && !isLoading && images.length > 0 && (
        <Button onClick={loadMoreImages} />
      )}
      {error && toast.error('Something went wrong')}
      {isModalOpen && (
        <Modal imageURL={selectedImageURL} onClose={closeModal} tags={tags} />
      )}
    </div>
  );
}
