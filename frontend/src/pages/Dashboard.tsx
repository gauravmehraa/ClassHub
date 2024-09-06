import React, { useEffect } from 'react'
import useGetAverageGrades from '../hooks/stats/useGetAverageGrades'
import Chart from 'react-google-charts';
import { useAuthContext } from '../context/AuthContext';
import { TbGraphOff } from 'react-icons/tb';

const Dashboard = () => {
  const { authUser } = useAuthContext();
  const { loading, averageGrades } = useGetAverageGrades();

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
    </div>
  )
}

export default Dashboard
