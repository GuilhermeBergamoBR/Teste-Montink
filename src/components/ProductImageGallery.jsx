const ProductImageGallery = ({ currentImage, setCurrentImage, miniatures = [] }) => {
  return (
    <div className="flex flex-col">
      <img
        src={currentImage}
        alt="Produto principal"
        className="w-full sm:w-[60vw] md:w-[50vw] lg:w-[28vw] xl:w-[25vw] rounded-lg shadow-lg mb-4 object-contain"
      />

      <div className="flex flex-wrap gap-2 mt-2">
        {miniatures.map((miniature, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(miniature)}
            className="focus:outline-none"
          >
            <img
              src={miniature}
              alt={`Miniatura ${index}`}
              className="w-16 sm:w-20 md:w-20 lg:w-16 xl:w-20 rounded-md shadow object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProductImageGallery
