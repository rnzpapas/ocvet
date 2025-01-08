import {Link as RouterLink} from "react-router";

function Link({txtContent, style, onClickFunc, toPage}) {
  return (
    <RouterLink to={toPage}
        className={`font-lato text-azure font-semibold cursor-pointer hover:underline ${style}`}
        onClick={onClickFunc}
    > 
        {txtContent} 
    </RouterLink>
  )
}

export default Link