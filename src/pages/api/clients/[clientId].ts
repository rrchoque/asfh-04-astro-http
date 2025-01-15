import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const { clientId } = params;

  return new Response(
    JSON.stringify({
      method: "GET",
      id: clientId,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const PUT: APIRoute = async ({ params, request }) => {
  const { clientId } = params;

  return new Response(
    JSON.stringify({
      method: "PUT",
      id: clientId,
    }),
    {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const DELETE: APIRoute = async ({ params, request }) => {
  const { clientId } = params;

  return new Response(
    JSON.stringify({
      method: "DELETE",
      id: clientId,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
