import Title from "@/components/UI/layout/title";
import IngredientForm from "@/forms/ingredient.form";
import IngredientsTable from "@/components/UI/tables/ingredients";

const IngredientPage = () => {
    return (
        <>
            <Title title="Ingredients" />
            <IngredientForm />
            <IngredientsTable />
        </>
    );
};

export default IngredientPage;
