"use client"

import { useAuthStore } from '@/store/auth.store';
import { useIngredientStore } from '@/store/ingredient.store';
import { Table, TableHeader, TableColumn, TableBody, TableCell, TableRow, Button } from '@heroui/react';
import { CATEGORY_OPTIONS, UNIT_OPTIONS } from '@/constants/select-options';

const IngredientsTable = () => {
  const { ingredients, removeIngredient, isLoading } = useIngredientStore();
  const { isAuth } = useAuthStore();


  const handleDelete = async (id: string) => {
    if (!isAuth) {
      alert('You must be logged in to delete an ingredient.');
      return;
    }

    const confirmed = confirm('Are you sure you want to delete this ingredient?');
    if (confirmed) {
      await removeIngredient(id);
    }
  };

    function getCategoryLabel(value: string) {
        const option = CATEGORY_OPTIONS.find(opt => opt.value === value);
        return option ? option.label : value;
    }

    function getUnitLabel(value: string) {
        const option = UNIT_OPTIONS.find(opt => opt.value === value);
        return option ? option.label : value;
    }

    if(!isAuth){
      return "Not authorized";
    }

  return !isLoading ? (
    <Table
      aria-label="Список ингредиентов"
      classNames={{
        wrapper: "mt-4",
        table: "w-full",
        th: "text-black",
        td: "text-black"
      }}
    >

        <TableHeader>
            <TableColumn>Название</TableColumn>
            <TableColumn>Категория</TableColumn>
            <TableColumn>Ед. изм.</TableColumn>
            <TableColumn>Цена за единицу</TableColumn>
            <TableColumn>Описание</TableColumn>
            <TableColumn>Действия</TableColumn>
        </TableHeader>
        <TableBody>
        {ingredients.map((ingredient) => (
            <TableRow key={ingredient.id}>
            <TableCell>{ingredient.name}</TableCell>
            <TableCell>{getCategoryLabel(ingredient.category)}</TableCell>
            <TableCell>{getUnitLabel(ingredient.unit)}</TableCell>
            <TableCell>
                {ingredient.pricePerUnit != null
                ? `${ingredient.pricePerUnit} ₽`
                : "-"}
            </TableCell>
            <TableCell>{ingredient.description || "-"}</TableCell>
            <TableCell>
                <Button 
                color="danger"
                variant="light"
                size="sm"
                onPress={() => handleDelete(ingredient.id)}
                >
                Удалить
                </Button>
            </TableCell>
            </TableRow>
        ))}
        </TableBody>
      
    </Table>
  ) : (<div>Loading...</div>);
};

export default IngredientsTable;