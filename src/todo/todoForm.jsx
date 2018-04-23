import React from 'react'
import Grid from '../template/grid'
import IconButton from '../template/iconButton'

export default props => {
    const keyHandler = (event)  => {
        if (event.key === 'Enter') {
            event.shiftKey ? props.handleSearch() : props.handleAdd()
        } else if (event.key === 'Escape') {
            props.handleClear()
        }
    }

    return (
        <div role='form' className='todoForm'>
            <Grid cols='12 9 10'>
                <input id='description'
                    className='form-control'
                    placeholder='Adicione uma tarefa'
                    onChange={props.handleChange}
                    onKeyUp={keyHandler}
                    value={props.description} />
            </Grid>
            <Grid cols='12 3 2'>
                <IconButton icon='plus' style='primary' onClick={props.handleAdd}/>
                <IconButton icon='search' style='info' onClick={props.handleSearch}/>
                <IconButton icon='close' style='default' onClick={props.handleClear}/>
            </Grid>
        </div>
    )
}