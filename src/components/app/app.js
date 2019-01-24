import React, { Component } from 'react';
import './app.css';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';


export default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            { label: 'Drink Coffee', important: false, id: 1 },
            { label: 'Make Awesome App', important: true, id: 2 },
            { label: 'Create portfolio', important: true, id: 3 },
            { label: 'Find cool job', important: true, id: 4 },
            { label: 'Go to fishing', important: false, id: 5 }
        ]
    };

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            //ищем индекс элемента у которого id точно такой как мы получили
            const idx = todoData.findIndex((el) => el.id === id);

            const newArray = [
                //находим кусок массива ДО удаляемого элемента
                ...todoData.slice(0, idx),
                //находим кусок массива ПОСЛЕ удаляемого элемента
                ...todoData.slice(idx + 1)
            ];
            //возвращаем измененный массив
            return {
                todoData: newArray
            };
        });
    };

    addItem = (text) => {
        // генерируем id и элемент
        const newItem = {
            label: text,
            important: false,
            id: this.maxId++
        };

        // добавляем элемент в массив
        this.setState(({ todoData }) => {
            const newArr = [
                //берем старый массив + новый элемент
                ...todoData,
                newItem
            ];

            return {
                todoData: newArr
            }
        });
    };

    render() {
        return (
            <div className="todo-app">
                <AppHeader toDo={2} done={3} />
                <div className="top-panel d-flex">
                    <SearchPanel />
                    <ItemStatusFilter />
                </div>

                <TodoList
                    todos={this.state.todoData}
                    onDeleted={ this.deleteItem }
                    />

                <ItemAddForm
                    addItem={ this.addItem } />
            </div>
        );
    }

};