class TimersDashboard extends React.Component {

    state={
        timers:[
            // {
            //     title: "cenas 1",
            //     project: "Life Chores",
            //     id: uuid.v4(),
            //     elapsed: 500000000,
            //     runningSince: 500000000,
            // },
            // {
            //     title: "cenas 2",
            //     project: "Life Chores",
            //     id: uuid.v4(),
            //     elapsed: 550000000,
            //     runningSince: 550000000,
            // },
        ]
    }

    handleCreateFormSubmit = (timer) => {
        this.createTimer(timer);
    }

    handleFormSubmit = (timer) => {
        this.updateTimer(timer);
    }

    updateTimer = (attrs) => {
        this.setState({
            timers: this.state.timers.map(timer => {
               if(timer.id === attrs.id){
                   // object assign-> objecto vazio por convnção, todas as propreidades do timer, e depois atribuição
                   // de propriedade a propriedade
                   return Object.assign({}, timer, {
                       title: attrs.title,
                       project: attrs.project,
                   })
               } else {
                   return timer;
               }
            })
        });
        client.updateTimer(attrs);
    }

    deleteTimer = (id) => {
        let filteredList = this.state.timers.filter(x => x.id !== id);
        this.setState({
          timers: filteredList
        });
        client.deleteTimer({id});
    }

    createTimer = (timer) => {
        const t = helpers.newTimer(timer);
        this.setState({
            timers: [...this.state.timers,t],
        });
        client.createTimer(timer);
    }

    handleStopClick = (id) => {
        const now = Date.now();
        this.setState({
            timers: this.state.timers.map(x=> {
                if(x.id === id){
                    const lastElapsed = now - x.runningSince;
                    return Object.assign({}, x, {
                        runningSince: null,
                        elapsed: lastElapsed - x.elapsed,
                    })
                } else {
                    return x;
                }
            })
        });
        client.stopTimer({id:id, stop:now})
    }

    handleStartClick = (id) => {
        const now = Date.now();
        this.setState({
            timers: this.state.timers.map(x=> {
                if(x.id === id){
                    return Object.assign({}, x, {
                        runningSince: now,
                    })
                } else {
                    return x;
                }
            })
        });
        client.startTimer({id:id, start:now})

    }

    componentDidMount(){
        this.loadTimersFromServer();
        setInterval(this.loadTimersFromServer, 5000);
    }

    loadTimersFromServer = () => {
        client.getTimers((serverTimers)=>(

            this.setState({
                timers:serverTimers
            })

        ))
    }

  render() {
    return (
      <div className='ui three column centered grid'>
        <div className='column'>
            <EditableTimerList onFormSubmit={this.handleFormSubmit}
                               onDeleteTimer={this.deleteTimer} 
                               timers={this.state.timers} 
                               onStopClick={this.handleStopClick}
                               onStartClick={this.handleStartClick}/>
            <ToggleableTimerForm onFormSubmit={this.handleCreateFormSubmit} />
        </div>
      </div>
    )
  }
};

class EditableTimerList extends React.Component {
  render() {
      const timers = this.props.timers.map(timer => (

        <EditableTimer
            key={timer.id}
            id={timer.id}
            title={timer.title}
            project={timer.project}
            elapsed={timer.elapsed}
            runningSince={timer.runningSince}
            onFormSubmit={this.props.onFormSubmit}
            onDeleteTimer={this.props.onDeleteTimer}
            onStopClick={this.props.onStopClick}
            onStartClick={this.props.onStartClick}
        />

      ))

    return (
      <div>
        {timers}
      </div>
    )
  }
};

class ToggleableTimerForm extends React.Component {

    state={
        isOpen:false,
    }

    handleFormOpen = () => {
        this.setState({
            isOpen:true,
        })
    }

    handleFormClose = () => {
        this.setState({
            isOpen:false,
        })
    }

    handleFormSubmit = (timer) => {
        this.props.onFormSubmit(timer);
        this.handleFormClose();
    }

  render() {
    if(this.state.isOpen){
        return(
            <TimerForm onFormClose={this.handleFormClose} onFormSubmit={this.handleFormSubmit}/>
        )
    }else{
        return(
            <div className="ui basic content centered aligned segment card">
                <button className="ui basic button icon" onClick={this.handleFormOpen}>
                    <i className="plus icon"></i>
                </button>
            </div>
        )
    }
  }
};

