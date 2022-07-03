import "next-auth";

declare module "next-auth" {
  // interface
  interface Session {
    user: {
      id: string;
    };
  }
}
