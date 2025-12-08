// app/about/page.tsx
import Image from "next/image";

export default function AboutPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-rose-50 via-stone-100 to-rose-100 text-stone-900">
            <div className="max-w-2xl w-full text-center p-10 rounded-3xl shadow-2xl bg-white/80 backdrop-blur-lg border border-rose-100">

                <div className="relative w-full h-48 mb-6">
                    <Image
                        src="/hero.jpg"
                        alt="Итальянская кухня"
                        fill
                        className="object-cover rounded-2xl shadow-lg"
                    />
                </div>


                <h1 className="text-5xl font-serif mb-4 text-rose-700 tracking-wide">
                    Итальянская кухня 🍝🍷
                </h1>


                <div className="flex justify-center mb-6">
                    <span className="w-20 h-1 bg-rose-400 rounded-full"></span>
                </div>


                <p className="text-xl leading-relaxed text-stone-700 italic mb-6">
                    Мы верим, что еда должна быть праздником.
                    В нашей кухне — свежие продукты, традиции Италии и тёплое гостеприимство.
                    Паста аль денте, пицца из печи и десерты, в которые хочется возвращаться.
                </p>


                <blockquote className="text-lg text-stone-600 font-light italic">
                    «La vita è una combinazione di magia e pasta.»
                    <span className="block mt-2 text-sm text-stone-500">— Федерико Феллини</span>
                </blockquote>
            </div>
        </main>
    );
}
