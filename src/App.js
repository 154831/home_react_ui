import "./App.css"
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import GuestBoard, { Detail } from "./GuestBoard";
import { useState } from "react";
import { Provider } from "react-redux";
import { toolkitStore } from "./toolKit/toolKitSlice";


export default function App() {
  const [item, setItem] = useState([])
// 아직 toolkit 안썼는데 프로바이더 안쓰면 안된다고 오류남 
  return (
    <Provider store={toolkitStore}>
      <BrowserRouter>
        <div id = "grid">
          <div id = "header">
            자기소개
          </div>

          <div id = "wrapper">
            <div id="profile">
              <div>
              <img src ="C:\Users\user\Desktop\HYE\02 Develpmont Material\React\react-ui\react-ui\src\selfpt\KakaoTalk_20230917_194037343.jpg"/>
              </div>
              Isbela an
            </div>
            <div id = "transport">
              <div><Link to="guests/">방명록</Link></div>
              <div><Link to="donggu/">동구 보러가기</Link></div>
            </div>
          </div>
        </div>

        <div>
          <Routes>
            <Route path = "/guests/*" element = {<GuestBoard item={item}/>}>
              <Route path = ":num" element= { <Detail item={item} setItem={setItem}/> }/>
            </Route>

            <Route path = "/donggu/" element = {<dongguPhotos item ={item}/>}>

            </Route>

          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  )
}