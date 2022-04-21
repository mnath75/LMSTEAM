import React from 'react'
import "./uploadImage.css";
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import Avatar from '@mui/material/Avatar';
import { Button } from 'react-bootstrap';
import AddIcon from '@material-ui/icons/Add';
export default class VideoUpload extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			files: [],
			urls: [],
			isDragging: false
		}
		
		this.onChange = this.onChange.bind(this);
		this.handleDrop = this.handleDrop.bind(this);
		this.handleDragEnter = this.handleDragEnter.bind(this);
		this.handleDragOver = this.handleDragOver.bind(this);
		this.handleDragLeave = this.handleDragLeave.bind(this);
		this.handleFiles = this.handleFiles.bind(this);
		this.onRemove = this.onRemove.bind(this);
	}
	
	onRemove(index) {
		var {files, urls} = this.state;
		let newFiles = files.filter((file, i) => i !== index);
		let newUrls = urls.filter((url, i) => i !== index);
		
		this.setState({
			...this.state,
			files: newFiles,
			urls: newUrls
		});
	}
	
	handleDrags(e) {
		e.preventDefault();
		e.stopPropagation();
		
		this.setState({
			...this.state,
			isDragging: true
		});
	}
	
	handleDragEnter(e) {
		this.handleDrags(e);
	}
	
	handleDragOver(e) {
		this.handleDrags(e);
	}
	
	handleDragLeave(e) {
		e.preventDefault();
		e.stopPropagation();
		
		this.setState({
			...this.state,
			isDragging: false
		});
	}
	
	onChange(e) {
		e.preventDefault()
		const files = e.target.files;
		[].forEach.call(files, this.handleFiles);
	}
	
	handleDrop(e) {
		e.stopPropagation();
		e.preventDefault();
		
		const data = e.dataTransfer;
		const files = data.files;
		console.log("Oops...you dropped this: ", files);
		
		[].forEach.call(files, this.handleFiles);
		
		this.setState({
			...this.state,
			isDragging: false
		});
	}
	
	handleFiles(file) {
		
		// this could be refactored to not use the file reader
		
		var reader = new FileReader();
		
		reader.onloadend = () => {

			var videoUrl = window.URL.createObjectURL(file);
			
			this.setState({
				files: [file, ...this.state.files],
				urls: [videoUrl, ...this.state.urls]
			});
			
		}
		
		reader.readAsDataURL(file);
	}
	uploadFiles(){
		document.getElementById("selectFile").click()
	}
	
	render() {
		const {urls, files, isDragging} = this.state;
		const dropClass = isDragging ? "dragDrop dragging" : "dragDrop";
		
		return (
			<div className='outer'>  
				<div className='inner' >
				<Button variant="outline-secondary" onClick={this.uploadFiles.bind(this)}>
					Video Solutions<AddIcon/>
                </Button>
					<input style={{display:"none"}}
					id="selectFile"
					 type="file"
						onChange={this.onChange}
						accept="video/*"
						single
					/>
        
				
				</div>
				
			</div>
		);
	}
}

