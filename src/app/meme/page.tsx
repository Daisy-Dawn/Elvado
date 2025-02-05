import MemeCoinsDisplay from '@/components/meme-comps/MemeCoinsDisplay'
import MemeHero from '@/components/meme-comps/MemeHero'

export default function Meme() {
    return (
        <div className="min-h-screen my-[3rem] mx-[4rem]">
            <MemeHero />
            <MemeCoinsDisplay />
        </div>
    )
}
