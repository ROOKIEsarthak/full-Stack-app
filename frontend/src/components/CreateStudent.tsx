import toast from "react-hot-toast";
import { type StudentForm } from "../types/student";
import { useState } from "react";

export default function CreateStudentForm({
  setRefreshLogs,
  setRefreshStudent,
}: {
  setRefreshLogs: () => void;
  setRefreshStudent: () => void;
}) {
  const [disabled, setDisabled] = useState(false);
  const [form, setForm] = useState<StudentForm>({
    name: "",
    email: "",
    regId: "",
    githubId: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/v1/students/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      if (res.ok) {
        toast.success("Successfully created Student!");
        setForm({
          name: "",
          email: "",
          regId: "",
          githubId: "",
        });
        setRefreshLogs();
        setRefreshStudent();
      } else {
        toast.error("Failed to create student");
      }
    } catch (e) {
      console.error(e);
      alert("Failed to create student ");
    } finally {
      setDisabled(false);
    }
  };
  return (
    <>
      {disabled && (
        <>
          <div className="p-2 text-lime-600">sending data... please wait</div>
        </>
      )}

      <form
        onSubmit={onSubmit}
        onMouseDown={(event) => {
          event.stopPropagation();
        }}
        onTouchStart={(event) => {
          event.stopPropagation();
        }}
        className="px-4 flex flex-col gap-4 w-full bg-neutral-300 text-black p-4 rounded-md overflow-y-auto justify-center  "
      >
        <div className="flex flex-col gap-4 justify-start max-w-xs self-center">
          <label className="flex justify-end gap-3">
            Name:
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </label>
          <label className="flex justify-end gap-3">
            Email:
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </label>
          <label className="flex justify-end gap-3">
            Reg ID:
            <input
              type="text"
              name="regId"
              value={form.regId}
              onChange={handleChange}
            />
          </label>
          <label className="flex justify-end gap-3">
            Github ID:
            <input
              type="text"
              name="githubId"
              value={form.githubId}
              onChange={handleChange}
            />
          </label>
        </div>
        <button
          className="px-10 py-2 w-full max-w-sm self-center text-white bg-sky-500 rounded-md"
          type="submit"
          onMouseDown={(event) => {
            event.stopPropagation();
          }}
          onTouchStart={(event) => {
            event.stopPropagation();
          }}
          disabled={disabled}
        >
          Submit
        </button>
      </form>
    </>
  );
}
