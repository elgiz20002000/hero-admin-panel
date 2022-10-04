import './heroesList.scss'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchHeroes , filteredHeroesSelector} from './heroesSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import { CSSTransition, TransitionGroup } from 'react-transition-group';


const HeroesList = () => {
    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const filteredHeroes = useSelector(filteredHeroesSelector)

    useEffect(() => {
        dispatch(fetchHeroes())
    }, []);


    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return (
                <CSSTransition  timeout={500} classNames="item">
                    <h5 className="text-center mt-5">Героев пока нет</h5>
                </CSSTransition>
            )
        }

        return arr.map(({id, ...props}) => {
            return (
                <CSSTransition key={id}  timeout={500} classNames="item">
                    <HeroesListItem key={id} id={id} {...props}/>
                </CSSTransition>
                )
            })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <TransitionGroup component={'ul'}>
            {elements}
        </TransitionGroup>
    )
}

export default HeroesList;