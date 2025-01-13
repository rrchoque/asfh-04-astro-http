import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";

export const prerender = false;

const getPost = async (slug: string) => {
  console.log({ slug });

  const post = await getEntry("blog", slug as any);

  if (!post) {
    const error = { msg: `Post ${slug} not found` };
    return { post: error, status: 404 };
  }

  return { post, status: 200 };
};

export const GET: APIRoute = async ({ params, request }) => {
  const { slug } = params;

  const { post, status } = await getPost(slug ?? "");

  return new Response(JSON.stringify(post), {
    status: status,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const POST: APIRoute = async ({ params, request }) => {
  const { slug } = params;

  const { post, status } = await getPost(slug ?? "");

  return new Response(
    JSON.stringify({
      method: "POST",
      ...post,
    }),
    {
      status: status,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const PATCH: APIRoute = async ({ params, request }) => {
  const { slug } = params;

  const { post, status } = await getPost(slug ?? "");

  return new Response(
    JSON.stringify({
      method: "PATCH",
      ...post,
    }),
    {
      status: status,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const PUT: APIRoute = async ({ params, request }) => {
  const { slug } = params;

  const { post, status } = await getPost(slug ?? "");

  return new Response(
    JSON.stringify({
      method: "PUT",
      ...post,
    }),
    {
      status: status,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const DELETE: APIRoute = async ({ params, request }) => {
  const { slug } = params;

  const { post, status } = await getPost(slug ?? "");

  return new Response(
    JSON.stringify({
      method: "DELETE",
      slug: slug,
    }),
    {
      status: status,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
