import { useState, useEffect } from 'react'
import { getAddressByZip } from './api/viacep'
import ProductImageGallery from './components/ProductImageGallery'
import ProductVariants from './components/ProductVariants'
import ZipCodeForm from './components/ZipCode/ZipCodeForm'
import { getWithExpiry, saveWithExpiry, EXPIRATION_TIME } from './utils/storage'
import './App.css'

function App() {
  const defaultImage = '/camisa-verde1.webp'
  const [currentImage, setCurrentImage] = useState()
  const [selectedOptions, setSelectedOptions] = useState({Cor: 'Verde'})
  const [zipCode, setZipCode] = useState('')
  const [zipCodeError, setZipCodeError] = useState(false)
  const [address, setAddress] = useState('')

  const miniatures = [
    {color: 'Verde', pictures: ['/camisa-verde1.webp', '/camisa-verde2.webp', '/camisa-verde3.webp', '/camisa-verde4.webp']},
    {color: 'Laranja', pictures: ['/camisa-laranja1.webp', '/camisa-laranja2.webp', '/camisa-laranja3.webp', '/camisa-laranja4.webp']},
    {color: 'Azul', pictures: ['/camisa-azul1.webp', '/camisa-azul2.webp', '/camisa-azul3.webp', '/camisa-azul4.webp']},
    {color: 'Rosa', pictures: ['/camisa-rosa1.webp', '/camisa-rosa2.webp', '/camisa-rosa3.webp', '/camisa-rosa4.webp']}
  ]

  const productVariants = [
    { name: 'Tamanho', options: ['P', 'M', 'G', 'GG'] },
    { name: 'Cor', options: ['Verde', 'Laranja', 'Azul', 'Rosa'] },
  ]

  useEffect(() => {
    const savedZip = getWithExpiry('zipCode')
    const savedAddress = getWithExpiry('address')
    const savedOptions = getWithExpiry('selectedOptions')

    if (savedZip) setZipCode(savedZip)
    if (savedAddress) setAddress(savedAddress)
    if (savedOptions) {
      setSelectedOptions(savedOptions)
      setCurrentImage(miniatures.find(m=> m.color === savedOptions.Cor).pictures[0] || defaultImage)   
    }
  }, [])

  const handleSelect = (variantName, option) => {
    const newSelected = { ...selectedOptions, [variantName]: option }
    setSelectedOptions(newSelected)
    saveWithExpiry('selectedOptions', newSelected, EXPIRATION_TIME)
    if (variantName === 'Cor') {
      setCurrentImage(miniatures.find(m=> m.color === option).pictures[0])
    }
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

console.log('Miniaturas renderizadas:', miniatures.find(m => m.color === selectedOptions['Cor'])?.pictures)

  return (
    <div className="flex flex-wrap items-center gap-6 rounded-md bg-white p-4 shadow-lg">
      <ProductImageGallery
        miniatures={miniatures.find(m => m.color === selectedOptions['Cor'])?.pictures || []}
        currentImage={currentImage}
        setCurrentImage={setCurrentImage}
      />

      <div className="flex flex-col self-start">
        <div id="main" className='flex flex-col text-left mb-4'>
          <span className="text-3xl font-semibold text-gray-800 tracking-tight">
            Camiseta de Linho
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
