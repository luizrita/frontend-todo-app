import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Grid from '../template/grid'
import IconButton from '../template/iconButton'
import { add, changeDescription, clear, search } from './todoActions'

class TodoForm extends Component {
    constructor(props) {
        super(props)
        this.keyHandler = this.keyHandler.bind(this)
    }

    componentWillMount() {
        this.props.search();
    }

    keyHandler(event) {
        const { add, description, clear, search } = this.props

        if (event.key === 'Enter') {
            event.shiftKey ? search() : add(description)
        } else if (event.key === 'Escape') {
            clear()
        }
    }

    render() {
        const { add, description, clear, search } = this.props

        return (
            <div role='form' className='todoForm'>
                <Grid cols='12 9 10'>
                    <input id='description'
                        className='form-control'
                        placeholder='Adicione uma tarefa'
                        onChange={this.props.changeDescription}
                        onKeyUp={this.keyHandler}
                        value={this.props.description} />
                </Grid>
                <Grid cols='12 3 2'>
                    <IconButton icon='plus' style='primary' onClick={ () => add(description) }/>
                    <IconButton icon='search' style='info' onClick={ search }/>
                    <IconButton icon='close' style='default' onClick={ clear }/>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({description: state.todo.description})
const mapDispatchToProps = dispatch => bindActionCreators({ add, changeDescription, clear, search }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)