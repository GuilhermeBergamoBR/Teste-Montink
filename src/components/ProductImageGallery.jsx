const ProductImageGallery = ({ currentImage, setCurrentImage, miniatures = [] }) => {
  return (
    <div className="w-full flex flex-col items-center">
      <img
        src={currentImage}
        alt="Produto principal"
        className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl rounded-lg shadow-lg mb-4 object-contain"
      />

      <div className="flex flex-wrap justify-center gap-2 mt-2">
        {miniatures.map((miniature, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(miniature)}
            className="focus:outline-none"
          >
            <img
              src={miniature}
              alt={`Miniatura ${index}`}
              className="w-16 sm:w-20 md:w-24 lg:w-28 rounded-lg shadow-md object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
