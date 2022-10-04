
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useRef } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchFilters, selectAll} from './filtersSlice';
import { changeFilterName } from  './filtersSlice'
import Spinner from "../spinner/Spinner";


const HeroesFilters = () => {

    const dispatch = useDispatch() ,
    filtersLoadingStatus = useSelector(state => state.filters.filtersLoadingStatus) ,
    ref = useRef([]) ,
    filters = useSelector(selectAll)

    useEffect(() => {
        dispatch(fetchFilters())
    }, []);



    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const focusOnItem = (index) => {
        ref.current.forEach(item => item.classList.remove('active'))
        ref.current[index].classList.add('active')
    }   

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Фильтры пока нет</h5>
        }
        let clazz = ''
        return arr.map((item , index) => {
            switch(item.name) {
                case "all":
                    clazz = 'btn-outline-dark active'
                    break
                case 'fire':
                    clazz = 'btn-danger'
                    break
                case 'water':
                    clazz = 'btn-primary'
                    break
                case 'wind':
                    clazz = 'btn-success'
                    break
                case 'earth':
                    clazz = 'btn-secondary'
                    break
                default:
                    return clazz
            }
            return <button
             key={item.id} 
             className={'btn ' + clazz}
             ref={(e) => ref.current[index] = e}
             onClick={() => {
                focusOnItem(index) 
                dispatch(changeFilterName(item.name))
             } }>
                {item.name}
             </button>
        })
    }
    const elements = renderHeroesList(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                   {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;