import React, { Component } from 'react';

import './todo-list-item.css';

export default class TodoListItem extends Component {

    constructor() {
        super();

        this.state = {
            done: false,
            important: false
        };

        // при клике на пункт добавляем/убираем к классу класс 'done'
        this.onLabelClick = () => {
            this.setState(({done}) => { /*деструктурируем из state свойство done*/
                return {
                    done: !done
                }
            });
        };

        // при клике на кнопку добавляем/убираем к классу класс 'important'
        // выделяем "дело" жирным шрифтом
        this.onMarkImportant = () => {
            this.setState(({important}) => { /*деструктурируем из state свойство important*/
                return {
                    important: !important
                }
            });
        };
    }

    render() {
        const { label, onDeleted } = this.props;
        const { done, important } = this.state;

        let classNames = 'todo-list-item';

        // если true, то добавляем класс done
        if (done) {
            classNames += ' done';
        }
        // если true, то добавляем класс important
        if (important) {
            classNames += ' important'
        }

        return (
            <span className={ classNames }>
                <span
                    className="todo-list-item-label"
                    onClick = { this.onLabelClick }>
                    {label}
                </span>

                <button type="button"
                        className="btn btn-outline-success btn-sm float-right"
                        onClick = { this.onMarkImportant }>
                <i className="fa fa-exclamation"/>
                </button>

                <button type="button"
                        className="btn btn-outline-danger btn-sm float-right"
                        /* вызываем при клике функцию родительском элементе */
                        onClick = { onDeleted } >
                <i className="fa fa-trash-o"/>
                </button>
            </span>
        );
    };
}