import { useLocation } from 'react-router-dom'
import { Chart } from "react-google-charts";
import { getDate, getDateFormatted } from '../utils/date';
import useGetFeedback from '../hooks/feedback/useGetFeedback';
import FeedbackCard from '../components/FeedbackCard';
import useGetGrades from '../hooks/quiz/useGetGrades';
import GradeCard from '../components/GradeCard';
import AddFeedbackModal from '../components/AddFeedbackModal';
import EditStudentModal from '../components/EditStudentModal';
import { MdOutlineMail, MdOutlinePhone, MdOutlineHome, MdOutlineMale, MdOutlineFemale, MdArrowBackIos } from "react-icons/md";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { MdOutlineSearchOff } from "react-icons/md";
import { TbGraphOff } from "react-icons/tb";
import { Link } from 'react-router-dom'
import useGetSubjectsByClass from '../hooks/subjects/useGetSubjectsByClass';

const Profile = () => {
  const location = useLocation();
  const { student, course } = location.state;
  const { loading: feedbackLoading, feedbacks } = useGetFeedback();
  const { loading: subjectsLoading, subjects } = useGetSubjectsByClass(student.classID._id);
  const { loading: gradesLoading, grades } = useGetGrades(student._id);
  const filteredFeedbacks = feedbacks.filter((feedback: any)=> feedback.studentID._id.toString() === student._id.toString());

  const gradeData: any = [];
  grades.forEach((grade: any) => {
    const percentage = parseFloat(((grade.score / grade.quizID.score) * 100).toFixed(2));
    gradeData.unshift([ getDateFormatted(grade.createdAt), percentage ])
  });
  gradeData.unshift(["Year", "Percentage"]);

  const feedbackData: any = [];
  filteredFeedbacks.forEach((feedback: any) => {
    const percentage = feedback.rating;
    feedbackData.unshift(([ getDateFormatted(feedback.createdAt), percentage ]));
  });
  feedbackData.unshift(["Year", "Feedback"]);

  const options = {
    title: "",
    hAxis: { title: "", titleTextStyle: { color: "#333" } },
    vAxis: { minValue: 0, maxValue: 5 },
    chartArea: { width: "60%", height: "60%" },
    colors: ['#428af5']
  };

  return (
    <div className="flex flex-col text-black py-4 sm:py-8 overflow-auto max-h-screen w-full">
      <Link to="../" className='mr-auto ml-8 mt-4'><MdArrowBackIos className='w-6 h-6 hover:text-primary'/></Link>
      <div className='flex flex-row flex-wrap justify-evenly items-center gap-6 py-8 px-4 mx-6 sm:px-8 sm:mx-12 my-6 bg-white rounded-lg'>
        <div className='flex flex-row gap-2 sm:gap-4 items-center h-full sm:h-auto'>
          <img src={`https://avatar.iran.liara.run/public/${student.gender === 'Male'? 'boy': 'girl'}?username=${student.email}`} alt="User" className="rounded-full w-20 h-20 sm:w-24 sm:h-24 border-primary border-2" />
          <div className='flex flex-col gap-2'>
            <div className='text-xl sm:text-2xl font-semibold '>{student.name}</div>
            <div className='text-md'>Student since <span className='font-semibold text-primary'>{getDate(student.createdAt)}</span></div>
          </div>
        </div>
        <div className=''>
          <div className='flex flex-col md:flex-row flex-wrap px-4 gap-10 justify-evenly min-h-20 pb-8'>
            <a className='flex gap-2 items-center hover:text-primary' href={`mailto:${student.email}`}>
              <MdOutlineMail className='w-6 h-6 text-primary'/>
              <div className='outline-none'>{student.email}</div>
            </a>
            <a className='flex gap-2 items-center hover:text-primary' href={`tel:${student.phoneNumber}`}>
              <MdOutlinePhone className='w-6 h-6 text-primary'/>
              <div className='outline-none'>{student.phoneNumber}</div>
            </a>
            <div className='flex gap-2 items-center'>
              <MdOutlineHome className='w-6 h-6 text-primary'/>
              <div>{student.address}</div>
            </div>
            <div className='flex gap-2 items-center'>
              <LiaBirthdayCakeSolid className='w-6 h-6 text-primary'/>
              <div>{getDate(student.dateOfBirth)}</div>
            </div>
            <div className='flex gap-2 items-center'>
              { student.gender === "Male"? <MdOutlineMale className='w-6 h-6 text-primary'/>: <MdOutlineFemale className='w-6 h-6 text-primary'/> }
              <div >{student.gender}</div>
            </div>
          </div>
          <div className='flex flex-row gap-4 justify-center'>
            <EditStudentModal student={{...student, course}}/>
            <AddFeedbackModal student={student}/>
          </div>
        </div>
      </div>
      { subjectsLoading?
        <div className='shadow bg-white max-h-48 min-h-48 max-w-full mt-4 mb-8 mx-6 rounded-xl flex'><span className='loading loading-spinner mx-auto my-auto text-primary'></span></div>:
        <div className='flex flex-row flex-wrap justify-evenly items-center gap-6 py-8 px-4 mx-6 sm:px-8 sm:mx-12 my-6 bg-white rounded-lg'>
          { subjects.length === 0?
            <></>:
            subjects.map((subject: any, index: number) => (
            <div key={index} className='bg-primary glass rounded-lg p-4 text-white'> {subject.name} </div>
          ))
          }
        </div>
      }
      <div className='flex flex-row flex-wrap'>
        <div className='flex flex-col px-4 mt-8 w-full items-center gap-8 md:w-1/2 '>
          <div className={`flex flex-col min-h-[445px] max-h-[445px]  w-full md:w-11/12 ${true? "bg-gray-200": "bg-gray-100"}`}>
            <div className='text-2xl text-center py-4 text-white bg-slate-600'>Academics</div>
            { grades.length <= 1?
            <div className='font-semibold text-2xl flex gap-2 items-center my-auto mx-auto'> <TbGraphOff className='text-primary w-8 h-8'/> Insufficient Data </div>
            :<Chart chartType="AreaChart" width="100%" height="384px" data={gradeData} options={options} />
            }
          </div>
          <Section data={grades} dataLoading={gradesLoading} title={"Grades"}>
            { grades.length === 0?
              <div className='font-semibold text-2xl flex gap-2 items-center my-auto mx-auto'> <MdOutlineSearchOff className='text-primary w-8 h-8'/> No grades found </div>:
              grades.map((grade: any, index: number) => (
                <GradeCard key={grade._id} data={grade} index={index}/>
              ))
            }
          </Section>
        </div>
        <div className='flex flex-col px-4 mt-8 w-full items-center gap-8 md:w-1/2 '>
          <div className={`flex flex-col min-h-[445px] max-h-[445px] w-full md:w-11/12 ${true? "bg-gray-200": "bg-gray-100"}`}>
            <div className='text-2xl text-center py-4 text-white bg-slate-600'>Performance</div>
            { filteredFeedbacks.length <= 1?
            <div className='font-semibold text-2xl flex gap-2 items-center my-auto mx-auto'> <TbGraphOff className='text-primary w-8 h-8'/> Insufficient Data </div>
            :<Chart chartType="AreaChart" width="100%" height="384px" data={feedbackData} options={options} />
            }
          </div>
          <Section data={filteredFeedbacks} dataLoading={feedbackLoading} title={"Feedbacks"}>
            { filteredFeedbacks.length === 0?
              <div className='font-semibold text-2xl flex gap-2 items-center my-auto mx-auto'> <MdOutlineSearchOff className='text-primary w-8 h-8'/> No feedback given </div>:
              filteredFeedbacks.map((feedback: any, index: number) => (
                <FeedbackCard key={feedback._id} data={feedback} showInfo={false} index={index}/>
              ))
            }
          </Section>
        </div>
      </div>
    </div>
  )
}

const Section = (props: { data: any, dataLoading: boolean, title: string, children: React.ReactNode }) => {
  return (
    <div className={`flex flex-col min-h-96 max-h-96 w-full md:w-11/12 ${props.data.length % 2 === 0? "bg-gray-200": "bg-gray-100"}`}>
      <div className='text-2xl text-center py-4 text-white bg-slate-600'>{props.title}</div>
      <div className='w-full h-full flex flex-col overflow-auto'>
        {
          props.dataLoading ?
          <span className='loading loading-spinner mx-auto my-12 text-primary'></span>:
          <div className={`flex flex-row flex-wrap justify-center ${props.data.length === 0 && 'h-full'} text-center max-h-96 overflow-auto`}>
            { props.children }
          </div>
        }
      </div>
    </div>
  );
}


export default Profile
