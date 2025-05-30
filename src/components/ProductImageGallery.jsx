const ProductImageGallery = ({ currentImage, setCurrentImage, miniatures = [] }) => {
  return (
    <div>
      <img
        src={currentImage}
        alt="Produto principal"
        className="w-[20vw] rounded-lg shadow-lg mb-2"
      />
      <div className="flex gap-2 mt-4">
        {miniatures.map((miniature, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(miniature)}
            className="focus:outline-none"
          >
            <img
              src={miniature}
              alt={`Miniatura ${index}`}
              className="w-[5vw] rounded-lg shadow-lg"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProductImageGallery
