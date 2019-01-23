import React from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';

import './app.css';

const App = () => {

    const todoData = [
        { label: 'Drink Coffee', important: false, id: 1 },
        { label: 'Make Awesome App', important: true, id: 2 },
        { label: 'Create portfolio', important: true, id: 3 },
        { label: 'Find cool job', important: true, id: 4 },
        { label: 'Go to fishing', important: false, id: 5 }
    ];

    return (
        <div className="todo-app">
            <AppHeader toDo={2} done={3} />
            <div className="top-panel d-flex">
                <SearchPanel />
                <ItemStatusFilter />
            </div>

            <TodoList
                todos={todoData}
                 onDeleted={ (id) => console.log('del', id) } />
        </div>
    );
};

export default App;