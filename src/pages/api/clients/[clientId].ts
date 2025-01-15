import type { APIRoute } from "astro";
import { Clients, db, eq } from "astro:db";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const clientId = +(params.clientId ?? "0");

  const clients = await db
    .select()
    .from(Clients)
    .where(eq(Clients.id, clientId));

  if (clients.length === 0) {
    return new Response(
      JSON.stringify({ msg: `Client with id ${clientId} not found` }),
      {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  return new Response(JSON.stringify(clients.at(0)), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const PUT: APIRoute = async ({ params, request }) => {
  const clientId = +(params.clientId ?? "0");
  try {
    const { id, ...body } = await request.json();

    const results = await db
      .update(Clients)
      .set(body)
      .where(eq(Clients.id, clientId));

    const updatedClient = await db
      .select()
      .from(Clients)
      .where(eq(Clients.id, +clientId));

    return new Response(JSON.stringify(updatedClient), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error,
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};

export const DELETE: APIRoute = async ({ params, request }) => {
  const clientId = +(params.clientId ?? "0");

  const { rowsAffected } = await db
    .delete(Clients)
    .where(eq(Clients.id, clientId));

  if (rowsAffected > 0) {
    return new Response(JSON.stringify({ msg: "Deleted" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return new Response(
    JSON.stringify({ msg: `Client with id ${clientId} not found` }),
    {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
