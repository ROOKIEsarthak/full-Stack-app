import { useEffect, useState } from "react";
import { type Student } from "../types/student";
import toast from "react-hot-toast";

export default function ViewStudentTable({
  refreshStudents,
  setRefreshLogs,
}: {
  refreshStudents: boolean;
  setRefreshLogs: () => void;
}) {
  const [students, setStudents] = useState<Student[]>();
  const [error, setError] = useState<string | undefined>();
  const [toggleForm, setToggleForm] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<Student>();
  const [refresh, setRefresh] = useState<boolean>(refreshStudents);

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/v1/students/all",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        setStudents(data);
        setError(undefined);
      } else {
        // const data = await response.json();
        setError("Failed to fetch students : ");
      }
    };
    fetchStudents();
  }, [refresh, refreshStudents]);
  if (error) {
    return <div>{error}</div>;
  }
  if (students?.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {toggleForm && selectedStudent && (
        <UpdateStudentForm
          studentData={selectedStudent}
          closeModal={() => {
            setToggleForm(false);
          }}
          refreshStudents={() => {
            setRefresh(!refresh);
          }}
          setRefreshLogs={setRefreshLogs}
        />
      )}

      <div className="w-full flex gap-3   items-center">
        <div className="w-[5%]">Id</div>
        <div className="w-[15%]">Name</div>
        <div className="w-[25%]">Email</div>
        <div className="w-[20%]">Reg ID</div>
        <div className="w-[20%]">Github ID</div>
        <div className="w-[10%]">Action</div>
      </div>
      <div className=" w-full ">
        {students?.map((student) => (
          <div
            className="flex gap-3 w-full items-center text-sm"
            key={student.id}
          >
            <div className="w-[5%]">{student.id}</div>
            <div className="w-[15%]">{student.name}</div>
            <div className="w-[25%] truncate">{student.email}</div>
            <div className="w-[20%]">{student.regId}</div>
            <div className="w-[20%]">{student.githubId}</div>

            <div className="w-[10%]">
              <button
                onMouseDown={(event) => {
                  event.stopPropagation();
                }}
                onTouchStart={(event) => {
                  event.stopPropagation();
                }}
                className="px-5 py-1 my-2 mx-2 w-full max-w-sm self-center text-white bg-sky-500 rounded-md"
                onClickCapture={() => {
                  // alert("click");
                  setToggleForm(true);
                  setSelectedStudent(student);
                }}
              >
                update
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

const UpdateStudentForm = ({
  studentData,
  closeModal,
  refreshStudents,
  setRefreshLogs,
}: {
  studentData: Student;
  closeModal: () => void;
  refreshStudents: () => void;
  setRefreshLogs: () => void;
}) => {
  const [student, setStudent] = useState<Student>(studentData);
  const [error, setError] = useState<string | undefined>();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(
      import.meta.env.VITE_BACKEND_URL +
        "/api/v1/students/" +
        student.id +
        "/update",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      }
    );
    if (response.ok) {
      const data = await response.json();
      setStudent(data);
      setError(undefined);
      refreshStudents();
      setRefreshLogs();
      toast.success("Student updated successfully");
      closeModal();
    } else {
      setError("Failed to update student : ");
      toast.error("Failed to update student");
    }
  };

  return (
    <div className="static  bg-gray-500  w-full p-5 rounded-md flex flex-col mb-5">
      <div className="self-end p-4">
        <button
          onMouseDown={(event) => {
            event.stopPropagation();
          }}
          onTouchStart={(event) => {
            event.stopPropagation();
          }}
          onClick={closeModal}
        >
          X
        </button>
      </div>
      <div>{error}</div>
      <form
        onMouseDown={(event) => {
          event.stopPropagation();
        }}
        onTouchStart={(event) => {
          event.stopPropagation();
        }}
        onSubmit={handleUpdate}
        className="flex flex-col text-black gap-4 justify-center items-center"
      >
        <div className=" flex justify-between gap-5">
          <label htmlFor="studentName">Name</label>
          <input
            type="text"
            name="studentName"
            value={student.name}
            onChange={(e) => setStudent({ ...student, name: e.target.value })}
          />
        </div>
        <div className=" flex justify-between gap-5">
          <label htmlFor="studentEmail">Email</label>

          <input
            type="text"
            value={student.email}
            onChange={(e) => setStudent({ ...student, email: e.target.value })}
          />
        </div>
        <div className=" flex justify-between gap-5">
          <label htmlFor="studentRegId">Reg ID</label>
          <input
            type="text"
            value={student.regId}
            onChange={(e) => setStudent({ ...student, regId: e.target.value })}
          />
        </div>
        <div className=" flex justify-between gap-5">
          <label htmlFor="studentGithubId">Github ID</label>
          <input
            type="text"
            value={student.githubId}
            onChange={(e) =>
              setStudent({ ...student, githubId: e.target.value })
            }
          />
        </div>
        <button
          className="px-10 py-2 w-full max-w-sm self-center text-white bg-sky-500 rounded-md"
          type="submit"
        >
          Update
        </button>
      </form>
    </div>
  );
};
