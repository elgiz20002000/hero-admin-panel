

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import {heroCreated} from '../heroesList/heroesSlice';
import { v4 as uuidv4 } from 'uuid';
import { selectAll } from "../heroesFilters/filtersSlice";
import { useSelector } from "react-redux";

const HeroesAddForm = () => {

    const dispatch = useDispatch() ,
    {request} = useHttp() ,
    filters = useSelector(selectAll)

    return (
        <Formik
         initialValues={{
            name: '',
            text: '',
            element: ''
        }}
        onSubmit={(values , {resetForm}) => {
            request("http://localhost:3001/heroes/" , 'POST' , JSON.stringify({id:uuidv4() , ...values}))
            .then(console.log('hero created'))
            .then(dispatch(heroCreated({id:uuidv4() , ...values})))
            resetForm({values:{   name: '', text: '', element: ''}})
        }}>
            <Form  method="POST" className="border p-4 shadow-lg rounded">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                    <Field 
                        required
                        type="text" 
                        name="name" 
                        className="form-control" 
                        id="name" 
                        placeholder="Как меня зовут?"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="text" className="form-label fs-4">Описание</label>
                    <Field as='textarea'
                        required
                        name="description" 
                        className="form-control" 
                        id="text" 
                        placeholder="Что я умею?"
                        style={{"height": '130px'}}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                    <Field as='select' 
                        required
                        className="form-select" 
                        id="element" 
                        name="element">
                        <option >Я владею элементом...</option>
                        {filters.map((item , index) => {
                            if(index !== 0) {
                                return  <option key={index} value={item.name}>{item.name}</option>
                            }
                        return null
                        })}
                    </Field>
                </div>

                <button type="submit"   className="btn btn-primary">Создать</button>
            </Form>
        </Formik>
    )
}

export default HeroesAddForm;