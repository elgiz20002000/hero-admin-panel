import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';

// const initialState = {
//     heroes: [],
//     heroesLoadingStatus: 'idle', 
// }

const heroesAdapter = createEntityAdapter({
    heroesLoadingStatus: 'idle'
})
const initialState = heroesAdapter.getInitialState()



export const fetchHeroes  = createAsyncThunk(
    'heroes/fetchHeroes' ,
    async () => {
    const {request} = useHttp();
      return await request("http://localhost:3001/heroes")
   }
)


const heroesSlice = createSlice({
    name:'heroes',
    initialState,
    reducers:{
        heroDeleted: (state , action) =>  heroesAdapter.removeOne(state , action.payload),
        heroCreated: (state , action) =>  heroesAdapter.addOne(state , action.payload)
    } ,
    extraReducers: (builder) => {
        builder
        .addCase(fetchHeroes.pending , (state) =>  {state.heroesLoadingStatus = 'loading'})
        .addCase(fetchHeroes.fulfilled , (state , action) => {
            heroesAdapter.setAll(state , action.payload)
            state.heroesLoadingStatus =  'idle' 
            }
        ) 
        .addCase(fetchHeroes.rejected ,  (state) =>  {state.heroesLoadingStatus = 'error'})
    }
})

const {selectAll} = heroesAdapter.getSelectors(state => state.heroes)

export const filteredHeroesSelector =  createSelector(
    selectAll,
    state => state.filters.filterName,
    (heroes , filterName) => {
        return filterName === 'all' ? heroes : heroes.filter(item => item.element === filterName)
    }
)



const {actions , reducer} = heroesSlice

export default reducer
export const {
    heroesFetching ,
    heroesFetched ,
    heroesFetchingError ,
    heroDeleted ,
    heroCreated 
} = actions