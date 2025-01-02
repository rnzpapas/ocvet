
function Link({txtContent, style, onClickFunc}) {
  return (
    <h5 
        href=""
        className={`font-lato text-azure font-semibold hover:underline ${style}`}
        onClick={onClickFunc}
    > 
        {txtContent} 
    </h5>
  )
}

export default Link