import SchoolList from "../components/SchoolList";
import {useEffect} from "react";
import {callGetSchools} from "../modules/school";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../modules";


const HomeContainer = () => {

    const {schools} = useSelector((state: RootState) => state.schoolReducer)
    const dispatch = useDispatch();
    useEffect(() => {
        // @ts-ignore
        dispatch(callGetSchools())
    },[]);

    return (
        <div>
            <SchoolList onClickSchool={()=>{console.log("click school")}} schools={schools}></SchoolList>
        </div>
    )
}

export default HomeContainer