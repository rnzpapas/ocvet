
function InputField({type, placeholder, style, isReadOnly = false, isDisabled = false, value, onChangeFunc, name}) {
  const readOnlyStyle = "bg-[#DFDFDF]"
  const defaultStyle = ""
  return (
    <input 
        className={`font-lato border rounded-[5px] border-silver py-2 px-2 focus:outline-raisin-black-light placeholder:font-lato ${style} ${isReadOnly ? readOnlyStyle : ""}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange = {onChangeFunc}
        readOnly = {isReadOnly}
        disabled = {isDisabled}
        name = {name}
    />
  )
}

export default InputField