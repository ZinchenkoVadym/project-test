import './App.scss';
import Header from './components/header/header';
import Home from './components/home-block/home';
import {useState} from 'react';
import Authorization from './components/authorization/authorization';
import Users from './components/users/users';

function App() {

    let [pageNum, setPageNum] = useState(1);
    let [users, setUsers] = useState([]);
    let [loader, setLoader] = useState(false);
    let [userOpen, setUserOpen] = useState(false);

    return (
        <div className="wrapper">
            <Header/>
            <Home/>
            <Users
                setUserOpen={setUserOpen}
                userOpen={userOpen}
                pageNum={pageNum}
                setPageNum={setPageNum}
                users={users}
                setUsers={setUsers}
                loader={loader}
                setLoader={setLoader}
            />
            <Authorization
                setUserOpen={setUserOpen}
                setUsers={setUsers}
                setPageNum={setPageNum}
                loader={loader}
                setLoader={setLoader}
            />
        </div>
    );
}

export default App;
