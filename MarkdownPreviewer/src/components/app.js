import React, { Component } from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';

let marked = require('marked');

class App extends Component {

    state = {
        markdown: ""
    }

    printOutput(markdown) {
        this.setState({markdown});
    }

    render() {
        let {markdown} = this.state;
        return (
            <div className='App container'>
                <div>
                    <FormGroup controlId="markdownTextarea">
                        <ControlLabel>Input</ControlLabel>
                        <FormControl componentClass="textarea" placeholder="Enter Text" value={markdown} onChange={(event)=>this.printOutput(event.target.value)}></FormControl>
                    </FormGroup>
                </div>
                <div>
                    <h1>Output</h1>
                    <div dangerouslySetInnerHTML={{__html: marked(markdown)}}>

                    </div>
                </div>
            </div>
        )
    }
}

export default App;