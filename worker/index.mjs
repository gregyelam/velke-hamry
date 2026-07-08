export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "POST" && url.pathname === "/api/enquiry") {
      return Response.json({ ok: true }); // stub, replaced in Task 4
    }
    return env.ASSETS.fetch(request);
  },
};
