// Gemini API fetching and handling the response.


// Provides access to the GenAI features through either the Gemini API or the Vertex AI API.
import {GoogleGenAI} from '@google/genai';
// Similarly working with GROQ AI.
import Groq from 'groq-sdk';

import express from  'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 5000 || process.env.PORT;
// creating a client using the GoogleGenAI class and passing the API key from the environment variables.
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

// creating groq client.
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
})

async function testGroq() {
    return await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "developer",
                content: "Hello Assistant! Tell me about yourself and the token limit of yours."
            }
        ]
    });
}

async function callGroq() {
    try {
        const response = await testGroq();

        console.log(response.choices[0].message.content);

        fs.writeFileSync(
            "groqResponse.json",
            JSON.stringify(response, null, 2)
        );
    } catch (err) {
        console.error(err);
    }
}

// choosing the model we use.
// async function testGemini() {
//     // generateContent() is use to generate the answer.
//     return await ai.models.generateContent({
//         model: 'gemini-2.5-flash',
//         contents: 'Hello Gemini! Tell me about yourself.'
//     });
//     console.log(response);
// }

// testGemini();
callGroq();
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})