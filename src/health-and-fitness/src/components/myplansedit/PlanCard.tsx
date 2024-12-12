import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import PropTypes from "prop-types";
import { TfiCup } from "react-icons/tfi";
import { HiChartBar } from "react-icons/hi";

type Level = "Beginner" | "Intermediate" | "Advanced";
type Goal = "Maintaining" | "Bulking" | "Cutting" | "Sport Specific";

interface Plan {
  id: string;
  name: string;
  image: string;
  muscle: string;
  level: string;
  goal: string;
  equipment: string;
  days: number;
  description: string;
  createdAt: string;
}

function PlanCard({ id }: { id: string }) {
  const [plan, setPlan] = useState<Plan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, loading } = useAuth();
  
  useEffect(() => {
    const fetchPlan = async () => {
      if (user) {
        setIsLoading(true);
        try {
          const response = await fetch(
            `http://localhost:3000/api/user?userId=${user.uid}`
          );

          if (!response.ok) {
            console.error(`Error fetching plan: ${response.status}`);
            return;
          }

          const data = await response.json();
          const plan: Plan | undefined = data.user.myPlans.find(
            (plan: Plan) => plan.id === id
          );

          if (plan) {
            setPlan(plan);
          } else {
            console.error("Plan not found");
          }
        } catch (error) {
          console.error("Error fetching plan:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    if (!user || loading) {
      return;
    }
    fetchPlan();
  }, [id, user, loading]);

  const [activeLevel, setActiveLevel] = useState<string | undefined>(undefined);
  const [activeGoal, setActiveGoal] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (plan) {
      setActiveLevel(plan.level);
      setActiveGoal(plan.goal);
    }
  }, [plan]);

  const levelOption: Level[] = ["Beginner", "Intermediate", "Advanced"];

  const goalOptions: Goal[] = [
    "Maintaining",
    "Bulking",
    "Cutting",
    "Sport Specific",
  ];
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <svg
            className="animate-spin h-10 w-10 text-gray-500 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="text-xl text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  const handleDifficultyChange = (level: Level) => {
    setActiveLevel(level);
    setPlan((prev) => (prev ? { ...prev, level } : prev));
  };

  const handleGoalChange = (goal: Goal) => {
    setActiveGoal(goal);
    setPlan((prev) => (prev ? { ...prev, goal } : prev));
  };

  const handleTitleChange = (value: string) => {
    setPlan((prev) => (prev ? { ...prev, name: value } : prev));
  };

  const handleDescriptionChange = (value: string) => {
    setPlan((prev) => (prev ? { ...prev, description: value } : prev));
  };

  return (
    <div className="flex flex-col mt-4 mx-4">
      <div className="w-full bg-[#B2B2B2] rounded-xl p-3 mt-14 flex flex-col">
        {plan && <img src={plan.image} alt="" />}
        <div className="flex flex-col ml-2 mt-6">
          <div className="flex flex-row items-center justify-between">
            <input
              type="text"
              value={plan?.name || ""}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-[75%] font-bebas uppercase text-black text-3xl py-1 px-2 rounded-xl bg-[#D9D9D9] border border-gray-400 focus:outline-none"
              autoFocus
            />
            <p className="bg-[#C73659] font-bebas px-2 py-1 text-2xl text-[#B2B2B2] rounded-xl">
              Applied
            </p>
          </div>

          <div className="flex flex-col font-montserrat mt-3">
            <div className="flex flex-col">
              <div className="text-2xl flex flex-row items-center">
                <TfiCup className="mr-4 text-[#A91D3A]" />
                <p className="text-black">Goal</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {goalOptions.map((goal) => (
                  <button
                    key={goal}
                    onClick={() => handleGoalChange(goal)}
                    className={`text-black text-[1.1rem] my-2 py-2 rounded-xl ${
                      activeGoal === goal
                        ? "bg-[#C73659] text-white"
                        : "bg-[#D9D9D9]"
                    }`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col mt-4">
              <div className="text-2xl flex flex-row items-center">
                <HiChartBar className="mr-4 text-[#A91D3A]" />
                <p className="text-black">Level</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {levelOption.map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => handleDifficultyChange(difficulty)}
                    className={`text-black text-[1.1rem] my-2 py-2 rounded-xl ${
                      activeLevel === difficulty
                        ? "bg-[#C73659] text-white"
                        : "bg-[#D9D9D9]"
                    }`}
                  >
                    {difficulty}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <h2 className="text-3xl font-bebas text-black mt-6">
              Plan description
            </h2>
            <textarea
              value={plan?.description || ""}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              className="text-black text-xl mt-2 font-montserrat bg-[#D9D9D9] rounded-xl p-2 focus:outline-none"
              rows={6}
              autoFocus
            />
          </div>
        </div>
      </div>
    </div>
  );
}

PlanCard.propTypes = {
  id: PropTypes.string,
};

export default PlanCard;
