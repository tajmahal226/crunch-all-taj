Deno.serve(async (req) => {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE, PATCH',
        'Access-Control-Max-Age': '86400',
        'Access-Control-Allow-Credentials': 'false'
    };

    if (req.method === 'OPTIONS') {
        return new Response(null, { status: 200, headers: corsHeaders });
    }

    try {
        const { message, conversationHistory = [] } = await req.json();

        if (!message) {
            throw new Error('Message is required');
        }

        // Get API keys from environment
        const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
        const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
        
        if (!openaiApiKey && !geminiApiKey) {
            throw new Error('No AI API keys configured');
        }

        console.log('Processing AI tutor request for message:', message);

        // Build conversation context
        const messages = [
            {
                role: 'system',
                content: `You are an expert AI Math Tutor for Numera. You are knowledgeable, patient, and encouraging. Your role is to:

1. Help students understand mathematical concepts from basic arithmetic to advanced calculus
2. Provide step-by-step explanations for math problems
3. Offer guidance on using the website's calculators effectively
4. Explain mathematical formulas and their applications
5. Help with homework and study strategies
6. Cover topics in: Mathematics, Physics, Chemistry, Algebra, Geometry, Trigonometry, Calculus, Statistics, Finance, and Engineering

Always:
- Use clear, encouraging language suitable for students
- Break down complex problems into manageable steps
- Provide examples when helpful
- Suggest relevant calculators from the website when appropriate
- Use proper mathematical notation when needed
- Be patient and supportive

Available calculator categories on Numera:
- Mathematics (37 calculators): Basic Calculator, Scientific Calculator, Matrix Calculator, etc.
- Physics (53 calculators): Kinematics, Force, Energy, Wave calculators, etc.
- Chemistry (71 calculators): Molar Mass, pH, Chemical Equation Balancer, etc.
- Algebra (15 calculators): Linear Equations, Quadratic Formula, System of Equations, etc.
- Geometry (74 calculators): Area, Perimeter, Volume, Triangle calculators, etc.
- Trigonometry (57 calculators): Sin/Cos/Tan, Law of Sines, Unit Circle, etc.
- Calculus (68 calculators): Derivative, Integral, Limit calculators, etc.
- Statistics (52 calculators): Mean/Median, Standard Deviation, T-Test, etc.
- Finance (80 calculators): Compound Interest, Loan Calculator, NPV, etc.
- Conversion (8 calculators): Unit converters for length, weight, temperature, etc.
- Engineering (5 calculators): Beam, Stress/Strain, Circuit calculators, etc.
- Computer Science (4 calculators): Binary, Algorithm Complexity, Boolean Logic, etc.
- Health/Fitness (4 calculators): BMI, BMR, Calorie calculators, etc.

With over 100+ professional calculators total, Numera is the most comprehensive educational calculator platform available.`
            }
        ];

        // Add conversation history
        conversationHistory.forEach(msg => {
            messages.push({
                role: msg.role,
                content: msg.content
            });
        });

        // Add current user message
        messages.push({
            role: 'user',
            content: message
        });

        let tutorMessage;
        
        // Try OpenAI first, fallback to Gemini if it fails
        try {
            if (openaiApiKey) {
                console.log('Attempting OpenAI API call...');
                const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${openaiApiKey}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        model: 'gpt-4o-mini',
                        messages: messages,
                        max_tokens: 1000,
                        temperature: 0.7,
                        stream: false
                    })
                });

                if (openaiResponse.ok) {
                    const aiResponse = await openaiResponse.json();
                    tutorMessage = aiResponse.choices[0].message.content;
                    console.log('OpenAI API call successful');
                } else {
                    throw new Error(`OpenAI API error: ${openaiResponse.status}`);
                }
            } else {
                throw new Error('OpenAI API key not available');
            }
        } catch (openaiError) {
            console.log('OpenAI failed, trying Gemini...', openaiError.message);
            
            if (!geminiApiKey) {
                throw new Error('Both OpenAI and Gemini API keys are unavailable');
            }
            
            // Convert messages format for Gemini
            const geminiMessages = messages.filter(msg => msg.role !== 'system').map(msg => ({
                role: msg.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: msg.content }]
            }));
            
            // Add system message as initial context
            const systemContent = messages.find(msg => msg.role === 'system')?.content || '';
            if (geminiMessages.length > 0) {
                geminiMessages[0].parts[0].text = systemContent + '\n\nUser: ' + geminiMessages[0].parts[0].text;
            }
            
            const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: geminiMessages,
                    generationConfig: {
                        maxOutputTokens: 1000,
                        temperature: 0.7
                    }
                })
            });
            
            if (!geminiResponse.ok) {
                const errorData = await geminiResponse.text();
                console.error('Gemini API error:', errorData);
                throw new Error(`Both OpenAI and Gemini APIs failed`);
            }
            
            const geminiResult = await geminiResponse.json();
            tutorMessage = geminiResult.candidates[0].content.parts[0].text;
            console.log('Gemini API call successful');
        }

        console.log('AI tutor response generated successfully');

        return new Response(JSON.stringify({
            data: {
                message: tutorMessage,
                timestamp: new Date().toISOString()
            }
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('AI tutor chat error:', error);

        const errorResponse = {
            error: {
                code: 'AI_TUTOR_ERROR',
                message: error.message || 'Failed to process AI tutor request'
            }
        };

        return new Response(JSON.stringify(errorResponse), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
});