import { useEffect, useState } from "react"

function PetCard({petName, img = "", style, onClickFunc, id}) {
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {setImgSrc(src => src = img)},[img])
  return (
    <section className="w-[120px] h-[120px] cursor-pointer relative" onClick={onClickFunc} id={id}>
        <section className="bg-raisin-black w-full h-full absolute rounded-tl-lg rounded-tr-lg opacity-0"></section>
        <section className=" h-[80%]">
          <img src={`../../pet/${imgSrc}`} alt="as" className="h-full w-full rounded-tl-lg rounded-tr-lg" />
        </section>
        <section className="bg-raisin-black h-[20%] flex items-center justify-center w-full rounded-bl-lg rounded-br-lg ">
            <p className="text-white-smoke font-lato font-semibold text-content-xtrasm"> {petName} </p>
        </section>
    </section>
  )
}

export default PetCard