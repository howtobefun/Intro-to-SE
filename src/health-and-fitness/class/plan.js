class Plan {
    static imageDefault = "https://www.jefit.com/_next/image?url=https%3A%2F%2Fcdn.jefit.com%2Fuc%2Ffile%2Fc6809df063cf0f08%2F1.jpg&w=3840&q=75";

    constructor({ id, name, image, description, days, goal, muscle, equipment, level, planDetails }) {
        this.id = id || null;
        this.name = name || "New Plan";
        this.image = image || Plan.imageDefault;
        this.description = description || "";
        this.days = days || null; 
        this.goal = goal || "";
        this.muscle = muscle || null;
        this.equipment = equipment || "";
        this.level = level || "Intermediate";
        this.planDetails = this.initializePlanDetails(planDetails || []);
    }

    initializePlanDetails(planDetails) {
        const daysInWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const defaultPlanDetail = (day) => new PlanDetail({
            id: null,
            day: day,
            name: "Rest Day", // Ngày mặc định là ngày nghỉ
            exercises: [] // Không có bài tập
        });

        // Đảm bảo `planDetails` có đúng 7 phần tử
        return daysInWeek.map((day, index) => {
            const detail = planDetails[index];
            if (detail) {
                return new PlanDetail({
                    ...detail,
                    day: detail.day || day, // Gán day nếu thiếu
                });
            }
            return defaultPlanDetail(day); // Tạo mặc định
        });
    }
}

class PlanDetail {
    constructor({ id, day, name, exercises }) {
        this.id = id || null;
        this.day = day || null;
        this.name = name || "Rest Day"; 
        this.exercises = this.parseExercises(exercises); 
    }

    parseExercises(exercises) {
        if (!Array.isArray(exercises)) {
            return []; 
        }
        return exercises.map(exercise => new ExerciseInPlanDetail(exercise));
    }
}

class ExerciseInPlanDetail {
    constructor({ id, name, sets, reps, interval, restTime }) {
        this.id = id || null; 
        this.name = name || null;
        this.sets = Number(sets) || 1; 
        this.reps = reps || "1"; 
        this.interval = interval || "00:00"; 
        this.restTime = restTime || "00:00";
    }
}

export default {Plan, PlanDetail, ExerciseInPlanDetail };
