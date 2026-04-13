export const googleLogin = (
  redirectUrl: string = `${process.env.NEXT_PUBLIC_URL}/auth/callback`,
) => {
  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/accounts/google-login?returnUrl=${redirectUrl}`;
};
