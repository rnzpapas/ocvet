
function Link({txtContent, style, onClickFunc}) {
  return (
    <h5 
        className={`font-lato text-azure font-semibold cursor-pointer hover:underline ${style}`}
        onClick={onClickFunc}
    > 
        {txtContent} 
    </h5>
  )
}

export default Link