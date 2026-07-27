import Groq from "groq-sdk";
import { getRandom250keywords } from "./tmbd";
import 'dotenv/config'


// Groq client
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });


export async function filterKeywordsByMood(movieIdList, selectedMood) {

    const inputKeywords = await getRandom250keywords(movieIdList);
    console.log('grok input list', movieIdList)

    const jsonSchema = {
        type: "object",
        properties: {
            filtered_keywords: {
                type: "array",
                items: { type: "string" },
                description: "List of keywords strictly selected from the user's input list."
            }
        },
        required: ["filtered_keywords"]
    };


    const systemInstruction =
        "You are a strict JSON data filtering engine. " +
        "Return only valid JSON. " +
        "Your task is to look at a list of keywords " +
        "and select only the ones that match the user's provided mood. " +
        "There absolutely must be at least 10 keywords and no more than 15 keywords. " +
        "Do not invent new keywords. " +
        "There should be no duplicate keywords." +
        "Only return keywords that are explicitly present in the input list." +
        "The result should always have filtered_keywords as the key"

    const userContent = `
    Mood: ${selectedMood}
    Available Keywords: ${JSON.stringify(inputKeywords)}
  `;

    try {

        const chatCompletion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile", // free model, might need to switch if it gets deprecated
            messages: [
                {
                    role: "system",
                    content: systemInstruction
                },
                {
                    role: "user",
                    content: userContent
                }
            ],
            temperature: 0.0,
            response_format: {
                type: "json_object",
                schema: jsonSchema
            }
        });

        // display result
        const rawContent = chatCompletion.choices[0].message.content;
        const result = JSON.parse(rawContent);
        // making sure response contains filtered keywords
        console.log('grok result', result)
        return result


    } catch (error) {
        console.error("API Error:", error.message);
    }

}

