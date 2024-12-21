
function InputField({type, placeholder, style, isReadOnly = false, value, onChangeFunc}) {
  const readOnlyStyle = "bg-[#DFDFDF]"
  const defaultStyle = ""
  return (
    <input 
        className={`font-lato border rounded-[5px] border-silver py-2 px-2 focus:outline-raisin-black-light placeholder:font-lato ${style} ${isReadOnly ? readOnlyStyle : ""}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange = {onChangeFunc}
    />
  )
}

export default InputField