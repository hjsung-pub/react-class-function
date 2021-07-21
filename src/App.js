import { func } from 'assert-plus';
import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  return (
    <div className="">
        <h1>Function VS Class</h1>
        <FuncComp initNumber={2}></FuncComp>
        <ClassComp initNumber={2}></ClassComp>
    </div>
  );
}

var funcStyle = 'color:skyblue';
var funcId = 0;
// 기본구조
function FuncComp(props){ //props는 변수이름 아무렇게나 써도 상관없음

  //Hook사용
  var numberState = useState(props.initNumber); //초기값 설정
  console.log('numberState', numberState); //useState는 2개의 값으로 이루어진 배열
  var number = numberState[0]; //상태값
  var setNumber = numberState[1]; //상태를 바꿀 수 있는 함수

  var dateState = useState((new Date()).toString());
  var _date = dateState[0];
  var setDate = dateState[1];
  //동일코드
  //var [_date, setDate] = useState((new Date()).toString());

  //lifecycle 관련 Hook 사용
  //side effect(부가적인 작용)
  //여러번 사용 가능
  useEffect(function(){
    console.log('%cfunc => useEffect(componentDidMount, componentDidUpdate) '+(++funcId), funcStyle);
    document.title = number;
    return function(){ //본인이 품고있는 함수가 다시 실행될때 실행(정리하는 작업이 필요로 할때) - clean up
      console.log('%cfunc => useEffect return(componentDidMount, componentDidUpdate) '+(++funcId), funcStyle);
    }
  },[_date]); //최초 실행 후 []내부의 값이 변화됐는지 감지하여 이전 값과 다를때만 실행,[number]로 바꾸면 변경됨 //[]빈값을 주게되면 최초 생성될 때만 실행되어 componentDidMount의 기능만 하게 된다.
  console.log('%cfunc => render '+(++funcId), funcStyle);

  return(
    <div className="container">
        <h2>Function style component</h2>
        <p>props Number : {props.initNumber}</p>
        <p>state Number : {number}</p>
        
        <p>state Date : {_date}</p>
        <input type="button" value="random" onClick={
          function(){
            setNumber(Math.random())
          }
        }></input>
         <input type="button" value="date" onClick={
          function(){
            setDate((new Date().toString()))
          }
        }></input>
    </div>
  )
}

var classStyle = 'color:yellow';
// 기본구조
class ClassComp extends React.Component {
  //컴포넌트가 내부적으로 자신의 상태를 바꾸고 관리하기위해 state 사용
  //state 값을 바꿀때마다 render() 호출
  state = {
    number:this.props.initNumber, //초기값 설정
    date : (new Date()).toString()
  }

  //lifecycle
  componentWillMount(){ //render되기 전 // 16.3v 부터 사용하지 않음
    console.log('%cclass => componentWillMount', classStyle); 
  }
  componentDidMount(){ // render된 후
    console.log('%cclass => componentDidMount', classStyle);
  }
  shouldComponentUpdate(nextProps, nextState){ //컴포넌트가 만들어진 다음 변화가 생길 때(state, props), render를 호출 할 필요가 있는지 없는지 여부 결정
    console.log('%cclass => shouldComponentUpdate', classStyle);
    return true;
  }
  componentWillUpdate(nextProps, nextState){ //컴포넌트가 만들어진 다음 변화가 생길 때(state, props), 업데이트 직전  // 16.3v 부터 사용하지 않음 
    console.log('%cclass => componentWillUpdate', classStyle);
    return true;
  }
  componentDidUpdate(nextProps, nextState){ //컴포넌트가 만들어진 다음 변화가 생길 때(state, props), 업데이트가 끝남
    console.log('%cclass => componentDidUpdate', classStyle);
    return true;
  }

  render() {
    console.log('%cclass => render', classStyle);
    return (
      <div className="container">
        <h2>Class style component</h2>
        <p>props Number : {this.props.initNumber}</p> {/* 전달 받은 값 사용 */}
        <p>state Number : {this.state.number}</p> {/* state사용 */}

        <p>Date : {this.state.date}</p>
        <input type="button" value="random" onClick={
          function(){
            this.setState({number : Math.random()})
          }.bind(this)
        }></input>
         <input type="button" value="date" onClick={
          function(){
            this.setState({date : (new Date().toString())})
          }.bind(this)
        }></input>
      </div>
    )
  }
}


export default App;
