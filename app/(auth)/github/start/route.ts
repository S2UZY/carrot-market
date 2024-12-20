export function GET() {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const params = {
    client_id: process.env.GITHUB_CLIENT_ID!,
    scope: "read:user,user:email",
  };

  const formattedParams = new URLSearchParams(params);
  const finalUrl = `${baseUrl}?${formattedParams.toString()}`;

  return Response.redirect(finalUrl);
}
