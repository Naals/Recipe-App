'use client'


export default function Footer() {
    return (
        <div
            className='flex flex-col md:flex-row justify-between items-center px-8 py-4 bg-red-700 text-yellow-50 text-sm md:text-base'>
            <p>
                © {new Date().getFullYear()} Italian Kitchen. All rights reserved.
            </p>
            <p className="mt-2 md:mt-0">
                Crafted with ❤️ for authentic Italian flavors.
            </p>
        </div>
    )
}
