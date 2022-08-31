import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../../../../Components/Loading/Loading';
import { BASE_API } from '../../../../../config';
import { FaGithub } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { TbWorldDownload } from 'react-icons/tb';

const ViewSubmission = () => {
  const { applicantId } = useParams()
  const { data, isLoading } = useQuery(["candidateSubmission"], () =>
    axios.get(`${BASE_API}/submittedTask/candidate/${applicantId}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
  );

  const submissionData = data?.data

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="h-screen">
      <div className=" border-b-2 border-primary py-3">
        <h2 className="text-center text-xl md:text-2xl font-semibold ">
          {submissionData?.displayName} Submission Info
        </h2>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-y-12 my-10 px-1 md:px-10">

        <div className=''>
          <h2 className="font-semibold font-mono text-xl mb-2 text-center">Assignment Submitted(<small>{submissionData?.submitDate}</small>)</h2>
          <p className=" w-full my-5 border p-3 rounded-xl text-justify">{submissionData?.taskInformation}</p>
          <div className='flex justify-evenly items-center flex-col lg:flex-row space-y-2'>
            <a className='text-lg flex gap-x-2 items-center' href={submissionData?.sumitGithubLink} target="_blank" rel="noopener noreferrer"><FaGithub /> Source Code </a>
            <a className='text-lg flex gap-x-2 items-center' href={submissionData?.submitLiveLink} target="_blank" rel="noopener noreferrer"><TbWorldDownload /> Live Link </a>
          </div>
        </div>

        <div className='flex flex-col items-center space-y-3 shadow-md border p-2 rounded-xl'>
          <h2 className="font-bold  text-xl mb-2 ">Personal Info</h2>
          <div className='flex flex-col space-y-5 pb-3 '>
            <h3>Name : {submissionData?.displayName}</h3>
            <h3>Email : {submissionData?.email} </h3>
            <h3>Phone : {submissionData?.applicantNumber}</h3>
            <h3>Applied For : {submissionData?.taskName}</h3>
            <a className=' flex gap-x-2 items-center' href={submissionData?.applicantResume} target="_blank" rel="noopener noreferrer">View : <ImProfile /> Resume </a>
            <button className='btn btn-sm btn-outline capitalize py-1'>Hire Now </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ViewSubmission;