
class Break extends React.Component{
    handleInc=()=>{
        this.props.incBreak()
        if(this.props.run===false){
            this.props.setTime(this.props.breakkTime)
        }
    }
    
    handleDec=()=>{
        this.props.decBreak();
        if(this.props.run===false){
            this.props.setTime(this.props.breakTime)
        }
    }
    
    render(){
    return(
        <div>
            <button onClick={this.handleInc}>+</button>
            <span>{this.props.breakTime}</span>
            <button onClick={this.handleDec}>-</button>
        </div>
    )
    }
}

class Work extends React.Component{
    handleInc=()=>{
        this.props.incWork()
        if(this.props.run===false){
            this.props.setTime(this.props.workTime)
        }
    }
    
    handleDec=()=>{
        this.props.decWork();
        if(this.props.run===false){
            this.props.setTime(this.props.workTime)
        }
    }
    
    render(){
    return(
        <div>
            <button onClick={this.handleInc}>+</button>
            <span>{this.props.workTime}</span>
            <button onClick={this.handleDec}>-</button>
        </div>
    )
    }
}
class Timer extends React.Component{
    render(){
        return(
            <div id="timer">
                <span>{this.props.currTime}</span>
                <span>{this.props.cycle}</span>
            </div>
        )
    }
}

class Button extends React.Component{
    timer=()=>{
        if(this.props.run===true){
            clearInterval(this.props.id)
            this.props.setTime("25 : 00")
            this.props.startTime(this.props.workTime)
            this.props.runTime()
            
        }else{
            this.props.cycle==="session"?
            this.props.startTime(this.props.workTime):
            this.props.startTime(this.props.breakTime)
            
        }
    }
    
    handleReset=()=>{
        
        this.props.reset();
    }
    render(){
        return(
        <div id="start-stop">
            <button class="btn start" onClick={this.timer}>Start</button>
            <button class="btn pause" onClick={this.props.pause}>Pause</button>
            <button class="btn reset" onClick={this.handleReset}>Reset</button>
        </div>
        )
    }
}

class Control extends React.Component{
    render(){
    return(
        <div id="control">
            <Work
            workTime={this.props.workTime} 
            incWork={this.props.incWork} 
            decWork={this.props.decWork} 
            run={this.props.run}
            setTime={this.props.setTime}
            />
            <Break
            setTime={this.props.setTime}
            breakTime={this.props.breakTime} 
            incBreak={this.props.incBreak} 
            decBreak={this.props.decBreak} 
            run={this.props.run}
            />
        </div>
    )
    }
}




class Clock extends React.Component{
     constructor(props){
        super(props);
        this.state={
            id:0,
            run:false,
            currTime:"25 : 00",
            cycle:'session',
            workTime:25,
            breakTime:5
        }
    }
    incWork=()=>{
        this.setState({
            workTime : this.state.workTime+1
        })
    }
    
    decWork=()=>{
        this.setState({
            workTime:this.state.workTime-1
        })
    }
    
    incBreak=()=>{
        this.setState({
            breakTime:this.state.breakTime+1
        })
    }
    
    decBreak=()=>{
        this.setState({
            breakTime:this.state.breakTime-1
        })
    }
    
    setTime=(t)=>{
        
        this.setState({
            currTime:`${t} : 00`
        })
    }
    
    
    runTime=()=>{
        if(this.state.run===false){
            this.setState({
                run:true
            })
        }else{
            this.setState({
                run:false
            })
        }
    }
    
    startTime=(dur)=>{
        let time = dur*60
        let min
        let secs
        let runningTime=setInterval(()=>{
            this.setState({
            id:runningTime
            })
            min = Math.floor(time/60)
            secs=time-min*60
            min = min<10 ? "0"+min:min
            secs = secs<10 ? "0"+secs:secs
            this.setState({
                currTime:`${min} : ${secs}`
            })
        if(time===0){
            this.setState({
                cycle:"break",
                run:false
            })
            clearInterval(this.state.id)
        }else{
            time=time-1
        }
        
        
        
        },1000)
    
    }
    
    reset=()=>{
        clearInterval(this.state.id);
        this.setState({
            workTime:25,
            breakTime:5,
            currTime:"25 : 00"
        })
    }
    pause=()=>{
        clearInterval(this.state.id);
    }
    
    render(){
        return(
            <div id="main">
                <h1>Pomodoro Clock</h1>
                <Control 
                workTime={this.state.workTime} 
                breakTime={this.state.breakTime} 
                incWork={this.incWork} 
                decWork={this.decWork} 
                incBreak={this.incBreak} 
                decBreak={this.decBreak} 
                run={this.state.run} 
                setTime={this.setTime}
                runTime={this.runTime} 
                />
                
                <Timer 
                cycle={this.state.cycle}
                currTime={this.state.currTime}
                />
                
                <Button
                id={this.state.id}
                run={this.state.run}
                cycle={this.state.cycle}
                workTime={this.state.workTime} 
                breakTime={this.state.breakTime} 
                setTime={this.setTime}
                runTime={this.runTime}
                startTime={this.startTime} 
                reset={this.reset}
                pause={this.pause}
               />
                
            </div>
        
        )
    }
}

ReactDOM.render(<Clock/>,document.getElementById('root'));
