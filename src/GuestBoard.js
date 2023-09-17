import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { BoardSlice } from "./toolKit/BoardSlice";



export default function GuestBoard() {

    const item = useSelector ((state)=>[...state.board])

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>조회수</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        item.map((item) => <Row key ={item.num}
                                                num ={item.num}
                                                title ={item.title}
                                                author={item.author}
                                                viewCount={item.viewCount}/>)
                    }

                </tbody>
            </table>
                    <div>
                        <Link to="/guests/writes">새 글</Link>
                    </div>
                    <Outlet/>
        </div>
    )
}

function Row ({num, title, author, viewCount}) {

    return(
    <tr>
            <td>{num}</td>
            <td>
                <Link to = {"/guests/"+num}>{title}</Link>
            </td>
            <td>{author}</td>
            <td>{viewCount}</td>
        </tr>
    )
}

export function Detail() {

    const {num} = useParams()

    const item = useSelector((state) => [...state.board])

    const dispatch = useDispatch()


    useEffect(() => {
 
        dispatch (BoardSlice.actions.read(num))

    } ,[])


    const detailItem = item.filter((each) => each.num == num) [0]

    return (
        <div>
            <div>
            번호: {detailItem.num}
            </div>
            <div>
            제목: {detailItem.title}
            </div>
            <div>
            작성자: {detailItem.author}
            </div>
            <div>
            조회수: {detailItem.viewCount}
            </div>
            <div>
            내용: {detailItem.desc}
            </div>
            
            <div> 
                <Link to="/articles/">목록으로</Link>
            </div>
        </div>
    );

}

export function Write() {

    const titleRef = useRef()
    const authorRef = useRef()
    const descRef = useRef()
    const navigate = useNavigate() 

    const item = useSelector(state => [...state.board])
    const dispatch = useDispatch()

    function save() {

        dispatch(BoardSlice.actions.regist({
            num: item.length + 1,
            title: titleRef.current.value,
            author: authorRef.current.value,
            desc: descRef.current.value,
            viewCount: 0
        }))

        navigate("/articles")

    }

    return (
        <div>
            <div>
                <input type ="text" placeholder="제목" ref={titleRef}/>
            </div>
            <div>
                <input type ="text" placeholder="작성자" ref={authorRef}/>
            </div>
            <div>
                <textarea placeholder="내용" ref={descRef}></textarea>
            </div>

            <div>
                <button onClick={save}>저장</button>
                <Link to ="/articles">목록으로</Link>
            </div>
        </div>
    )

}