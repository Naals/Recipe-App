'use client'


const Title = ({title}: { title: string }) => {
    return (
        <div className="w-full flex justify-center mt-6 mb-12">
            <div className="text-3xl font-bold">{title}</div>
        </div>
    )
}

export default Title;