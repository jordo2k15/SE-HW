class App extends React.Component{
    state = {
        score: 0,
        category: '',
        points: 100, 
        clue: '',
        answer:'',
        isRevealed: false
    }
    getQuestion = () => { // this function is getting answer from APi randomly
        // this.state.score
        fetch ("http://jservice.io/api/random") //getting data from APi
        .then ((response) => { 
            return response.json();
        })
        .then((json)=> {
            const data = json [0];
            this.setState({
                category: data.category.title,
                points: data.value, 
                clue: data.question, 
                answer: data.answer,
                isRevealed:false
            })
        })
    }

    increaseScore = () => { //this function will increase the points
        this.setState({
            score: this.state.score + this.state.points,
        })
    }
    decreaseScore = () =>{ // this function will decrease the points
        this.setState({
            score: this.state.score - this.state.points,
        })
    }
   
    resetScore = () => { // this function resets the score
        this.setState({
            score: 0,
        })
    }
    getAnswer = () =>{   // this function reveals the answer
        this.setState({
            isRevealed:!this.state.isRevealed,
        })
    }
    render() {
        return(
        <div className="frame">
                 <h1> Welcome to Jeopardy!</h1>
                 <h2> <span>Score:</span> {this.state.score}</h2> { /* this will print score in the page */}
        <div className="frame">

                <button className= "increase" onClick = {this.increaseScore} class="btn btn-info"> Increase </button> { /* this will print increase score */}
                <button className= "down" onClick = {this.decreaseScore}  class="btn btn-success"> Decrease </button> { /* this will print decrease score */}
                <button className= "reset" onClick = {this.resetScore} class="btn btn-danger"> Reset </button> { /* this will reset score */}
        </div>
                 <h2 id="header"> Let's Play</h2>
                <button  className= "" onClick = {this.getQuestion} class="btn btn-warning"> Get Question</button> { /* this button will get the answer */}
                 <h2><span>Category:</span> {this.state.category}</h2>  { /* prints category  in webpage*/}
                 <h2><span>Points:</span> {this.state.points}</h2> { /* prints points in webpage */}
                 <h2><span>Question:</span> {this.state.clue}</h2> { /* prints clue in webpage */}
                <button className = "answer" onClick= {this.getAnswer} class="btn btn-primary">Click to Reveal Answer </button> { /* gives answer */}
                {this.state.isRevealed ?<h2> <span>Answer:</span> {this.state.answer}</h2>:''
                } { /* checks if is revealed if it is false then prints the answer */}
         </div>
            )
    }
}
ReactDOM.render(<App/>, document.querySelector('.root'));
