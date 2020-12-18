import React from 'react'
import InputBox from './Components/InputBox'
import styled from "styled-components";

const Wrapper = styled.div`
	position:fixed;
	left: 28vw;
	top: 5vw;
	box-shadow: 0px 8px 16px 0px rgba(0, 0, 0,0.2);
	padding: 25px 25px 100px 25px;
	background-color:#00bfa5;
	border-radius:5px;
	> h2{
		// margin-left:19vh;
		text-align:center
	}
	> div > input{
		background-color:${(props) => props.chgClr ? '#c8e6c9' : 'white'};
		color: ${(props) => props.chgClr ? '#66bb6a' : '#000'} ;
		border-radius:5px;
		border: ${(props) => props.chgClr ? '1px solid #4caf50' : '1px solid black'};
		
	}
`

const Showvalue = styled.div`
	font-size: 20px;
	position:absolute;
	left: 10vw;
	color: black;
`

export default function App() {

  const [value, setValue] = React.useState('')
  const [showValue, setShowValue] = React.useState('')

  React.useEffect(() => {
    let str = ''
    for(let i = 0; i < value.length; i++){
      if(i % 4 === 0){
        str += ' '
      }
      str += value[i]
    }
    setShowValue(str.slice(1,str.length))
  }, [value])

  const handleValue = (value) => {
    setValue(value)
  }


  return (
    <Wrapper>
        <h2>Card Number*</h2>
          <InputBox
            boxes={4} 
            digits={4}
            handleValue={handleValue}
        />
      <Showvalue>{value.length > 0 && showValue}</Showvalue>
    </Wrapper>
  )
}