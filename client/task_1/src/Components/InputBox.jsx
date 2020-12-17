import React from 'react'
import './InputBox.css'


export default class InputBox extends React.Component {
    constructor(props) {
        super(props)
        this.value = new Array(this.props.boxes).fill("")
        this.elements = []
    }

    componentDidMount() {
        this.elements[0].focus()
    }

    handleInput = (e, i) => {
        this.value[i] = e.target.value
        this.props.handleValue(this.value.join(""))
        if ((i + 1) < this.value.length && e.target.value !== "" && this.value[i].length === this.props.digits) {
            this.elements[i + 1].focus()
        }
    }

    handleDelete = (e, i) => {
        const key = e.key
        if (key === "Backspace" && (i - 1) >= 0 && this.value[i] === "") {
            this.value[i] = e.target.value
            this.props.handleValue(this.value.join(""))
            this.elements[i - 1].focus()
        }
    }

    handlePaste = (e) => {
        const pasted = e.clipboardData.getData("Text")
        const req = pasted.slice(0, (this.props.boxes * this.props.digits))
        let chunks = [];
        for (let i = 0; i < req.length; i += this.props.digits) {
            chunks.push(req.substring(i, i + this.props.digits))
        }
        for (let i = 0; i < this.props.boxes; i++) {
            this.value[i] = chunks[i]
            this.elements[i].focus()
        }
        this.props.handleValue(this.value.join(""))
    }

    render() {
        return (
            <div>
                {
                    this.value.map((item, index) => (
                        <input
                            maxLength={this.props.digits}
                            onPaste={this.handlePaste}
                            ref={(elem) => this.elements[index] = elem}
                            onChange={(e) => this.handleInput(e, index)}
                            onKeyDown={(e) => this.handleDelete(e, index)}
                            key={index}
                            value={this.value[index]}
                        />
                    ))
                }
            </div>
        )
    }
}