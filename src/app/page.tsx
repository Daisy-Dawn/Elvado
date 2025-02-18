import MemeCoinsDisplay from '@/components/meme-comps/MemeCoinsDisplay'
import MemeHero from '@/components/meme-comps/MemeHero'

export default function Home() {
    return (
        <div className="min-h-screen my-[3rem] mx-[1rem] md:mx-[4rem]">
            <MemeHero />
            <MemeCoinsDisplay />
        </div>
    )
}
