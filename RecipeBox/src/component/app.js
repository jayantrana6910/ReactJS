import React, {Component} from 'react';
import Accordion from 'react-bootstrap/lib/Accordion';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Modal from 'react-bootstrap/lib/Modal';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';

class App extends Component {

    state ={
        recipes: [

        ],
        showAdd: false,
        showEdit: false,
        currentIndex: 0,
        addRecipe: {name: '', ingredients: [], cookingTime: ''}
    }

    deleteRecipe(index) {
        let recipes = this.state.recipes.slice();
        recipes.splice(index, 1);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        this.setState({recipes});
    }

    saveRecipe() {
        let recipes = this.state.recipes.slice();
        recipes.push({name: this.state.addRecipe.name, ingredients: this.state.addRecipe.ingredients});
        localStorage.setItem('recipes', JSON.stringify(recipes));
        this.setState({recipes});
        this.setState({addRecipe: {name: '', ingredients: []}});
        this.close();
    }

    updateRecipe(name, ingredients) {
        this.setState({addRecipe:{name: name, ingredients: ingredients}});
    }

    close = () =>{
        if(this.state.showAdd) {
            this.setState({showAdd: false})
        }
        if(this.state.showEdit) {
            this.setState({showEdit: false})
        }
    }

    open = (state, currentIndex) =>{
        this.setState({[state]: true});
        this.setState({currentIndex});
    }

    updateRecipeName(name, currentIndex) {
        let recipes = this.state.recipes.slice();
        recipes[currentIndex] = {name: name, ingredients: recipes[currentIndex].ingredients};
        localStorage.setItem('recipes', JSON.stringify(recipes));
        this.setState({recipes});
    }

    updateIngredients(ingredients, currentIndex) {
        let recipes = this.state.recipes.slice();
        recipes[currentIndex] = {name: recipes[currentIndex].name, ingredients: ingredients};
        localStorage.setItem('recipes', JSON.stringify(recipes));
        this.setState({recipes});
    }

    componentDidMount() {
        let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
        this.setState({recipes});
    }

    render() {
        const {recipes, addRecipe, currentIndex} = this.state;

        return (
            <div className="container">
                {recipes.length > 0 && (
                    <div>
                        <Accordion>
                            {recipes.map((recipe, index)=>(
                                <Panel header={recipe.name} eventKey={index} key={index} bsStyle="info" defaultExpanded collapsible>
                                    <ol>
                                        {recipe.ingredients.map((item)=>(
                                            <li key={item}>{item}</li>
                                        ))}
                                    </ol>
                                    <ButtonToolbar>
                                        <Button bsStyle="danger" onClick={(event)=>this.deleteRecipe(index)}>Delete Recipe</Button>
                                        <Button bsStyle="default" onClick={(event)=>this.open("showEdit", index)}>Edit Recipe</Button>
                                    </ButtonToolbar>
                                </Panel>
                            ))}
                        </Accordion>

                        <Modal show={this.state.showEdit} onHide={this.close}>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit Recipe</Modal.Title>
                                <Modal.Body>
                                    <FormGroup controlId="formBasicText">
                                        <ControlLabel>Name</ControlLabel>
                                        <FormControl
                                            type="text"
                                            value={recipes[currentIndex].name}
                                            placeholder="Enter Recipe Name"
                                            onChange={(event)=>this.updateRecipeName(event.target.value, currentIndex)}
                                        ></FormControl>
                                    </FormGroup>
                                    <FormGroup controlId="formControlTextArea">
                                        <ControlLabel>Ingredients</ControlLabel>
                                        <FormControl
                                            type="textarea"
                                            value={recipes[currentIndex].ingredients}
                                            placeholder="Enter Ingredients (Separate by Commas)" onChange={(event)=>this.updateIngredients(event.target.value.split(","), currentIndex)}
                                        ></FormControl>
                                    </FormGroup>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button bsStyle="info" onClick={this.close}>Save</Button>
                                </Modal.Footer>
                            </Modal.Header>
                        </Modal>
                    </div>
                )}

                <Modal show={this.state.showAdd} onHide={this.close}>

                    <Modal.Header closeButton>
                        <Modal.Title>Add Recipe</Modal.Title>
                        <Modal.Body>
                            <FormGroup controlId="formBasicText">
                                <ControlLabel>Name</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={addRecipe.name}
                                    placeholder="Enter Recipe Name"
                                    onChange={(event)=>this.updateRecipe(event.target.value, addRecipe.ingredients)}
                                ></FormControl>
                            </FormGroup>
                            <FormGroup controlId="formControlTextArea">
                                <ControlLabel>Ingredients</ControlLabel>
                                <FormControl
                                    type="textarea"
                                    value={addRecipe.ingredients}
                                    placeholder="Enter Ingredients (Separate by Commas)"
                                    onChange={(event)=>this.updateRecipe(addRecipe.name, event.target.value.split(","))}
                                ></FormControl>
                            </FormGroup>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button bsStyle="info" onClick={(event)=> this.saveRecipe()}>Save</Button>
                        </Modal.Footer>
                    </Modal.Header>
                </Modal>
                <Button bsStyle="primary" onClick={(event)=>this.open("showAdd", currentIndex)}>Add Recipe</Button>
            </div>
        );
    }

}

export default App