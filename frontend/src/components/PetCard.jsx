import { useEffect, useState } from "react"
import NoImg from '@/assets/noimg.png';

function PetCard({petName, img = "", style, onClickFunc, id}) {
  let imgDirSrc = import.meta.env.VITE_AWS_BUCKET_CONNECTION;

  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {setImgSrc(src => src = img)},[img])
  return (
    <section className="w-[80px] h-[100px] xl:w-[140px] xl:h-[150px] cursor-pointer relative" onClick={onClickFunc} id={id}>
        <section className=" h-[80%]">
          <img 
            src={`${imgSrc ? `${imgDirSrc}/pet/${imgSrc}` : NoImg}`}
            alt={`${imgSrc ? imgSrc : "No Image"}`}
            className="h-full w-full object-cover rounded-tl-lg rounded-tr-lg" 
          />
        </section>
        <section className="bg-raisin-black h-[20%] flex items-center justify-center w-full rounded-bl-lg rounded-br-lg ">
            <p className="text-white-smoke font-lato font-semibold text-content-xtrasm"> {petName} </p>
        </section>
    </section>
  )
}

export default PetCard