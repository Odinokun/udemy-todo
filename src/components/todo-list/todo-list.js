import React from 'react';
import './todo-list.css';

import TodoListItem from '../todo-list-item';

const TodoList = ({ todos, onDeleted, onToggleDone }) => {

    const elements = todos.map((item) => {

        // выделяем id из массива объектов и передаем его отдельно
        // в ...itemProps передаем все значения с одинаковыми названиями кроме id
        const { id, ...itemProps } = item;

        return (
            <li key={id} className="list-group-item">
                <TodoListItem
                    { ...itemProps }
                    onDeleted = {() => onDeleted(id) }
                    onToggleDone = {() => onToggleDone(id)}/>
            </li>
        );
    });


    return (
        <ul className="list-group todo-list">
            { elements }
        </ul>
    );
};

export default TodoList;