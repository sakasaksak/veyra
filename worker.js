export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/products") {
      const result = await env.DB.prepare(`
        SELECT
          p.id,
          p.title,
          p.slug,
          p.description,
          p.category_id,
          po.price,
          po.currency,
          po.affiliate_url
        FROM products p
        LEFT JOIN product_offers po
          ON po.product_id = p.id
        ORDER BY p.id DESC
      `).all();

      return Response.json(result.results);
    }

    return new Response("Veyra API is running.");
  }
};
