import React,{Component} from 'react'
import ReactDOM from 'react-dom';
import './layer.css'

class Modal extends Component {
	constructor(args) {
		super()
		this.state = {
			show: false,
			title_class: 'layer',
			pos: {
				x: 0,
				y: 0
			},
			dragging: false,
			rel: null // position relative to the cursor
		}
	}
	componentWillReceiveProps(nextProps) {
		let bodyH = document.documentElement.clientHeight;
		let bodyW = document.documentElement.clientWidth;
		let pos = {};
		pos.x = bodyW / 2 - (this.props.width ? parseInt(this.props.width, 10) / 2 : 375);
		pos.y = bodyH / 2 - (this.props.height ? parseInt(this.props.height, 10) / 2 : 250);
		this.setState({
			pos
		})
		nextProps.show ? this.show() : this.hide();
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.dragging && !prevState.dragging) {
			document.addEventListener('mousemove', this.onMouseMove)
			document.addEventListener('mouseup', this.onMouseUp)
		} else if (!this.state.dragging && prevState.dragging) {
			document.removeEventListener('mousemove', this.onMouseMove)
			document.removeEventListener('mouseup', this.onMouseUp)
		}
	}

	show() {
		this.setState({
			show: true,
			title_class: "layer fade-in"
		})
	}
	hide() {
		this.setState({
			title_class: "layer layer-close"
		}, () => {
			setTimeout(() => {
				this.setState({
					show: false
				})
			}, 200)
		})
	}
	move() {
		this.setState({
			title_class: "layer"
		})
	}

	onMouseDown(e) {
		if (e.button !== 0) return; // only left mouse button
		let pos = ReactDOM.findDOMNode(this.refs.move).getBoundingClientRect();
		this.setState({
			dragging: true,
			rel: {
				x: e.pageX - pos.left,
				y: e.pageY - pos.top
			}
		})
		e.stopPropagation();
		e.preventDefault();
	}
	onMouseUp = (e) => {
		this.setState({
			dragging: false
		})
		e.stopPropagation()
		e.preventDefault()
	}
	onMouseMove = (e) => {
		if (!this.state.dragging) return;
		this.setState({
			pos: {
				x: e.pageX - this.state.rel.x,
				y: e.pageY - this.state.rel.y
			}
		})
		e.stopPropagation();
		e.preventDefault();
	}
	render(){
		const layer_style = {
			width: this.props.width || "750px",
			height: this.props.height || "500px",
			left: this.state.pos.x + 'px',
			top: this.state.pos.y + 'px'
		}
		return(
	    <div>
            {this.state.show?<div className="shade" onClick={()=>this.props.hide()}></div>:null}
           		{this.state.show?
                 <div style={layer_style} ref='layer' className={this.state.title_class}>
                           <div className="layer-title" ref='move' onMouseDown={(e)=>this.onMouseDown(e)}>
                             <lable>{this.props.title}</lable>
                             <i className="icon-remove" onClick={()=>this.props.hide()} style={{fontSize:"27px"}}>x</i>
                           </div>
                           {this.props.children}
                 </div>
             :null}
		</div>
			)
	}
}
export default Modal;