import SchoolList from "../components/SchoolList";
import {useEffect} from "react";
import {callGetSchools} from "../modules/school";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../modules";
import {useNavigate} from "react-router-dom";
import RudderLogo from "../components/RudderLogo";


const HomeContainer = () => {

    const {schools} = useSelector((state: RootState) => state.schoolReducer)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        // @ts-ignore
        dispatch(callGetSchools())
    },[]);
    const onClickSchool = () => {
        navigate("/main")
    }

    return (
        <div>
            <RudderLogo></RudderLogo>
            학교 커뮤니티 구경하기
            <SchoolList onClickSchool={onClickSchool} schools={schools}></SchoolList>
        </div>
    )
}

export default HomeContainer