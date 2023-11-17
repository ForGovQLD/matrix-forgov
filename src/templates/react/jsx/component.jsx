// Imports




// Stateful components

export class {{module_name}} extends React.Component{

    // Lifecycle 

    constructor(props) {
        super(props);

        this.state = {};

        // Binds
        this.clickHandler = this.clickHandler.bind(this);
    }

    componentDidMount() {
        var this_component = this;
        
        this_component.awesomeFunction();
    }


    // Events

    clickHandler(event) {
        event.preventDefault();

        var this_component = this;
        
        this_component.awesomeFunction();
    }


    // Functions

    awesomeFunction() {
        var this_component = this;

        console.log('{{module_name}} component!');
    }


    // Render

    render() {
        var this_component = this;
        
        return (
            <div className="{{module_name}}__wrapper">
                <span>Hello, {{module_name}}!</span>
            </div>
        );
    }

};
