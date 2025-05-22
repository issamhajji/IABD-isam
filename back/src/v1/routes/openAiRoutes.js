const OpenAI = require("openai");
const express = require("express");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended: true}));

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

router.post("/generate-recipe", async (req, res) => {
    /* 
     * #swagger.tags = ['OpenAI']
     * #swagger.summary = 'devuelve una receta basada en una lista de ingredientes'
     * #swagger.description = 'devuelve una receta basada en una lista de ingredientes'
     * #swagger.responses[200] = {
     *      description: 'receta obtenida!'
     * }
     }
    */
     const recipe = await openai.responses.create({
        model: "gpt-4.1",
        instructions: "Recipe only. No chatty tone, no greetings, no follow-up questions. Cookbook-style. Just ingredients, steps, and optional tips.",
        input: [
          {
            role: "system",
            content: "You are a chef who specializes in healthy cooking. Your job is to recommend healthy and nutritious, step-by-step recipes using the given ingredients it's important that you avoid the ingredient's whose quantities are 0."
          },
          {
            role: "user",
            content: `Here are the ingredients and the quantities of each that I have: ${req.body.items}. Please suggest a healthy recipe and provide a clear, beginner-friendly step-by-step guide.`
          }
        ],
        temperature: 0.7,
        max_output_tokens: 2000,
      });
    console.log(recipe.output_text);
    res.json({recipe: recipe.output_text});

});

module.exports = router;