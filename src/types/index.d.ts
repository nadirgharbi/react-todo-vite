interface Tasks {
  id: number;
  title: string;
  completed: string;
}

interface TodosProps {
  todos: Array<Tasks>;
}