class EditableTimer extends React.Component {

    state={
        editFormOpen:false,
    }

    handleEditClick = () => {
        this.openForm();
    }

    handleDeleteClick = (id) => {
        this.props.onDeleteTimer(id);
    }

    handleFormClose = () => {
        this.closeForm();
    }

    handleFormSubmit = (timer) => {
        this.props.onFormSubmit(timer);
        this.closeForm();
    }

    closeForm = () => {
        this.setState({
            editFormOpen:false,
        })
    }

    openForm = () => {
        this.setState({
            editFormOpen:true,
        })
    }

  render() {

    if(this.state.editFormOpen){
        return(
            <TimerForm
                id={this.props.id}
                title={this.props.title}
                project={this.props.project}
                onFormClose={this.handleFormClose}
                onFormSubmit={this.handleFormSubmit}
            />
        )
    }else{
        return(
            <Timer
                id = {this.props.id}
                title={this.props.title}
                project={this.props.project}
                elapsed={this.props.elapsed}
                runningSince={this.props.runningSince}
                onEditClick={this.handleEditClick}
                onDeleteClick={this.handleDeleteClick}
                onStopClick={this.props.onStopClick}
                onStartClick={this.props.onStartClick}
            />
        )
    }
  }
};

class TimerForm extends React.Component {

    state={
        title: this.props.title || '',
        project: this.props.project || '',
    }

    handleTitleChange = (e) => {
         this.setState({
             title:e.target.value,
         })
     }

    handleProjectChange = (e) => {
         this.setState({
             project:e.target.value,
         })
     }

    handleSubmit = () => {
         this.props.onFormSubmit({
             id:this.props.id,
             title:this.state.title,
             project:this.state.project,
         })
     }

  render() {

    const submittext = this.props.id ? 'Update' : 'Create';

    return (
        <div className='ui centered card'>
            <div className='content'>
                <div className='ui form'>
                    <div className='field'>
                        <label>Title</label>
                        <input type='text' 
                        value={this.state.title} 
                        onChange={this.handleTitleChange}
                        />
                    </div>
                    <div className='field'>
                        <label>Project</label>
                        <input type='text' 
                        value={this.state.project}
                        onChange={this.handleProjectChange}
                        />
                    </div>
                    <div className='ui two bottom attached buttons'>
                        <button className='ui basic blue button'
                            onClick={this.handleSubmit}>
                        {submittext}
                        </button>
                        <button className='ui basic red button'
                            onClick={this.props.onFormClose}>
                        Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
  }
};

class Timer extends React.Component {

  componentDidMount() {
      //forcar o render da view
      this.forceUpdateInterval = setInterval(()=>this.forceUpdate(), 100);
  }

  componentWillUnmount() {
      clearInterval(this.forceUpdateInterval);
  }

  render() {

    const elapsedString = helpers.renderElapsedString(this.props.elapsed, this.props.runningSince)

    return (
        <div className='ui centered card'>
            <div className='content'>
                <div className='header'>
                    {this.props.title}
                </div>
                <div className='meta'>
                    {this.props.project}
                </div>
                <div className='center aligned description'>
                <h2>
                    {elapsedString}
                </h2>
                </div>
                <div className='extra content'>
                <span className='right floated edit icon'>
                    <i className='edit icon' onClick={this.props.onEditClick} />
                </span>
                <span className='right floated trash icon'>
                    <i className='trash icon' onClick={()=>this.props.onDeleteClick(this.props.id)} />
                </span>
                </div>
            </div>
            {/* conversao implicita de null para true e negacao para false */}
            <TimerActionButton 
                timerIsRunning={!!this.props.runningSince}
                onStopClick={()=>this.props.onStopClick(this.props.id)}
                onStartClick={()=>this.props.onStartClick(this.props.id)}
            />
        </div>
    )
  }
};

class TimerActionButton extends React.Component {
  render() {
    if(this.props.timerIsRunning){
        return(<div className="ui bottom attatched red basic button" onClick={this.props.onStopClick}>Stop</div>);
    }else{
        return(<div className="ui bottom attatched green basic button" onClick={this.props.onStartClick}>Start</div>);
    }
  }
}


ReactDOM.render(<TimersDashboard/>, document.getElementById('content'));

