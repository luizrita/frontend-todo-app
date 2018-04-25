import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Grid from '../template/grid'
import IconButton from '../template/iconButton'
import { changeDescription, search } from './todoActions'

class TodoForm extends Component {
    constructor(props) {
        super(props)
        this.keyHandler = this.keyHandler.bind(this)
    }

    componentWillMount() {
        this.props.search();
    }

    keyHandler(event) {
        if (event.key === 'Enter') {
            event.shiftKey ? this.props.handleSearch() : this.props.handleAdd()
        } else if (event.key === 'Escape') {
            this.props.handleClear()
        }
    }

    render() {
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
                    <IconButton icon='plus' style='primary' onClick={this.props.handleAdd}/>
                    <IconButton icon='search' style='info' onClick={this.props.handleSearch}/>
                    <IconButton icon='close' style='default' onClick={this.props.handleClear}/>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({description: state.todo.description})
const mapDispatchToProps = dispatch => bindActionCreators({ changeDescription, search }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)