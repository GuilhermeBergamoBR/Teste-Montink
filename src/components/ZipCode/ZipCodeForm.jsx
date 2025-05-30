import ZipCodeInput from './ZipCodeInput'
import ErrorMessage from './ErrorMessage'

const ZipCodeForm = ({ zipCode, onChange, address, error }) => {
  const errorMessage = "Não consegui localizar seu CEP. Tente novamente"

  return (
    <div className="mt-6">
      <p className="text-left font-semibold text-gray-700">Digite seu CEP:</p>
      
      <ZipCodeInput
        zipCode={zipCode}
        onChange={onChange}
        zipCodeError={error}
      />

      {/* Espaço reservado para o endereço */}
      <div className="mt-4 min-h-[80px] text-left text-sm text-gray-600 transition-all duration-300">
        {address && address.logradouro ? (
          <>
            <p><strong>Rua:</strong> {address.logradouro}</p>
            <p><strong>Bairro:</strong> {address.bairro}</p>
            <p><strong>Cidade:</strong> {address.localidade} - {address.uf}</p>
          </>
        ) : null}
      </div>

      {error && (
        <ErrorMessage message={errorMessage} />
      )}
    </div>
  )
}

export default ZipCodeForm
