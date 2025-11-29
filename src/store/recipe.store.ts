import { create } from 'zustand';
import { IRecipe } from '@/types/recipe';
import { getRecipes, createRecipe, updateRecipe, deleteRecipe } from '@/actions/recipe';

interface IActionResult {
  success: boolean;
  recipe?: IRecipe;
  error?: string;
}

interface IRecipeState {
  recipes: IRecipe[];
  isLoading: boolean;
  error: string | null;
  loadRecipes: () => Promise<void>;
  addRecipe: (formData: FormData) => Promise<IActionResult>;
  updateRecipe: (id: string, formData: FormData) => Promise<IActionResult>;
  removeRecipe: (id: string) => Promise<void>;
}

export const useRecipeStore = create<IRecipeState>()((set) => ({
  recipes: [],
  isLoading: false,
  error: null, 
    loadRecipes: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await getRecipes() as { success: boolean; recipes: IRecipe[]; error?: string};
            if(response.success) {
                set({ recipes: response.recipes, isLoading: false });
            } else {
                set({ error: response.error || "Unknown error", isLoading: false });
            }
        } catch (error) {
            console.log("Error loading recipes:", error);
            set({ error: "Error getting recipe: "+(error as Error).message, isLoading: false });
        }
    },
    addRecipe: async (formData: FormData) => {
        // Implementation for adding a recipe
        set({error: null});

        try{
            const response = await createRecipe(formData) as { success: boolean; recipe?: IRecipe; error?: string};
            if(response.success){
                set((state) => ({
                    recipes: [...state.recipes, response.recipe!] , isLoading: false
                }));
                return { success: true, recipe: response.recipe };
            } else {
                return { success: false, error: response.error || "Unknown error" };
            }
        } catch(error){
            console.log("Error adding recipe:", error);
            set({ error: "Error adding recipe: " + (error as Error).message , isLoading: false });
            return { success: false, error: (error as Error).message };
        }
    },
    updateRecipe: async (id: string, formData: FormData) => {
        set({ error: null });

        try {
        const result = await updateRecipe(id, formData) as { success: boolean; recipe?: IRecipe; error?: string};
        if (result.success) {
            set((state) => ({
            recipes: state.recipes.map((recipe) =>
                recipe.id === id ? result.recipe! : recipe
            ),
            isLoading: false,
            }));

            return { success: true, recipe: result.recipe };
        } else {
            set({ error: result.error, isLoading: false });
            return { success: false, error: result.error };
        }

        } catch (error) {
            console.log("error", error);
            const errorMessage = "Ошибка при обновлении рецепта"; 
            set({ error: errorMessage, isLoading: false });
            return { success: false, error: errorMessage };
        }
    
    },
    removeRecipe: async (id: string) => {
            set({ error: null });
            try {
                const result = await deleteRecipe(id);
                if (result.success) {
                    set((state) => ({
                    recipes: state.recipes.filter((recipe) => recipe.id !== id),
                    isLoading: false,
                    }));

                } else {
                    set({ error: result.error, isLoading: false });
                }
            } catch (error) {
                console.log("error", error);
                const errorMessage = "Ошибка при удалении рецепта"; 
                set({ error: errorMessage, isLoading: false });
            }
    },
}));