import InputField from "./InputField"

function Table({headers, data}) {

  return (
    <table> 
        <thead className="bg-raisin-black">
            <tr className=" rounded-[10px]">
                {headers.map((header, index) => (
                    <th key={index} className="text-white-smoke font-lato text-content-md py-2 px-10"> 
                        <section className="flex gap-2">
                            <p>{header.title} </p>
                            {header.isSortable ? 
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className={`fill-white-smoke w-[10px] ${header.isSorted ? 'hidden' : 'block'}`}>
                                        <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className={`fill-white-smoke w-[10px]  ${header.isSorted ? 'block' : 'hidden'}`}>
                                        <path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l256 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"/>
                                    </svg>
                                </>
                                :
                                ""
                            }
                        </section>   
                    </th>
                ))}
            </tr>
        </thead>
        <tbody>
            {data.length > 0 ? 
                data.map((info, index) => (
                    <tr key={index} className="border-b-2 border-silver hover:bg-silver">
                        {Object.keys(info).map((key, index) => (
                            <td className="py-2 px-10"> {info[key]} </td>
                        )) }
                        <td>
                            <section className="flex gap-2 items-center justify-center">
                                <InputField type={"checkbox"}/>
                                <InputField type={"checkbox"}/>
                            </section>
                        </td>
                    </tr>
                ))
                :
                ""
            }
        </tbody>
    </table>
  )
}

export default Table