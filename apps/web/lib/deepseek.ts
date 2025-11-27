interface DeepSeekResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export async function optimizePrompt(prompt: string): Promise<string> {
  const response = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content:
            'You are a prompt optimization expert. Your task is to improve the given prompt to make it more effective, clear, and likely to produce better results. Keep the core intent of the prompt but enhance its structure, clarity, and effectiveness.',
        },
        {
          role: 'user',
          content: `Please optimize the following prompt:\n\n${prompt}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    }),
  });

  if (!response.ok) {
    throw new Error(`DeepSeek API error: ${response.statusText}`);
  }

  const data: DeepSeekResponse = await response.json();
  return data.choices[0].message.content;
}
