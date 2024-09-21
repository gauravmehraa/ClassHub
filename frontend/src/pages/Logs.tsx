import { useState } from "react";
import LogCard from "../components/LogCard";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import useGetLogs from "../hooks/logs/useGetLogs";

const Logs = () => {
  const { loading, logs } = useGetLogs();

  const [page, setPage] = useState(1);

  const itemsPerPage = 10;
  const pages = Math.ceil(logs.length / itemsPerPage);

  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;
  const currentPage = logs.slice(start, end);

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
        { logs.length === 0?
          <div className="mx-auto"> No logs to show </div>:
          <>
            <div className="join mb-4">
              <button onClick={previousPage} className="join-item btn bg-white border-none text-black hover:bg-primary hover:text-white"><GrFormPrevious className="w-4 h-4"/></button>
              <button className="join-item btn border-none text-lg disabled:text-primary disabled:bg-white" disabled>{page}</button>
              <button onClick={nextPage} className="join-item btn bg-white border-none text-black hover:bg-primary hover:text-white"><GrFormNext className="w-4 h-4"/></button>
            </div>

            {currentPage.map((log: { _id: React.Key | null | undefined; }, index: number) => (
              <LogCard key={log._id} data={log} index={index}/>
            ))}
          </>
        }
      </div>
    }
  </div>
  )
}

export default Logs