

// export const fetchHeroes = createAction

// export const fetchHeroes = (request) => (dispatch) => {
//     dispatch(heroesFetching());
//     request("http://localhost:3001/heroes")
//         .then(data => dispatch(heroesFetched(data)))
//         .catch(() => dispatch(heroesFetchingError()))
// }



// export const heroesFetching = () => {
//     return {
//         type: 'HEROES_FETCHING'
//     }
// }

// export const heroesFetched = (heroes) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload:heroes
//     }
// }

// export const heroesFetchingError = () => {
//     return {
//         type: 'FILTERS_FETCHING_ERROR'
//     }
// }

// export const filtersFetching = () => {
//     return {
//         type: 'FILTERS_FETCHING'
//     }
// }

// export const filtersFetched = (filters) => {
//     return {
//         type: 'FILTERS_FETCHED',
//         payload:filters
//     }
// }

// export const filtersFetchingError = () => {
//     return {
//         type: 'FILTERS_FETCHING_ERROR'
//     }
// }

// export const changeFilterName = (filterName) => {
//     return {
//         type: 'CHANGE_FILTER_NAME' ,
//         payload:filterName
//     }
// }


// export const heroDeleted = (id) => {
//     return {
//         type: 'HERO_DELETED' ,
//         payload:id
//     }
// }


// export const heroCreated = (hero) => {
//     return {
//         type: 'HERO_CREATED' ,
//         payload:hero
//     }
// }