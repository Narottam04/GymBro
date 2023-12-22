import exerciseDb from "../utils/filteredExerciseDb.ts";
import { getEmbedding, EmbeddingIndex } from "client-vector-search";

async function embed() {
  const exerciseVec: Array<object> = [];
  // get embedding for each exercise
  for (let i = 0; i < exerciseDb.length - 1; i++) {
    const embedding = await getEmbedding(
      `${exerciseDb[i].name} \n ${exerciseDb[i].exerciseInstructions}`
    );
    exerciseVec.push({ ...exerciseDb[i], embedding });
  }

  // save the createEmbedding in the text file in the type of txt format
  console.log(exerciseVec);
}
