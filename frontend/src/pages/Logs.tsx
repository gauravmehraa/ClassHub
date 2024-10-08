import { useState } from "react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import useGetAllLogs from "../hooks/logs/useGetAllLogs";
import { getTime } from "../utils/date";

const Logs = () => {
  const { loading, allLogs } = useGetAllLogs();

  const [page, setPage] = useState(1);

  const itemsPerPage = 15;
  const pages = Math.ceil(allLogs.length / itemsPerPage);

  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;
  const currentPage = allLogs.slice(start, end);

  const previousPage = () => {
    if(page !== 1) setPage(page - 1);
  }
  const nextPage = () => {
    if(page !== pages) setPage(page + 1);
  }

  return (
    <div className="flex flex-col text-black py-4 sm:py-8 overflow-auto max-h-screen w-full">
      <div className="hidden md:block text-3xl text-center font-semibold pt-4">Logs</div>
    {
      loading ?
      <span className='loading loading-spinner mx-auto my-auto text-primary'></span>:
      <div className="flex flex-col my-2 sm:my-8 items-center">
        { allLogs.length === 0?
          <div className="mx-auto"> No logs to show </div>:
          <>
            <div className="join mb-4">
              <button onClick={previousPage} className="join-item btn bg-white border-none text-black hover:bg-primary hover:text-white"><GrFormPrevious className="w-4 h-4"/></button>
              <button className="join-item btn border-none text-lg disabled:text-primary disabled:bg-white" disabled>{page}</button>
              <button onClick={nextPage} className="join-item btn bg-white border-none text-black hover:bg-primary hover:text-white"><GrFormNext className="w-4 h-4"/></button>
            </div>

            <div className="rounded-lg w-full mx-2 md:w-9/12 block overflow-x-auto md:mx-8">
            <table border={1} className="table w-full" cellSpacing={20}>
              <tr className="bg-slate-600 text-white">
                <th style={ {width: "15%"}}>Role</th>
                <th style={ {width: "50%"}}>Action</th>
                <th style={ {width: "35%"}}>Time</th>
              </tr>
              {currentPage.map((log: any, index: number) => (
                <tr className={`${index % 2 === 0? "bg-gray-200": "bg-gray-100"}`}>
                  <td>{log.userType}</td>
                  <td>
                    {` ${log.userID.name}`} 
                    {` ${log.action}`}
                    {` ${log.targetID?.name || ""}`}
                    {` ${log.targetID?.topic || ""}`}
                    {` ${log.targetID?.year || ""} ${log.targetID?.program || ""}`}
                    {` ${log.targetID?.title || ""}`}
                  </td>
                  <td>{getTime(log.time)}</td>
                </tr>
              ))}
            </table>
            </div>
          </>
        }
      </div>
    }
  </div>
  )
}

export default Logs