import { CheckCircle } from "lucide-react";

export const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-1 text-darky dark:text-lighty">
      <CheckCircle strokeWidth={2.2} />
      <p className="text-xl font-semibold">MyTodo</p>
    </div>
  );
};
