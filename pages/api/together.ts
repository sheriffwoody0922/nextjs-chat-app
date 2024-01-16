import Together from 'together-ai';

if (!process.env.TOGETHER_API_KEY) {
  throw new Error('Missing env var from Together.ai');
}

const together = new Together({
  auth: process.env.TOGETHER_API_KEY,
});

const handler = async (req: Request): Promise<Response> => {
  const { prompt } = (await req.json()) as { prompt?: string };

  if (!prompt) {
    return new Response('No prompt in the request', { status: 400 });
  }

  const stream = await together.inference(
    'mistralai/Mixtral-8x7B-Instruct-v0.1',
    {
      messages: [
        {
          role: 'user',
          content: `${prompt} Reply in markdown.`,
        },
      ],
      max_tokens: 512,
      stream_tokens: true,
    }
  );

  return new Response(stream as ReadableStream, {
    headers: new Headers({
      'Cache-Control': 'no-cache',
    }),
  });
};

export const config = { runtime: 'edge' };
export default handler;
