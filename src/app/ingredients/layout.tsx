import React, {FC} from "react";


interface Props{
    children:React.ReactNode;
}

const IngredientsLayout : FC<Props>= ({children}) => {
    return <section>{children}</section>
}

export default IngredientsLayout;