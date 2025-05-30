import { useState, useEffect } from 'react'
import { getAddressByZip } from './api/viacep'
import ProductImageGallery from './components/ProductImageGallery'
import ProductVariants from './components/ProductVariants'
import ZipCodeForm from './components/ZipCode/ZipCodeForm'
import { getWithExpiry, saveWithExpiry, EXPIRATION_TIME } from './utils/storage'
import './App.css'

function App() {
  const defaultImage = '/microondas2.jpg'
  const [currentImage, setCurrentImage] = useState(defaultImage)
  const [selectedOptions, setSelectedOptions] = useState({})
  const [zipCode, setZipCode] = useState('')
  const [zipCodeError, setZipCodeError] = useState(false)
  const [address, setAddress] = useState('')

  const miniatures = [
    '/microondas3.jpg',
    '/microondas4.jpg',
    '/microondas5.jpg',
    '/microondas6.jpg'
  ]

  const productVariants = [
    { name: 'Tamanho', options: ['P', 'M', 'G', 'GG'] },
    { name: 'Cor', options: ['Preto', 'Cinza', 'Branco', 'Vermelho'] },
  ]

  useEffect(() => {
    const savedZip = getWithExpiry('zipCode')
    const savedAddress = getWithExpiry('address')
    const savedOptions = getWithExpiry('selectedOptions')

    if (savedZip) setZipCode(savedZip)
    if (savedAddress) setAddress(savedAddress)
    if (savedOptions) setSelectedOptions(savedOptions)
  }, [])

  const handleSelect = (variantName, option) => {
    const newSelected = { ...selectedOptions, [variantName]: option }
    setSelectedOptions(newSelected)
    saveWithExpiry('selectedOptions', newSelected, EXPIRATION_TIME)
  }

  const handleChangeZipCode = async (formatted) => {
    const value = formatted.replace(/\D/g, '');
    setZipCode(formatted);
    saveWithExpiry('zipCode', formatted, EXPIRATION_TIME);

    if (value.length === 8) {
      try {
        const data = await getAddressByZip(value);
        setAddress(data);
        setZipCodeError(false);
        saveWithExpiry('address', data, EXPIRATION_TIME);
      } catch (err) {
        setZipCodeError(true);
        console.error('Erro ao buscar CEP:', err);
      }
    } else if (value.length === 0) {
      setAddress('');
      setZipCode('');
      localStorage.removeItem('zipCode');
      localStorage.removeItem('address');
    }
  };

  return (
    <div className="flex items-center gap-6 rounded-md bg-white p-4 shadow-lg">
      <ProductImageGallery
        images={miniatures}
        currentImage={currentImage}
        setCurrentImage={setCurrentImage}
      />

      <div className="flex flex-col self-start">
        <div id="main" className='flex flex-col text-left mb-4'>
          <span className="text-3xl font-semibold text-gray-800 tracking-tight">
            Título do produto
          </span>
          <span className="mt-2 text-2xl font-semibold text-blue-600">
            R$ 199,99
          </span>
        </div>

        <ProductVariants
          variants={productVariants}
          selectedOptions={selectedOptions}
          onSelect={handleSelect}
        />

        <ZipCodeForm
          zipCode={zipCode}
          onChange={handleChangeZipCode}
          address={address}
          error={zipCodeError}
        />
      </div>
    </div>
  )
}

export default App
