import React from 'react';
import ReactDOM from 'react-dom';

var events = {}

var Cells = React.createClass({

    getInitialState: function () {

        return {selected: false, nextState: false}
    },

    isSelected: function (r, c) {

        var size = Math.sqrt(this.props.cells.length)

        if (r == -1) r = size - 1
        if (r == size) r = 0

        if (c == -1) c = size - 1
        if (c == size) c = 0

        var id = r * size + c
        return this.props.cells[id].state.selected

    },

    calculate: function () {

        var neighbours = 0
        var size = Math.sqrt(this.props.cells.length)
        var row = Math.floor(this.props.id / size)
        var col = this.props.id - row * size

        if ( this.isSelected( row - 1, col ) ) neighbours += 1
        if ( this.isSelected( row - 1, col + 1 ) ) neighbours += 1
        if ( this.isSelected( row - 1, col - 1 ) ) neighbours += 1

        if ( this.isSelected( row, col + 1 ) ) neighbours += 1
        if ( this.isSelected( row, col - 1 ) ) neighbours += 1

        if ( this.isSelected( row + 1, col ) ) neighbours += 1
        if ( this.isSelected( row + 1, col + 1 ) ) neighbours += 1
        if ( this.isSelected( row + 1, col - 1 ) ) neighbours += 1

        this.state.nextState = false
        if ( this.state.selected ) {
            if ( neighbours < 2 ) this.state.nextState = false
            if ( neighbours > 3 ) this.state.nextState = false
            if ( neighbours == 3 || neighbours == 2 ) this.state.nextState = true
        } else {
            if ( neighbours == 3 ) this.state.nextState == true
        }
    },

    renderNext: function () {

        this.setState({selected: this.state.nextState})
    },

    componentDidMount: function () {

        this.props.cells[this.props.id] = this
        $(events).on('calculate', this.calculate)
        $(events).on('renderNext', this.renderNext)
    },

    onclick: function (e) {

        this.setState({selected: !this.state.selected})
    },

    render: function () {

        return (
            <div className={this.state.selected?"cell active":"cell"}
                 onClick={this.onclick}>
            </div>
        )
    }
})

var App = React.createClass({
    
    getInitialState: function () {

        var c = []
        for (var i=0; i<100; i++) {
            c.push( <Cells key={i} id={i} cells={c} /> )
        }
        return {cells: c}
    },

    render: function () {

        return (
            <div> { this.state.cells } </div>
        )
    }
})

$(document).keydown(function (e) {
    if ( e.which == 32 ) {
        $(events).trigger("calculate");
        $(events).trigger("renderNext");
    }
})

ReactDOM.render(
    <div>
        <App />
    </div>
    ,document.getElementById('app')
)