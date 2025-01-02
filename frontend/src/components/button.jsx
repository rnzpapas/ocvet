
function Button({style, txtContent, isActive = true, onClickFunc}) {
  const activeStyle = "bg-raisin-black text-white-smoke";
  const inactiveStyle = "bg-white-smoke text-raisin-black border-2 border-raisin-black hover:text-white-smoke"
  return (
    <button 
      className={`font-lato py-1 px-10 rounded-[5px] uppercase text-content-xtrasm xxl:text-content-sm xxxl:text-content-md font-semibold hover:bg-raisin-black-light ${isActive ? activeStyle : inactiveStyle } ${style}`}
      onClick={onClickFunc}
    > 
      {txtContent} 
    </button>
  )
}

export default Button