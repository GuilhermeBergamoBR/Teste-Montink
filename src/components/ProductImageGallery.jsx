const ProductImageGallery = ({ currentImage, setCurrentImage, miniatures = [] }) => {
  return (
    <div className="flex flex-col max-w-xl w-full">
      <img
        src={currentImage}
        alt="Produto principal"
        className="w-full max-w-full rounded-lg shadow-lg mb-4 object-contain"
        style={{ maxHeight: '400px' }}
      />
      
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {miniatures.map((miniature, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(miniature)}
            className="flex-shrink-0 focus:outline-none"
          >
            <img
              src={miniature}
              alt={`Miniatura ${index}`}
              className="w-16 h-16 rounded-md shadow object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProductImageGallery