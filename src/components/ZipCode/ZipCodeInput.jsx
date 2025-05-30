const ZipCodeInput = ({ zipCode, onChange, zipCodeError, ...props }) => {

  const formatCep = (val) => {
    const onlyNumbers = val.replace(/\D/g, '');

    if (onlyNumbers.length <= 2) return onlyNumbers;
    if (onlyNumbers.length <= 5) return `${onlyNumbers.slice(0, 2)}.${onlyNumbers.slice(2)}`;
    if (onlyNumbers.length <= 8)
      return `${onlyNumbers.slice(0, 2)}.${onlyNumbers.slice(2, 5)}-${onlyNumbers.slice(5)}`;

    return `${onlyNumbers.slice(0, 2)}.${onlyNumbers.slice(2, 5)}-${onlyNumbers.slice(5, 8)}`;
  };

  const handleChange = (e) => {
    const formattedValue = formatCep(e.target.value);
    onChange(formattedValue);
  };

  return (
    <input
      {...props}
      type="text"
      value={zipCode}
      maxLength={10}
      placeholder="00.000-000"
      className={`mt-2 p-2 border rounded-md w-full focus:outline-none transition-all
        ${zipCodeError
          ? 'border-red-500 focus:border-red-500'
          : 'border-gray-300 focus:border-blue-500'
        }`}
      onChange={handleChange}
    />
  )
}

export default ZipCodeInput
