import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem.jsx';

export const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className="ImageGallery">
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          onClick={() => openModal(image.largeImageURL, image.tags)}
        />
      ))}
    </ul>
  );
};
