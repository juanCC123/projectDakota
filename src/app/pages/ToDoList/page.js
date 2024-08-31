import ToDoList from "@/app/components/component_appMental/ToDoList";

export default function ToDoListFunction() {
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="max-w-lg w-full">
        <ToDoList />
      </div>
    </div>
  );
}
