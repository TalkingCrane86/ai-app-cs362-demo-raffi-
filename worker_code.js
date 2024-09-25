export default {
    async fetch(request, env) {
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        });
      }
  
      try {
        const { prompt } = await request.json();
  
        if (!prompt) {
          return new Response('Prompt is required', {
            status: 400,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type',
            },
          });
        }
  
        const inputs = { prompt };
  
        const response = await env.AI.run(
          '@cf/lykon/dreamshaper-8-lcm',
          inputs,
        );
  
        return new Response(response, {
          headers: {
            'content-type': 'image/png',
            'Access-Control-Allow-Origin': '*', // Allow all origins
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // Allow specific methods
            'Access-Control-Allow-Headers': 'Content-Type', // Allow specific headers
          },
        });
      } catch (error) {
        return new Response('Error processing request ' + error, {
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        });
      }
    },
  };