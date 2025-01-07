import AccountInfo from '../../components/AccountInfo'
import MngrNav from '../../components/navbars/MngrNav'

function MngrUserInfo() {
    return (
        <section className="flex w-full">
        <MngrNav />
        <section className="px-5 py-5 w-full">
            <h5 className="font-instrument-sans font-bold text-headline-lrg uppercase text-raisin-black">account</h5>
            <section className="flex flex-col gap-5">
                <AccountInfo />
            </section>
        </section>
    </section>
    )
}

export default MngrUserInfo