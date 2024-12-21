
function Link({txtContent, style, onClickFunc}) {
  return (
    <a 
        href=""
        className={`font-lato text-azure font-semibold hover:underline ${style}`}
        onClick={onClickFunc}
    > 
        {txtContent} 
    </a>
  )
}

export default Link