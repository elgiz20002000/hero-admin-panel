import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';

// const initialState = {
//     filtersLoadingStatus: 'idle' ,
//     filters: [] ,
//     filterName:'all'
// }

const filtersAdapter = createEntityAdapter() ,
initialState = filtersAdapter.getInitialState({
    filterName:'all',
    filtersLoadingStatus: 'idle' 
})

export const fetchFilters = createAsyncThunk( 
    'filters/fetchFilters' ,
    async () => {
    const {request} = useHttp();
    return await request("http://localhost:3001/filters")
    }
)


const filtersSlice = createSlice({
    name:'filters',
    initialState,
    reducers: {
        changeFilterName:  (state , action) =>  {state.filterName =  action.payload}
    } ,
    extraReducers:(builder) => {
        builder
        .addCase(fetchFilters.pending ,  (state) =>  {state.filtersLoadingStatus = 'loading'})
        .addCase(fetchFilters.fulfilled , (state , action) => {
            filtersAdapter.setAll(state , action.payload)
            state.filtersLoadingStatus =  'idle' 
            })
        .addCase(fetchFilters.rejected , (state) =>  {state.filtersLoadingStatus = 'error'}) 
        .addDefaultCase(() => {})
    }
    
})
export const {selectAll} = filtersAdapter.getSelectors((state => state.filters))
const {actions , reducer} = filtersSlice


export default reducer
export const {
    filtersFetching ,
    filtersFetched ,
    filtersFetchingError ,
    changeFilterName
} = actions



