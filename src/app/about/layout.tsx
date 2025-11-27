import React, {FC} from "react";


interface Props{
    children:React.ReactNode;
}

const AboutLayout : FC<Props>= ({children}) => {
    return <section>{children}</section>
}

export default AboutLayout;