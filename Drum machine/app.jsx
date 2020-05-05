


class Drum extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:''
        }
    }
    
    btnClick1(){
        this.setState({
            name:'Sound1'
        })
        document.getElementById('op1').innerHTML=this.state.name;
        document.getElementById('Q').play();
    }
    
    btnClick2(){
        this.setState({
            name:'Sound2'
        })
        document.getElementById('op1').innerHTML=this.state.name;
        document.getElementById('W').play();
    }
    
    btnClick3(){
        this.setState({
            name:'Sound3'
        })
        document.getElementById('op1').innerHTML=this.state.name;
        document.getElementById('E').play();
    }
    
    btnClick4(){
        this.setState({
            name:'Sound4'
        })
        document.getElementById('op1').innerHTML=this.state.name;
        document.getElementById('A').play();
    }
    
    btnClick5(){
        this.setState({
            name:'Sound5'
        })
        document.getElementById('op1').innerHTML=this.state.name;
        document.getElementById('S').play();
    }
    
    btnClick6(){
        this.setState({
            name:'Sound6'
        })
        document.getElementById('op1').innerHTML=this.state.name;
        document.getElementById('D').play();
    }
    
    btnClick7(){
        this.setState({
            name:'Sound7'
        })
        document.getElementById('op1').innerHTML=this.state.name;
        document.getElementById('Z').play();
    }
    
    btnClick8(){
        this.setState({
            name:'Sound8'
        })
        document.getElementById('op1').innerHTML=this.state.name;
        document.getElementById('X').play();
    }
    
    btnClick9(){
        this.setState({
            name:'Sound9'
        })
        document.getElementById('op1').innerHTML=this.state.name;
        document.getElementById('C').play();
    }
    
    
    render(){
        return(
            <div id="drum-machine">
               <div class="btn-side">
                <button class="drum-pad" id='btn1' onClick={this.btnClick1.bind(this)}>Q
                    <audio controls id="Q">
                        <source src="clay.mp3" type="audio/mpeg"></source>
                    </audio>
                </button>
                
                <button class="drum-pad"  id='btn2' onClick={this.btnClick2.bind(this)}>W
                    <audio controls id="W">
                        <source src="clay.mp3" type="audio/mpeg"></source>
                    </audio>
                </button>
                
                <button class="drum-pad"  id='btn3' onClick={this.btnClick3.bind(this)}>E
                    <audio controls id="E">
                        <source src="clay.mp3" type="audio/mpeg"></source>
                    </audio>
                </button>
                
                <button class="drum-pad"  id='btn4' onClick={this.btnClick4.bind(this)}>A
                    <audio controls id="A">
                        <source src="clay.mp3" type="audio/mpeg"></source>
                    </audio>
                </button>
                
                <button class="drum-pad"  id='btn4' onClick={this.btnClick5.bind(this)}>S
                    <audio controls id="S">
                        <source src="clay.mp3" type="audio/mpeg"></source>
                    </audio>
                </button>
                
                <button class="drum-pad"  id='btn4' onClick={this.btnClick6.bind(this)}>D
                    <audio controls id="D">
                        <source src="clay.mp3" type="audio/mpeg"></source>
                    </audio>
                </button>
                
                <button class="drum-pad"  id='btn4' onClick={this.btnClick7.bind(this)}>Z
                    <audio controls id="Z">
                        <source src="clay.mp3" type="audio/mpeg"></source>
                    </audio>
                </button>
                
                <button class="drum-pad"  id='btn4' onClick={this.btnClick8.bind(this)}>X
                    <audio controls id="X">
                        <source src="clay.mp3" type="audio/mpeg"></source>
                    </audio>
                </button>
                
                <button class="drum-pad"  id='btn4' onClick={this.btnClick9.bind(this)}>C
                    <audio controls id="C">
                        <source src="clay.mp3" type="audio/mpeg"></source>
                    </audio>
                </button>
                
                
                </div>
                
                
                <div id="display">
                       
                    <p id="op1"></p>
                </div>
                
            </div>
        )
    }
    
}
ReactDOM.render(React.createElement(Drum, null),document.getElementById('root'));
