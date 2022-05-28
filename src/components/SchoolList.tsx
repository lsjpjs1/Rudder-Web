import {PostPreview} from "../modules/post";
import {SchoolInfo} from "../modules/school";

type SchoolListProps = {
    schools: Array<SchoolInfo>
    onClickSchool: ()=> void
}

const SchoolList = (props: SchoolListProps) => {

    const schoolElements = props.schools.map((school)=>
        (
            <div onClick={props.onClickSchool}>
                <h3>{school.schoolName}</h3>
            </div>

        )
    )

    return (
        <div>
            {schoolElements}
        </div>
    )
}

export default SchoolList