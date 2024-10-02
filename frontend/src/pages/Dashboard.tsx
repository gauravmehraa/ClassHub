import React from 'react'
import Chart from 'react-google-charts';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { TbGraphOff } from 'react-icons/tb';
import { MdOutlineSearchOff, MdGroups } from 'react-icons/md';
import { IoDocumentsSharp } from "react-icons/io5";
import { TbBooks } from "react-icons/tb";
import { SiGoogleclassroom } from "react-icons/si";
import LogCard from '../components/LogCard';
import StatCard from '../components/StatCard';
import useGetLogs from '../hooks/logs/useGetLogs';
import useGetStatistics from '../hooks/stats/useGetStatistics';
import useGetAverageGrades from '../hooks/stats/useGetAverageGrades'
import useGetGrades from '../hooks/quiz/useGetGrades';
import { getDateFormatted } from '../utils/date';

const Dashboard = () => {
  const { authUser } = useAuthContext();
  const { loading: averageGradesLoading, averageGrades } = useGetAverageGrades();
  const { loading: statisticsLoading, statistics } = useGetStatistics();
  const { loading: logsLoading, logs } = useGetLogs();
  const { loading: gradesLoading, grades } = useGetGrades("none");
  
  let gradeData: any = [];
  if(authUser.role === "Student"){
    grades.forEach((grade: any) => {
      const percentage = parseFloat(((grade.score / grade.quizID.score) * 100).toFixed(2));
      gradeData.unshift([ getDateFormatted(grade.createdAt), percentage ])
    });
    gradeData.unshift(["Year", "Percentage"]);
  }

  const gradeOptions = {
    title: "",
    hAxis: { title: "", titleTextStyle: { color: "#333" } },
    vAxis: { minValue: 0, maxValue: 5 },
    chartArea: { width: "60%", height: "60%" },
    colors: ['#428af5']
  };

  const averageGradeData: any = [["Quiz", "Average %", "Attempted %"]];
  Object.keys(averageGrades).forEach(quizID => {
    averageGradeData.push([averageGrades[quizID].topic, averageGrades[quizID].averagePercent, averageGrades[quizID].attempted]);
  });

  const averageGradeOptions = {
    chart: {
      title: "",
    },
    colors: ['#7284fe', 'orange'],
    axes: {
      x: {
        all: {
          range: { min: 0, max: 100 }
        }
      },
    },
    bars: 'horizontal'
  };

  return (
    <div className="flex flex-col text-black py-4 sm:py-8 mx-0 overflow-auto max-h-screen w-full">
      <div className='w-screen sm:w-full flex flex-row flex-wrap justify-center gap-8 sm:gap-4 mb-8'>
        <div className='shadow flex flex-row w-full sm:w-auto gap-6 px-12 text-white font-helvetica text-2xl font-medium justify-between items-center bg-primary glass min-h-72 max-h-72 sm:min-h-full mx-6 sm:mx-2 rounded-xl'>
          <img src={`https://avatar.iran.liara.run/public/${authUser.gender === 'Male'? 'boy': 'girl'}?username=${authUser.email}`} alt="User" className="rounded-full w-24 h-24 border-primary border-2" />
          <div> Welcome Back!<br/>{authUser.role === "Teacher"? authUser.gender === "Male"?  "Mr.": "Ms.": ""} {authUser.name}</div>
        </div>
        { statisticsLoading?
        <div className='shadow bg-white max-h-48 min-h-48 w-full sm:w-1/3 mt-4 mb-8 mx-6 rounded-xl flex'><span className='loading loading-spinner mx-auto my-auto text-primary'></span></div>:
        (
        <div className='flex h-full w-full mx-6 sm:mx-0 sm:w-auto items-center'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full'>
            { authUser.role === "Student" &&
              statistics.map((stat: any, index: number) => (
                <StatCard
                title={stat.title}
                value={stat.value}
                statistic={stat.stat}
                description={stat.description}
                icon={
                  index === 0? <div className={`radial-progress ${stat.stat >= 75? "text-success": stat.stat >= 40? "text-warning": "text-error"}`} style={{ "--value": stat.stat } as React.CSSProperties} role="progressbar">{stat.stat}%</div>:
                  index === 1? <TbBooks className='text-primary h-12 w-12'/>:
                  index === 2? <IoDocumentsSharp className='text-primary h-12 w-12'/>:
                  <div className={`radial-progress ${stat.stat >= 75? "text-success": stat.stat >= 40? "text-warning": "text-error"}`} style={{ "--value": stat.stat } as React.CSSProperties} role="progressbar">{stat.stat}%</div>
                }
              />
              ))
            }
            { authUser.role === "Teacher" &&
              statistics.map((stat: any, index: number) => (
                <StatCard
                title={stat.title}
                value={stat.value}
                statistic={stat.stat}
                description={stat.description}
                icon={
                  index === 0? <div className={`radial-progress ${stat.stat >= 80? "text-success": stat.stat >= 40? "text-warning": "text-error"}`} style={{ "--value": stat.stat } as React.CSSProperties} role="progressbar">{stat.stat}%</div>:
                  index === 1? <MdGroups className='text-primary h-12 w-12'/>:
                  index === 2? <SiGoogleclassroom className='text-black h-12 w-12'/>:
                  <div className={`radial-progress ${stat.stat >= 80? "text-success": stat.stat >= 40? "text-warning": "text-error"}`} style={{ "--value": stat.stat } as React.CSSProperties} role="progressbar">{stat.stat}%</div>
                }
              />
              ))
              
            }
          </div>
        </div>
        )
        }
      </div>
      { authUser && authUser.role === "Student" && !gradesLoading?
        (
          gradesLoading? <div className='min-h-96 p-8 mx-6 rounded-lg flex bg-white'><span className='loading loading-spinner mx-auto text-primary'></span></div>
          :
          ( grades.length <= 1?
            <div className='font-semibold text-2xl flex min-h-24 gap-2 justify-center items-center  mx-6 sm:mx-auto bg-white sm:bg-transparent rounded-xl shadow sm:shadow-none px-8 w-auto sm:w-auto mb-12 sm:mb-0'> <TbGraphOff className='text-primary w-8 h-8'/> Insufficient Data </div>:
            <div className='mx-6 shadow rounded-lg bg-white px-2 sm:px-8 py-2 sm:py-12 mb-16 sm:mb-0 flex justify-center'>
              <Chart chartType="AreaChart" width="100%" height="384px" data={gradeData} options={gradeOptions} />
            </div>
          )
        )
        : null
      }
      { authUser && authUser.role === "Teacher"?
      (
        averageGradesLoading? <div className='min-h-96 p-8 mx-6 rounded-lg flex bg-white'><span className='loading loading-spinner mx-auto text-primary'></span></div>
        :
        ( JSON.stringify(averageGrades) === "{}"?
          <div className='font-semibold text-2xl flex gap-2 items-center my-auto mx-auto'> <TbGraphOff className='text-primary w-8 h-8'/> No statistics </div>:
          <div className='mx-6 shadow rounded-lg bg-white px-8 py-12 flex justify-center'>
            <Chart chartType="Bar" width="100%" height="384px" data={averageGradeData} options={averageGradeOptions} />
          </div>
        )
      )
      :null
      }
      
      { authUser && authUser.role === "Teacher"?
      <Section data={logs} dataLoading={logsLoading} title={"Logs"}>
        { logs.length === 0?
          <div className='font-semibold text-2xl flex gap-2 items-center my-auto mx-auto'> <MdOutlineSearchOff className='text-primary w-8 h-8'/> No logs </div>:
            logs.map((log: any, index: number) => (
              <LogCard key={log._id} data={log} index={index}/>
            ))
          }
      </Section>: null }
    </div>
  )
}

const Section = (props: { data: any, dataLoading: boolean, title: string, children: React.ReactNode }) => {
  return (
    <div className={`flex flex-col m-6 min-h-96 ${props.data.length % 2 === 0? "bg-gray-200": "bg-gray-100"}`}>
      <Link to="/logs"><div className='text-2xl rounded-tl-lg rounded-tr-lg text-center py-4 text-white bg-slate-600'>{props.title}</div></Link>
      <div className='w-full rounded-bl-lg rounded-br-lg h-full flex flex-col overflow-auto'>
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

export default Dashboard
