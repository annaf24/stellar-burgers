import { getIngredientsApi } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TIngredient } from "@utils-types";

type TIngredientsState = {
    items: TIngredient[];
    isLoading: boolean;
    error: string | null;
}

const initialState: TIngredientsState = {
    items: [],
    isLoading: false,
    error: null,
}

//Thunk-функция
export const fetchIngredients = createAsyncThunk(
    'ingredients/fetchIngredients',
    async () => await getIngredientsApi()
)

//Slice
const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {},
    selectors: {
        getIngredients: (state) =>  state.items,
        getIsLoading: (state) => state.isLoading,
        getError: (state) => state.error,  
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchIngredients.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchIngredients.fulfilled, (state, action) => {
            state.isLoading = false;
            state.items = action.payload;
        })
        .addCase(fetchIngredients.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || 'Ошибка';
        })
    }
})

export const ingredientsSelectors = ingredientsSlice.selectors;
// LOG В компонентах const { items } = useSelector(ingredientsSelectors.getIngredients);
export default ingredientsSlice;