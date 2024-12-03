import fs from 'fs';// Node.js file system module
import exerciseService from '../api/services/exerciseService.js';
const { createExercise } = exerciseService;
// Read JSON file, convert it to list of Plan objects and push to database
async function readExercisesAndPushOnDatabase(filePath) {
    try {
        const data = await fs.promises.readFile(filePath, 'utf8'); 

        const exercises = JSON.parse(data);

        // Create exercises in Firestore
        for (const exercise of exercises) {
            const result = await createExercise(exercise);
            console.log(result); 
        }

    } catch (e) {
        console.error("Error reading or parsing the file:", e);
    }
}

// Usage: Call the function with the path to your JSON file
readExercisesAndPushOnDatabase('jefit_exercises_updated.json');

