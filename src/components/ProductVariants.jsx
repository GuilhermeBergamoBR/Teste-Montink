const ProductVariants = ({ variants, selectedOptions, onSelect }) => {
  return (
    <>
      {variants.map(variant => (
        <div key={variant.name} className="flex flex-col flex-wrap mt-2">
          <p className="text-left font-semibold text-gray-700">
            {variant.name}: {selectedOptions[variant.name] || ''}
          </p>
          <div className="flex gap-2 mt-2 flex-wrap">
            {variant.options.map(option => {
              const isSelected = selectedOptions[variant.name] === option
              return (
                <button
                  key={option}
                  onClick={() => onSelect(variant.name, option)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors
                    ${isSelected
                      ? 'border-blue-600 text-gray-800'
                      : 'border-gray-300 text-gray-700 hover:border-gray-500'
                    }`}
                >
                  {option}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </>
  )
}

export default ProductVariants
