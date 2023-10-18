import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar.jsx';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { MyLoader } from './Loader/Loader.jsx';
import { Button } from './Button/Button.jsx';
import { Modal } from './Modal/Modal.jsx';
import { getImage } from '../pixabay-api.js';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isLoading: false,
    error: null,
    isModalOpen: false,
    selectedImageURL: '',
    loadMore: false,
    tags: '',
  };

  componentDidUpdate(_, prevState) {
    if (
      this.state.query !== prevState.query ||
      this.state.page !== prevState.page
    ) {
      this.loadImages();
    }
  }
  getImageSubmit = query => {
    if (!query.trim()) {
      toast.error('Please provide a search term.');
      return;
    }

    this.setState({ query, images: [], page: 1, isLoading: true });
  };

  loadImages = async () => {
    const { query, page } = this.state;

    try {
      this.setState({ isLoading: true });
      const { hits, totalHits } = await getImage(query, page);
      if (hits.length === 0) {
        return toast.error('Not find');
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        loadMore: page < Math.ceil(totalHits / 12),
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  loadMoreImages = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = (imageURL, tags) => {
    this.setState({
      isModalOpen: true,
      selectedImageURL: imageURL,
      tags,
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
      selectedImageURL: '',
      tags: '',
    });
  };

  render() {
    const {
      images,
      isLoading,
      error,
      isModalOpen,
      selectedImageURL,
      tags,
      loadMore,
    } = this.state;

    return (
      <div>
        <ToastContainer />
        <Searchbar onSubmit={this.getImageSubmit} />
        {images.length > 0 && (
          <ImageGallery images={images} openModal={this.openModal} />
        )}
        {isLoading && <MyLoader />}
        {loadMore && !isLoading && images.length > 0 && (
          <Button onClick={this.loadMoreImages} />
        )}
        {error && toast.error('Something went wrong')}{' '}
        {isModalOpen && (
          <Modal
            imageURL={selectedImageURL}
            onClose={this.closeModal}
            tags={tags}
          />
        )}
      </div>
    );
  }
}
