import fs from 'fs';// Node.js file system module
import PlanModule from '../class/plan.js'; 
const { Plan, PlanDetail, ExerciseInPlanDetail } = PlanModule;
import planService from '../api/services/planService.js';
const { createPlan, deletePlan } = planService;
// Read JSON file, convert it to list of Plan objects and push to database
async function readPlansAndPushOnDatabase(filePath) {
    try {
        const data = await fs.promises.readFile(filePath, 'utf8'); 

        const parsedData = JSON.parse(data);

        // Convert each item in parsedData to an instance of the Plan class
        const plans = parsedData.map(planData => new Plan(planData));

        // Create plans in Firestore
        for (const plan of plans) {
            const result = await createPlan(plan);
            console.log(result); 
        }

    } catch (e) {
        console.error("Error reading or parsing the file:", e);
    }
}

// Usage: Call the function with the path to your JSON file
readPlansAndPushOnDatabase('plansFile.json');

