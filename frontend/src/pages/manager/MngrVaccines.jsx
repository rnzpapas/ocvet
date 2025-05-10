import { useEffect, useState } from 'react';
import MngrNav from '@/components/navbars/MngrNav'

function MngrVaccines() {
    const [vaccines, setVaccines] = useState();

    const loadVaccines = async () => {

    }

    useEffect(() => {
        const dataPromise = async () => {
            let vaccs = await loadVaccines();
            setVaccines(vaccs);
        }
        dataPromise();
    },[])
    return (
    <section className="flex w-full">
        <MngrNav />
        <section className="px-5 py-5 w-full">
            <h5 className="font-instrument-sans font-bold text-headline-lrg uppercase text-raisin-black">VACCINES</h5>
            <section>
                <table>
                    <thead>
                        <tr>

                        </tr>
                    </thead>
                    <tbody>
                        <tr></tr>
                    </tbody>
                </table>
            </section>
        </section>
    </section>
    )
}

export default MngrVaccines
