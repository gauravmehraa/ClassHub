import React from 'react'
import useGetAverageGrades from '../hooks/stats/useGetAverageGrades'
import Chart from 'react-google-charts';
import { useAuthContext } from '../context/AuthContext';
import { TbGraphOff } from 'react-icons/tb';
import useGetLogs from '../hooks/logs/useGetLogs';
import { MdOutlineSearchOff } from 'react-icons/md';
import LogCard from '../components/LogCard';

const Dashboard = () => {
  const { authUser } = useAuthContext();
  const { averageGrades } = useGetAverageGrades();
  const { loading: logsLoading, logs } = useGetLogs();
  console.log(logs);

  const gradeData: any = [["Quiz", "Average %", "Attempted %"]];
  Object.keys(averageGrades).forEach(quizID => {
    gradeData.push([averageGrades[quizID].topic, averageGrades[quizID].averagePercent, averageGrades[quizID].attempted]);
  });

  //const checker = () => Object.keys(averageGrades).every((v: any) => averageGrades[v].attempted === 0);

  const options = {
    chart: {
      title: "Quiz Statistics",
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
    <div className="flex flex-col text-black py-4 sm:py-8 overflow-auto max-h-screen w-full">
      { authUser && authUser.role === "Teacher"?
      (JSON.stringify(averageGrades) === "{}" ?
      <div className='font-semibold text-2xl flex gap-2 items-center my-auto mx-auto'> <TbGraphOff className='text-primary w-8 h-8'/> No statistics </div>:
      <div className='mx-6 rounded-lg bg-white p-8'>
        <Chart chartType="Bar" width="100%" height="400px" data={gradeData} options={options} />
      </div>): null
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
    <div className={`flex flex-col m-6 min-h-96 max-h-96  ${props.data.length % 2 === 0? "bg-gray-200": "bg-gray-100"}`}>
      <div className='text-2xl rounded-tl-lg rounded-tr-lg text-center py-4 text-white bg-slate-600'>{props.title}</div>
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
