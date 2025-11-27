import Title from "@/components/UI/layout/title";

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-yellow-100 to-yellow-50 flex flex-col items-center justify-start p-8">
            <Title title="About Italian Kitchen" />

            {/* Hero Section */}
            <section className="text-center mt-12 mb-12 max-w-3xl">
                <h1 className="text-5xl md:text-6xl font-extrabold text-red-700 mb-6">
                    Italian Kitchen
                </h1>
                <p className="text-xl md:text-2xl text-gray-700">
                    Bringing the heart of Italy to your table. Authentic flavors, rich traditions, and the joy of homemade meals.
                </p>
            </section>

            {/* Divider */}
            <hr className="w-24 border-t-4 border-red-700 mb-12" />

            {/* Content Section */}
            <section className="max-w-4xl text-center space-y-6">
                <p className="text-lg text-gray-700">
                    At Italian Kitchen, we celebrate the rich culinary heritage of Italy.
                    From handmade pasta to savory sauces and decadent desserts, every dish tells a story of passion and tradition.
                </p>
                <p className="text-lg text-gray-700">
                    Our mission is simple: to bring the authentic taste of Italy to every home.
                    We source fresh ingredients, follow traditional recipes, and infuse every meal with love and care.
                </p>
                <p className="text-lg text-gray-700">
                    Whether you are a seasoned chef or a home cooking enthusiast, Italian Kitchen is your guide
                    to creating memorable meals and enjoying the true spirit of Italian cuisine.
                </p>
            </section>
        </div>
    )
}

export default AboutPage;
