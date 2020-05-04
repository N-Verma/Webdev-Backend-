var st = ` # Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
es some code, \`<div></div>\`, between 2 backticks.

You can also make text **bold**... whoa!
Or _italic_.
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
\> Block Quotes!
\`\`\` function(){x:x+1} \`\`\`
  
- And of course there are lists.
  - Some are bulleted.

\![React Logo w/ Text](https://goo.gl/Umyytc)

`
class Editor extends React.Component{
  constructor(props){
    super(props);
    this.state={
      input:st
    };
  }
  handleChange(event){
    this.setState({
      input:event.target.value
    })
  }
    markup(){
	var rawMarkup = marked(this.state.input, {sanitize: true});
	return {
		__html: rawMarkup
	}
    }
    
  render(){
  return(
    <div id = "edit">
      <h3>Editor</h3>
          <textarea id="editor" defaultValue={this.state.input} onChange={this.handleChange.bind(this)}></textarea>
        <h3>Preview</h3>
        <div id="preview" dangerouslySetInnerHTML={this.markup()}></div>
    </div>
      )
  }
}
ReactDOM.render(<Editor />,document.getElementById("root"));
